<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let visible = true;

  let searchQuery = '';
  let searchResults = [];
</script>

{#if visible}
  <aside class="flex flex-col overflow-hidden animate-slide-in" style="background-color: #0f172a; border-right: 1px solid #334155;" on:close={() => dispatch('close')}>
    <div class="flex items-center justify-between px-3 py-2" style="border-bottom: 1px solid #334155;">
      <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Search</span>
      <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" on:click={() => dispatch('close')} aria-label="Close Panel">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="p-3" style="border-bottom: 1px solid #334155;">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21L16.65 16.65"/>
        </svg>
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Search in files..."
          class="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/50"
          style="background-color: #1e293b; border: 1px solid #334155;"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 px-1.5 py-0.5 rounded" style="background-color: #334155;">Ctrl+Shift+F</span>
      </div>
      
      <div class="flex items-center gap-2 mt-2">
        <button class="p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-colors" title="Match Case">Aa</button>
        <button class="p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-colors" title="Match Whole Word">ab</button>
        <button class="p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-colors" title="Use Regular Expression">.*</button>
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto">
      {#if searchResults.length > 0}
        <!-- Results list would go here -->
        <div class="p-4">
          <!-- Placeholder for results -->
          <p class="text-sm text-slate-400">Results will be displayed here.</p>
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center px-6 py-12 text-center h-full">
          <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21L16.65 16.65"/>
            </svg>
          </div>
          <p class="text-sm text-slate-500 leading-relaxed">
            {#if searchQuery}
              No results found for "{searchQuery}"
            {:else}
              Enter a search term to find text across all files.
            {/if}
          </p>
        </div>
      {/if}
    </div>
  </aside>
{/if}
