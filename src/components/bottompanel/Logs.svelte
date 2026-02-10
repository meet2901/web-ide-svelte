<script>
  let problems = [];
</script>

<div class="flex-1 flex items-center justify-center p-4">
  {#if problems.length === 0}
    <div class="text-center">
      <div class="w-14 h-14 rounded-xl bg-slate-800/30 flex items-center justify-center mx-auto mb-4">
        <svg class="w-7 h-7 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p class="text-slate-600 text-sm">No problems detected.</p>
    </div>
  {:else}
    <div class="w-full space-y-1">
      {#each problems as problem}
        <div class="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-700/30 cursor-pointer">
          <span class="text-sm text-slate-300">{problem.text}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
