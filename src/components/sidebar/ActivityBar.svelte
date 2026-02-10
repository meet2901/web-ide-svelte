<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let activePanel = null;
  
  const activities = [
    { id: 'files', icon: 'files', label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
    { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+Shift+F' },
    { id: 'git', icon: 'git', label: 'Source Control', shortcut: 'Ctrl+Shift+G' },
    { id: 'extensions', icon: 'extensions', label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
  ];

  const bottomActivities = [
    { id: 'settings', icon: 'settings', label: 'Settings', shortcut: 'Ctrl+,' },
  ];

  function handleClick(id) {
    dispatch('toggle', { panel: id });
  }
</script>

<aside class="w-12 flex flex-col items-center py-3 justify-between surface-raised">
  <div class="flex flex-col items-center gap-2">
    {#each activities as activity}
      <button
        class="group relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 ripple tooltip-custom
          {activePanel === activity.id 
            ? 'text-blue-400 bg-blue-500/20 shadow-blue-500/20 ring-1 ring-blue-500/30 scale-105' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 hover:scale-105'}"
        data-tip={activity.label}
        on:click={() => handleClick(activity.id)}
        aria-label={activity.label}
      >
        <!-- Active indicator bar -->
        {#if activePanel === activity.id}
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-blue-400 to-blue-500 rounded-r-full"></div>
        {/if}
        
        {#if activity.icon === 'files'}
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z"/>
          </svg>
        {:else if activity.icon === 'search'}
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21L16.65 16.65"/>
          </svg>
        {:else if activity.icon === 'git'}
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="18" cy="18" r="3"/>
            <circle cx="6" cy="6" r="3"/>
            <path d="M6 21V9a9 9 0 0 0 9 9"/>
          </svg>
        {:else if activity.icon === 'extensions'}
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="8" height="8" rx="1"/>
            <rect x="13" y="3" width="8" height="8" rx="1"/>
            <rect x="3" y="13" width="8" height="8" rx="1"/>
            <rect x="13" y="13" width="8" height="8" rx="1"/>
          </svg>
        {/if}
      </button>
    {/each}
  </div>
  
  <div class="flex flex-col items-center gap-2">
    {#each bottomActivities as activity}
      <button
        class="group relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 ripple tooltip-custom
          {activePanel === activity.id
            ? 'text-blue-400 bg-blue-500/20 shadow-blue-500/20 ring-1 ring-blue-500/30 scale-105'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 hover:scale-105'}"
        data-tip={activity.label}
        on:click={() => handleClick(activity.id)}
        aria-label={activity.label}
      >
        <!-- Active indicator bar -->
        {#if activePanel === activity.id}
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-blue-400 to-blue-500 rounded-r-full"></div>
        {/if}
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
    {/each}
    
    <!-- User Avatar -->
    <div class="mt-3 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/30">
      DK
    </div>
  </div>
</aside>
