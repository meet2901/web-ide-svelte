<script>
  import { fileStore } from '../../lib/stores/files';
</script>

<div class="flex items-center h-10 bg-[#1e293b] border-b border-slate-800/50">
  {#if $fileStore.openFiles.length === 0}
    <div class="flex-1 flex items-center justify-center text-slate-500 text-sm">
      No files open
    </div>
  {:else}
    <div class="flex flex-1 overflow-x-auto">
      {#each $fileStore.openFiles as file}
        <div class="relative group flex-shrink-0">
          <button
            class="flex items-center gap-2 px-4 h-10 text-sm transition-all duration-200 whitespace-nowrap border-r border-slate-600
              {$fileStore.activeFile?.id === file.id
                ? 'text-white bg-[#1e1e1e] rounded-t-lg border-t-2 border-t-blue-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}"
            on:click={() => fileStore.openFile(file)}
          >
            <span class="font-medium">{file.name}</span>
          </button>

          <button
             class="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-slate-600 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out"
             on:click|stopPropagation={() => fileStore.closeFile(file.id)}
          >
             <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
