<script>
  import { createEventDispatcher } from 'svelte';
  import TeamChat from './TeamChat.svelte';
  
  const dispatch = createEventDispatcher();
  let activeTab = 'team';
  let aiQuery = '';
</script>

<aside class="w-full h-full flex flex-col overflow-hidden animate-slide-in" style="background-color: #0f172a;">
  <div class="flex h-10" style="border-bottom: 1px solid #334155;">
    <button 
      class="flex-1 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 relative
        {activeTab === 'team' ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'}"
      on:click={() => activeTab = 'team'}
    >
      {#if activeTab === 'team'}
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500"></div>
      {/if}
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
      </svg>
      Team
    </button>
    <button 
      class="flex-1 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 relative
        {activeTab === 'ai' ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'}"
      on:click={() => activeTab = 'ai'}
    >
      {#if activeTab === 'ai'}
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500"></div>
      {/if}
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
      AI
    </button>
    <button class="px-3 text-slate-500 hover:text-slate-300 hover:bg-slate-700/30 transition-colors" on:click={() => dispatch('close')} aria-label="Close">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>

  {#if activeTab === 'team'}
    <TeamChat />
  {:else}
    <div class="flex-1 flex flex-col p-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <div>
          <span class="font-semibold text-slate-100">AI Assistant</span>
          <p class="text-xs text-slate-500">Powered by Claude</p>
        </div>
      </div>
      
      <div class="space-y-2 flex-1">
        <button class="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-300 transition-all duration-200 hover-lift flex items-center gap-3 group" style="background-color: #1e293b; border: 1px solid #334155;">
          <span class="text-xl group-hover:scale-110 transition-transform">💡</span>
          <div>
            <div class="font-medium">Explain this code</div>
            <div class="text-xs text-slate-500">Get a detailed explanation</div>
          </div>
        </button>
        <button class="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-300 transition-all duration-200 hover-lift flex items-center gap-3 group" style="background-color: #1e293b; border: 1px solid #334155;">
          <span class="text-xl group-hover:scale-110 transition-transform">🔧</span>
          <div>
            <div class="font-medium">Fix errors</div>
            <div class="text-xs text-slate-500">Auto-fix detected issues</div>
          </div>
        </button>
        <button class="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-300 transition-all duration-200 hover-lift flex items-center gap-3 group" style="background-color: #1e293b; border: 1px solid #334155;">
          <span class="text-xl group-hover:scale-110 transition-transform">🚀</span>
          <div>
            <div class="font-medium">Optimize code</div>
            <div class="text-xs text-slate-500">Improve performance</div>
          </div>
        </button>
        <button class="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-300 transition-all duration-200 hover-lift flex items-center gap-3 group" style="background-color: #1e293b; border: 1px solid #334155;">
          <span class="text-xl group-hover:scale-110 transition-transform">📝</span>
          <div>
            <div class="font-medium">Generate docs</div>
            <div class="text-xs text-slate-500">Add JSDoc comments</div>
          </div>
        </button>
      </div>
      
      <div class="mt-4 relative">
        <input 
          type="text" 
          bind:value={aiQuery}
          placeholder="Ask AI anything..." 
          class="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/50 pr-12"
          style="background-color: #1e293b; border: 1px solid #334155;"
        />
        <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white hover-scale transition-all">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  {/if}
</aside>
