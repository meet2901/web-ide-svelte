<script>
  import { createEventDispatcher } from 'svelte';
  import { projectStore } from '../../lib/stores/project';
  import { terminalStore } from '../../lib/stores/terminal';

  const dispatch = createEventDispatcher();

  async function handleRun() {
    const project = $projectStore.activeProject;
    if (!project) return;

    terminalStore.runSimulation();

    // Auto-stop simulation after a while for demo purposes or let user stop it
    // The simulation in store stops itself after steps are done, so we just need to update UI state
    // ideally store would expose "isRunning" state
  }

  async function handleStop() {
    terminalStore.stopSimulation();
  }
</script>

<div class="flex items-center gap-2">
  {#if !$terminalStore.isRunning}
    <button 
      class="flex items-center gap-2.5 px-4 py-2 rounded-md transition-all duration-150 group"
      style="
        background: linear-gradient(180deg, rgba(34, 197, 94, 0.18) 0%, rgba(34, 197, 94, 0.12) 100%);
        border: 1px solid rgba(34, 197, 94, 0.35);
        box-shadow: 0 2px 8px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      "
      on:mouseenter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.18) 100%)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
      }}
      on:mouseleave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(34, 197, 94, 0.18) 0%, rgba(34, 197, 94, 0.12) 100%)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }}
      on:click={handleRun}
      disabled={!$projectStore.activeProject}
      title={!$projectStore.activeProject ? 'Select a project first' : 'Run Code'}
    >
      <div class="flex items-center justify-center">
        <svg class="w-4 h-4 fill-current text-green-400" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
      <span class="font-semibold text-sm text-green-300 tracking-wide">RUN</span>
    </button>
  {:else}
    <button 
      class="flex items-center gap-2.5 px-4 py-2 rounded-md transition-all duration-150 group"
      style="
        background: linear-gradient(180deg, rgba(239, 68, 68, 0.18) 0%, rgba(239, 68, 68, 0.12) 100%);
        border: 1px solid rgba(239, 68, 68, 0.35);
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      "
      on:mouseenter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.18) 100%)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
      }}
      on:mouseleave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(239, 68, 68, 0.18) 0%, rgba(239, 68, 68, 0.12) 100%)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }}
      on:click={handleStop}
    >
      <div class="flex items-center justify-center">
        <svg class="w-4 h-4 fill-current text-red-400" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2"/>
        </svg>
      </div>
      <span class="font-semibold text-sm text-red-300 tracking-wide">STOP</span>
    </button>
  {/if}
</div>
