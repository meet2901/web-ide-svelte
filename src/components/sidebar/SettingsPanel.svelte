<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let visible = true;
</script>

{#if visible}
  <aside class="flex flex-col overflow-hidden animate-slide-in" style="background-color: #0f172a; border-right: 1px solid #334155;" on:close={() => dispatch('close')}>
    <div class="flex items-center justify-between px-3 py-2" style="border-bottom: 1px solid #334155;">
      <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Settings</span>
    </div>

    <div class="flex-1 p-4 text-slate-300">
      <p class="text-sm">Settings panel coming soon...</p>
      <!-- Placeholder content for settings -->
    </div>
  </aside>
{/if}
