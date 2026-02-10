<script>
  import { createEventDispatcher } from 'svelte';
  import { fileStore } from '../../lib/stores/files';
  import { projectStore } from '../../lib/stores/project';
  import FileTree from './FileTree.svelte';
  import CollapsibleView from './CollapsibleView.svelte';
  import OutlineView from './OutlineView.svelte';
  import TimelineView from './TimelineView.svelte';

  const dispatch = createEventDispatcher();

  export let visible = true;
  
  async function createItem(type) {
    const project = $projectStore.activeProject;
    if (!project) return;
    
    const defaultName = type === 'file' ? 'newFile.js' : 'newFolder';
    const name = window.prompt(`Enter ${type} name:`, defaultName);
    if (!name) return;
    
    // Use store directly
    if (type === 'file') {
      fileStore.createFile(name);
    } else if (type === 'folder') {
      fileStore.createFolder(name);
    }
    
    // Refresh file tree
    await fileStore.loadFiles(project.id);
  }
  
  function collapseAll() {
    // This would collapse all folders in the file tree
    console.log('Collapse all folders');
    // Implementation would require updating the file store to set expanded=false on all folders
  }
</script>

{#if visible}
  <aside class="flex flex-col overflow-hidden animate-slide-in" style="background-color: #0f172a; border-right: 1px solid #334155;" on:close={() => dispatch('close')}>
    <div class="flex items-center justify-between px-3 py-2" style="border-bottom: 1px solid #334155;">
      <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Explorer</span>
      <div class="flex gap-1">
        <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" on:click={() => dispatch('close')} aria-label="Close Panel">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" aria-label="New File" on:click={() => createItem('file')}>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
        </button>
        <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" aria-label="New Folder" on:click={() => createItem('folder')}>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            <line x1="12" y1="11" x2="12" y2="17"/>
            <line x1="9" y1="14" x2="15" y2="14"/>
          </svg>
        </button>
        <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" on:click={collapseAll} aria-label="Collapse All">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 14 10 14 10 20"/>
            <polyline points="20 10 14 10 14 4"/>
            <line x1="14" y1="10" x2="21" y2="3"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Scrollable container for all collapsible views -->
    <div class="flex-1 overflow-y-auto">
      <!-- File Tree View -->
      <CollapsibleView title={$projectStore.activeProject?.name || 'No Project'} defaultExpanded={true}>
        <FileTree />
      </CollapsibleView>
      
      <!-- Outline View -->
      <CollapsibleView title="Outline" defaultExpanded={false}>
        <OutlineView />
      </CollapsibleView>
      
      <!-- Timeline View -->
      <CollapsibleView title="Timeline" defaultExpanded={false}>
        <TimelineView />
      </CollapsibleView>
    </div>
  </aside>
{/if}
