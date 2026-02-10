<script>
  import { terminalStore } from '../../lib/stores/terminal';
  import { afterUpdate } from 'svelte';

  let terminalDiv;

  // Auto-scroll to bottom
  afterUpdate(() => {
    if (terminalDiv) {
      terminalDiv.scrollTop = terminalDiv.scrollHeight;
    }
  });
</script>

<div 
  bind:this={terminalDiv}
  class="h-full p-4 overflow-y-auto font-mono text-sm leading-6" 
  style="background-color: #020617; font-family: 'JetBrains Mono', 'Fira Code', monospace;"
>
  {#if $terminalStore.length === 0}
    <div class="text-center pt-8 opacity-50">
      <div class="w-14 h-14 rounded-xl bg-slate-800/30 flex items-center justify-center mx-auto mb-4">
        <svg class="w-7 h-7 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="4 17 10 11 4 5"/>
          <line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
      </div>
      <p class="text-slate-600 text-sm">Run your project to see output here.</p>
    </div>
  {:else}
    {#each $terminalStore as line}
      <div class="whitespace-pre-wrap break-all 
        {line.type === 'stderr' || line.type === 'error' ? 'text-red-400' : 'text-slate-300'}
        {line.type === 'info' ? 'text-blue-400 italic' : ''}"
      >
        <span class="opacity-30 mr-2 select-none">›</span>{line.text}
      </div>
    {/each}
  {/if}
</div>
