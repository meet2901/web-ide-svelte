<script>
  import { createEventDispatcher } from 'svelte';
  import Terminal from './Terminal.svelte';
  import Logs from './Logs.svelte';
  
  const dispatch = createEventDispatcher();
  let activeTab = 'terminal';
  
  // Empty counts for production-ready state
  let problemCount = 0;
</script>

<div class="w-full h-full flex flex-col animate-slide-in" style="background-color: #0f172a; border-top: 1px solid #334155;">
  <div class="flex items-center justify-between h-10 flex-shrink-0 px-2" style="border-bottom: 1px solid #334155;">
    <div class="flex">
      <button 
        class="flex items-center gap-2 px-4 h-10 text-xs font-medium transition-all duration-200 relative
          {activeTab === 'terminal' 
            ? 'text-slate-100' 
            : 'text-slate-500 hover:text-slate-300'}"
        on:click={() => activeTab = 'terminal'}
      >
        {#if activeTab === 'terminal'}
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500"></div>
        {/if}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="4 17 10 11 4 5"/>
          <line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
        <span>Terminal</span>
      </button>
      
      <button 
        class="flex items-center gap-2 px-4 h-10 text-xs font-medium transition-all duration-200 relative
          {activeTab === 'output' 
            ? 'text-slate-100' 
            : 'text-slate-500 hover:text-slate-300'}"
        on:click={() => activeTab = 'output'}
      >
        {#if activeTab === 'output'}
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500"></div>
        {/if}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span>Output</span>
      </button>
      
      <button 
        class="flex items-center gap-2 px-4 h-10 text-xs font-medium transition-all duration-200 relative
          {activeTab === 'problems' 
            ? 'text-slate-100' 
            : 'text-slate-500 hover:text-slate-300'}"
        on:click={() => activeTab = 'problems'}
      >
        {#if activeTab === 'problems'}
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500"></div>
        {/if}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Problems</span>
        {#if problemCount > 0}
          <span class="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-400">{problemCount}</span>
        {/if}
      </button>
    </div>
    
    <div class="flex gap-1">
      <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-all duration-200" aria-label="Clear">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      </button>
      <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-all duration-200" aria-label="Maximize">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>
      <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-all duration-200" on:click={() => dispatch('close')} aria-label="Close">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </div>
  
  <div class="flex-1 overflow-auto">
    {#if activeTab === 'terminal'}
      <Terminal />
    {:else if activeTab === 'problems'}
      <Logs />
    {:else}
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <div class="w-14 h-14 rounded-xl bg-slate-800/30 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <p class="text-slate-600 text-sm">No output to display.</p>
        </div>
      </div>
    {/if}
  </div>
</div>
