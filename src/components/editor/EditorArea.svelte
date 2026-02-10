<script>
  import { fileStore } from '../../lib/stores/files';
  import MonacoEditor from './MonacoEditor.svelte';
  import TabsBar from './TabsBar.svelte';
</script>

<div class="flex-1 flex flex-col min-w-0 h-full bg-[#0f172a]">
  <!-- Tabs Bar -->
  <TabsBar />
  
  <!-- Editor Content -->
  <div class="flex-1 min-h-0 relative overflow-hidden">
    {#if $fileStore.activeFile}
       <MonacoEditor />
    {:else}
      <!-- Empty State -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]">
        <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 flex items-center justify-center mb-6 shadow-xl border border-slate-700/30">
          <svg class="w-10 h-10 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-300 mb-2">No files open</h2>
        <p class="text-slate-500 mb-6 max-w-md text-center leading-relaxed">Select a file from the explorer to begin editing, or use the quick actions below.</p>
        <div class="flex gap-3">
           <span class="px-4 py-2 rounded-xl bg-slate-800/50 text-slate-400 border border-slate-700/50 font-mono text-sm hover:bg-slate-700/50 transition-colors cursor-default">⌘P to search</span>
           <span class="px-4 py-2 rounded-xl bg-slate-800/50 text-slate-400 border border-slate-700/50 font-mono text-sm hover:bg-slate-700/50 transition-colors cursor-default">⌘S to save</span>
        </div>
      </div>
    {/if}
  </div>
</div>
