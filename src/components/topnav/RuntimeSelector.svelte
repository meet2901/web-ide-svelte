<script>
  let runtime = "Select Runtime";
  const runtimes = ["Node 16", "Node 18", "Node 20", "Python 3.11", "Go 1.21", "Rust 1.75"];
  let selected = false;
  
  function handleChange() {
    selected = runtime !== "Select Runtime";
  }
</script>

<div class="flex items-center gap-2.5">
  <div class="w-2 h-2 rounded-full {selected ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-500'}"></div>
  <div class="relative">
    <select 
      bind:value={runtime} 
      on:change={handleChange} 
      class="appearance-none text-sm px-3 py-2 pr-8 outline-none cursor-pointer transition-all duration-150 rounded-md"
      style="
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid rgba(71, 85, 105, 0.4);
        color: {selected ? 'rgb(226, 232, 240)' : 'rgb(148, 163, 184)'};
      "
      on:mouseenter={(e) => { e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)'; }}
      on:mouseleave={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
      on:focus={(e) => {
        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.15)';
      }}
      on:blur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.4)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <option value="Select Runtime" disabled>Select Runtime</option>
      {#each runtimes as rt}
        <option value={rt}>{rt}</option>
      {/each}
    </select>
    <!-- Chevron Icon -->
    <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </div>
</div>
