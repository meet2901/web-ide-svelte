<script>
  import { createEventDispatcher } from 'svelte';
  import { fileStore } from '../../lib/stores/files';
  import { projectStore } from '../../lib/stores/project';
  import FileItem from './FileItem.svelte';

  const dispatch = createEventDispatcher();

  // Reload files when active project changes
  $: if ($projectStore.activeProject) {
    fileStore.loadFiles($projectStore.activeProject.id);
  }
</script>

<div class="flex-1 overflow-y-auto py-0.5">
  {#if $fileStore.isLoading}
     <div class="flex items-center justify-center h-20 text-slate-500 text-sm">
       Loading files...
     </div>
  {:else if $fileStore.files.length === 0}
    <!-- Empty State -->
    <div class="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z"/>
        </svg>
      </div>
      <p class="text-sm text-slate-500 leading-relaxed">
        {#if !$projectStore.activeProject}
          Select a project to see files
        {:else}
          No files yet.<br/>Create a file to get started.
        {/if}
      </p>
    </div>
  {:else}
    <!-- File Tree -->
    {#each $fileStore.files as file}
      <FileItem
        {file}
        active={$fileStore.activeFile?.id === file.id}
        on:click={(e) => fileStore.openFile(e.detail)}
      />
    {/each}
  {/if}
</div>
