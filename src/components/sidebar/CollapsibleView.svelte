<script>
  import { slide } from 'svelte/transition';
  
  export let title = '';
  export let defaultExpanded = true;
  
  let isExpanded = defaultExpanded;
  
  function toggle() {
    isExpanded = !isExpanded;
  }
  
  function handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  }
</script>

<div class="collapsible-view">
  <button
    class="w-full flex items-center gap-1 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 
           hover:bg-slate-700/30 transition-colors duration-150 border-b border-slate-800/30"
    on:click={toggle}
    on:keydown={handleKeydown}
    aria-expanded={isExpanded}
    type="button"
  >
    <svg 
      class="w-3 h-3 text-slate-500 transition-transform duration-200 flex-shrink-0"
      class:rotate-90={isExpanded}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path d="M9 18l6-6-6-6"/>
    </svg>
    <span class="truncate">{title}</span>
  </button>
  
  {#if isExpanded}
    <div transition:slide={{ duration: 200, axis: 'y' }}>
      <slot />
    </div>
  {/if}
</div>

<style>
  .collapsible-view {
    display: flex;
    flex-direction: column;
  }
  
  button:focus-visible {
    outline: 2px solid rgb(59 130 246 / 0.5);
    outline-offset: -2px;
  }
</style>
