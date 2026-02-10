<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let visible = false;

  let inputElement;
  let selectedIndex = 0;

  const commands = [
    { label: 'File: New File', shortcut: 'Ctrl+N' },
    { label: 'File: Open File', shortcut: 'Ctrl+O' },
    { label: 'File: Save', shortcut: 'Ctrl+S' },
    { label: 'Edit: Copy', shortcut: 'Ctrl+C' },
    { label: 'Edit: Paste', shortcut: 'Ctrl+V' },
    { label: 'View: Toggle Terminal', shortcut: 'Ctrl+`' },
    { label: 'View: Toggle Sidebar', shortcut: 'Ctrl+B' },
    { label: 'Git: Commit', shortcut: 'Ctrl+Enter' },
    { label: 'Terminal: New Terminal', shortcut: 'Ctrl+Shift+`' },
    { label: 'Preferences: Open Settings', shortcut: 'Ctrl+,' }
  ];

  function handleKeydown(event) {
    if (!visible) return;

    switch (event.key) {
      case 'Escape':
        dispatch('close');
        break;
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, commands.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        break;
      case 'Enter':
        // Just close for now, no real command execution
        dispatch('close');
        break;
    }
  }

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      dispatch('close');
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  $: if (visible && inputElement) {
    inputElement.focus();
  }
</script>

{#if visible}
  <!-- Overlay -->
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-start justify-center pt-20 transition-opacity duration-200 ease-in-out"
    on:click={handleClickOutside}
  >
    <!-- Command Palette -->
    <div class="w-96 max-w-lg bg-[#1e1e1e] border border-[#3e3e42] rounded-lg shadow-2xl overflow-hidden transition-transform duration-200 ease-in-out">
      <!-- Input -->
      <div class="p-3 border-b border-[#3e3e42]">
        <input
          bind:this={inputElement}
          type="text"
          placeholder="Type a command or search..."
          class="w-full bg-transparent text-white placeholder-gray-400 outline-none"
        />
      </div>

      <!-- Commands List -->
      <div class="max-h-80 overflow-y-auto">
        {#each commands as command, index}
          <div
            class="flex items-center justify-between px-3 py-2 hover:bg-[#2d2d30] cursor-pointer {selectedIndex === index ? 'bg-[#094771]' : ''}"
          >
            <span class="text-white text-sm">{command.label}</span>
            <span class="text-gray-400 text-xs">{command.shortcut}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
