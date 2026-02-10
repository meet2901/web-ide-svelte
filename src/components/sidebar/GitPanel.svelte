<script>
  export let visible = true;
  
  let changes = [];
  let commitMessage = '';
</script>

{#if visible}
  <aside class="flex flex-col overflow-hidden animate-slide-in" style="background-color: #0f172a; border-right: 1px solid #334155;" on:close={() => dispatch('close')}>
    <div class="px-3 py-2" style="border-bottom: 1px solid #334155;">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Source Control</span>
        <div class="flex gap-1">
          <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-all" aria-label="Refresh">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
          <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" on:click={() => dispatch('close')} aria-label="Close Panel">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="mt-3">
        <input 
          type="text" 
          bind:value={commitMessage}
          placeholder="Message (press Ctrl+Enter to commit)"
          class="w-full px-3 py-2 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/50"
          style="background-color: #1e293b; border: 1px solid #334155;"
          disabled={changes.length === 0}
        />
        <button class="w-full mt-2 py-2 rounded-lg bg-slate-700 text-slate-500 text-sm font-medium cursor-not-allowed" disabled>
          ✓ Commit
        </button>
      </div>
    </div>
    
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="18" cy="18" r="3"/>
          <circle cx="6" cy="6" r="3"/>
          <path d="M6 21V9a9 9 0 0 0 9 9"/>
        </svg>
      </div>
      <p class="text-sm text-slate-500 leading-relaxed">No changes detected.<br/>Start editing files to track changes.</p>
    </div>
  </aside>
{/if}
