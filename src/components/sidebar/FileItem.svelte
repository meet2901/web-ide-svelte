<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  import { fileStore } from '../../lib/stores/files';

  export let file;
  export let active = false;
  export let depth = 0;

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (file.type === 'folder') {
      fileStore.toggleFolder(file.id);
    } else {
      dispatch('click', file);
    }
  }
</script>

<div>
  <button
    class="w-full flex items-center gap-1 px-2 py-0.5 text-[11.5px] transition-colors relative group
      {active ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/70 hover:text-slate-200'}"
    style="padding-left: {depth * 12 + 8}px"
    on:click={handleClick}
  >
    {#if active && file.type === 'file'}
      <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"></div>
    {/if}
    
    <!-- Icon -->
    {#if file.type === 'folder'}
       <svg class="w-3.5 h-3.5 text-slate-500 {file.expanded ? 'rotate-90' : ''} transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
      <svg class="w-3.5 h-3.5 transition-colors duration-200 {file.expanded ? 'text-blue-400' : 'text-blue-500'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         {#if file.expanded}
           <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
         {:else}
           <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="currentColor" fill-opacity="0.2"/>
         {/if}
      </svg>
    {:else}
      <!-- File Icon -->
       <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
         <polyline points="13 2 13 9 20 9"/>
       </svg>
    {/if}
    
    {#if active && file.type === 'file'}
      <input
        type="text"
        value={file.name}
        class="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400"
        on:keydown={(e) => {
          if (e.key === 'Enter') {
            // TODO: Implement rename logic
            e.target.blur();
          } else if (e.key === 'Escape') {
            e.target.value = file.name;
            e.target.blur();
          }
        }}
        on:blur={(e) => {
          // TODO: Implement rename logic
          e.target.value = file.name;
        }}
      />
    {:else}
      <span class="truncate">{file.name}</span>
    {/if}
  </button>
  
  {#if file.type === 'folder' && file.expanded && file.children}
    <div transition:slide={{ duration: 200 }}>
      {#each file.children as child (child.id)}
        <svelte:self
          file={child}
          active={active}
          depth={depth + 1}
          on:click
        />
      {/each}
    </div>
  {/if}
</div>
