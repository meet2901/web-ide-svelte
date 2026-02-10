<script>
  import { afterUpdate } from 'svelte';
  import { authStore } from '../../lib/stores/auth';
  import { projectStore } from '../../lib/stores/project';
  import ChatMessage from './ChatMessage.svelte';

  let messages = [
    { id: 1, type: 'system', text: 'Welcome to the Team Chat!' },
    { 
        id: 2, 
        text: 'Hey! I updated the README.', 
        timestamp: new Date(Date.now() - 3600000),
        user: {
            id: 'user-2',
            name: 'Sarah',
            initials: 'SA',
            gradient: 'from-purple-500 to-pink-500'
        }
    }
  ];
  let newMessage = '';
  let teamMembers = [
      { id: 'user-1', name: 'Demo User', initials: 'ME', gradient: 'from-blue-500 to-cyan-500', online: true },
      { id: 'user-2', name: 'Sarah', initials: 'SA', gradient: 'from-purple-500 to-pink-500', online: true },
      { id: 'user-3', name: 'Mike', initials: 'MI', gradient: 'from-green-500 to-emerald-500', online: false }
  ];
  let chatDiv;

  // Auto-scroll
  afterUpdate(() => {
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  });

  function sendMessage() {
    if (!newMessage.trim() || !$projectStore.activeProject) return;

    const user = $authStore.user;
    const initials = user.name ? user.name.substring(0, 2).toUpperCase() : 'ME';

    const msg = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date(),
      isOwn: true,
      user: {
          id: user.id || 'me',
          name: user.name || 'Me',
          initials: initials,
          gradient: 'from-blue-500 to-cyan-500' // consistent with teamMembers[0]
      }
    };

    messages = [...messages, msg];
    const sentText = newMessage;
    newMessage = '';

    // Simulate reply
    setTimeout(() => {
        messages = [...messages, {
            id: Date.now(),
            text: `Cool! I see you said "${sentText}". This is a demo.`,
            timestamp: new Date(),
            user: {
                id: 'user-2',
                name: 'Sarah',
                initials: 'SA',
                gradient: 'from-purple-500 to-pink-500'
            }
        }];
    }, 2000);
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="flex-1 flex flex-col overflow-hidden surface-subtle">
  <!-- Online members -->
  <div class="p-4 border-b divider-strong">
    <div class="text-xs font-semibold uppercase tracking-wider text-subtle mb-3 flex items-center gap-2">
      <span>Team</span>
      <span class="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">{teamMembers.filter(m => m.online).length} online</span>
    </div>
    {#if teamMembers.length === 0}
      <div class="flex gap-3">
        <div class="w-11 h-11 rounded-xl bg-slate-800/30 border border-dashed border-slate-600 flex items-center justify-center text-slate-500 cursor-pointer hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-200">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </div>
    {:else}
      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {#each teamMembers as member}
          <div class="relative cursor-pointer group flex-shrink-0 transition-all duration-200 hover:scale-105" title={member.name}>
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br {member.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg {member.online ? 'ring-2 ring-green-500/30' : 'opacity-60'} transition-all duration-200">
              {member.initials}
            </div>
            {#if member.online}
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0f172a] shadow-sm"></div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Messages -->
  <div 
     bind:this={chatDiv}
     class="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin"
  >
    {#if messages.length === 0}
      <div class="text-center mt-12">
        <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 flex items-center justify-center mx-auto mb-5 shadow-lg border border-slate-700/30">
          <svg class="w-10 h-10 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-300 mb-2">No messages yet</h3>
        <p class="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">Start the conversation by sending a message to your team.</p>
      </div>
    {:else}
      {#each messages as msg}
        {#if msg.type === 'system'}
          <div class="text-center text-xs text-slate-500 my-2 italic">
            {msg.text}
          </div>
        {:else}
          <ChatMessage message={msg} />
        {/if}
      {/each}
    {/if}
  </div>
  
  <!-- Input -->
  <div class="p-4 flex gap-3 border-t divider-strong flex-shrink-0">
    <input 
      type="text" 
      placeholder="Type a message..." 
      class="flex-1 px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 surface-subtle border border-slate-700 hover:border-slate-600 focus:border-blue-500"
      bind:value={newMessage}
      on:keydown={handleKeydown}
      disabled={!$projectStore.activeProject}
    />
    <button 
      class="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100" 
      on:click={sendMessage}
      disabled={!$projectStore.activeProject}
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    </button>
  </div>
</div>
