<script>
  import { onDestroy, onMount } from 'svelte';
  import BottomPanel from '../components/bottompanel/BottomPanel.svelte';
  import CommandPalette from '../components/common/CommandPalette.svelte';
  import EditorArea from '../components/editor/EditorArea.svelte';
  import RightSidebar from '../components/rightpanel/RightSidebar.svelte';
  import ActivityBar from '../components/sidebar/ActivityBar.svelte';
  import ExtensionsPanel from '../components/sidebar/ExtensionsPanel.svelte';
  import GitPanel from '../components/sidebar/GitPanel.svelte';
  import LeftSidebar from '../components/sidebar/LeftSidebar.svelte';
  import SearchPanel from '../components/sidebar/SearchPanel.svelte';
  import SettingsPanel from '../components/sidebar/SettingsPanel.svelte';
  import StatusBar from '../components/statusbar/StatusBar.svelte';
  import TopNav from '../components/topnav/TopNav.svelte';

  let activePanel = null; // Sidebar collapsed by default
  let rightSidebarVisible = false; // Right panel hidden by default
  let bottomPanelVisible = false; // Terminal hidden by default
  let commandPaletteVisible = false; // Command palette hidden by default

  // Responsive screen width
  let screenWidth = 0;

  // Panel Dimensions State - IDE-standard sizes
  let leftWidth = 240; // Fixed width for consistent Explorer panel
  let rightWidth = 300; // Right panel width
  let bottomHeight = 200; // Terminal height

  // Resize State
  let isResizing = null; // 'left', 'right', 'bottom'
  let startX, startY, startDim;

  // Constraints
  const MIN_SIDEBAR_WIDTH = 200;
  const MAX_SIDEBAR_WIDTH = 500;
  const MIN_BOTTOM_HEIGHT = 100;
  const MAX_BOTTOM_HEIGHT = 600;

  // VS Code exact toggle behavior
  function handlePanelToggle(event) {
    const clickedPanel = event.detail.panel;
    
    // If clicking the same active panel -> close sidebar (activePanel = null)
    // If clicking a different panel -> switch to that panel (keep sidebar open)
    // If sidebar is closed -> open with clicked panel
    if (clickedPanel === activePanel) {
      activePanel = null; // Close sidebar
    } else {
      activePanel = clickedPanel; // Open/switch panel
    }
  }

  function startResize(type, event) {
    isResizing = type;
    startX = event.clientX;
    startY = event.clientY;
    
    if (type === 'left') startDim = leftWidth;
    if (type === 'right') startDim = rightWidth;
    if (type === 'bottom') startDim = bottomHeight;

    document.body.style.cursor = type === 'bottom' ? 'row-resize' : 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event) {
    if (!isResizing) return;

    if (isResizing === 'left') {
      const diff = event.clientX - startX;
      leftWidth = Math.min(Math.max(startDim + diff, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
    } else if (isResizing === 'right') {
      const diff = startX - event.clientX; // Inverted for right side
      rightWidth = Math.min(Math.max(startDim + diff, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
    } else if (isResizing === 'bottom') {
      const diff = startY - event.clientY; // Inverted for bottom (up increases height)
      bottomHeight = Math.min(Math.max(startDim + diff, MIN_BOTTOM_HEIGHT), MAX_BOTTOM_HEIGHT);
    }
  }

  function handleMouseUp() {
    isResizing = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }
  
  // Persist State (Session)
  onMount(() => {
     const saved = sessionStorage.getItem('ide_layout_v1');
     if (saved) {
         const state = JSON.parse(saved);
         if (state.left) leftWidth = state.left;
         if (state.right) rightWidth = state.right;
         if (state.bottom) bottomHeight = state.bottom;
         if (typeof state.rightVisible !== 'undefined') rightSidebarVisible = state.rightVisible;
         if (typeof state.bottomVisible !== 'undefined') bottomPanelVisible = state.bottomVisible;
         if (typeof state.activePanel !== 'undefined') activePanel = state.activePanel;
     }

     // Auto-save
     window.addEventListener('beforeunload', saveState);

     // Global keyboard navigation
     window.addEventListener('keydown', handleKeydown);

     // Responsive screen width
     const updateScreenWidth = () => {
       screenWidth = window.innerWidth;
     };
     updateScreenWidth();
     window.addEventListener('resize', updateScreenWidth);
  });

  function saveState() {
      sessionStorage.setItem('ide_layout_v1', JSON.stringify({
          left: leftWidth,
          right: rightWidth,
          bottom: bottomHeight,
          rightVisible: rightSidebarVisible,
          bottomVisible: bottomPanelVisible,
          activePanel: activePanel
      }));
  }

  onDestroy(() => {
      window.removeEventListener('beforeunload', saveState);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', () => {}); // Cleanup resize listener
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
  });

  // Reactive updates for save state when toggling
  $: {
      if (typeof sessionStorage !== 'undefined') saveState();
  }

  // Auto-collapse sidebars on small screens
  $: if (screenWidth < 768) {
      activePanel = null;
      rightSidebarVisible = false;
  }

  // Keyboard Navigation
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      // Close command palette if open, or close auth modal if open
      if (commandPaletteVisible) {
        commandPaletteVisible = false;
        event.preventDefault();
      } else {
        // Dispatch event to close auth modal (handled in App.svelte)
        window.dispatchEvent(new CustomEvent('closeAuthModal'));
        event.preventDefault();
      }
    } else if (event.ctrlKey && !event.shiftKey && event.key === 'b') {
      // Toggle left sidebar (files panel)
      activePanel = activePanel === 'files' ? null : 'files';
      event.preventDefault();
    } else if (event.ctrlKey && !event.shiftKey && event.key === '`') {
      // Toggle terminal
      bottomPanelVisible = !bottomPanelVisible;
      event.preventDefault();
    } else if (event.ctrlKey && event.shiftKey && event.key === 'P') {
      // Open command palette
      commandPaletteVisible = true;
      event.preventDefault();
    }
  }
</script>

<!-- IDE Layout: VS Code style with proper flex structure -->
<div class="h-screen w-screen flex flex-col bg-[#0a0f1a] overflow-hidden overflow-x-hidden relative z-0" data-theme="ide">
  <!-- Top Navigation Bar -->
  <div class="flex-shrink-0">
    <TopNav
      on:toggleRightSidebar={() => rightSidebarVisible = !rightSidebarVisible}
      on:toggleBottomPanel={() => bottomPanelVisible = !bottomPanelVisible}
      on:toggleCommandPalette={() => commandPaletteVisible = !commandPaletteVisible}
    />
  </div>
  
  <!-- Main Content Area - Flex Row Layout -->
  <div class="flex flex-1 overflow-hidden">
    <!-- LEFT SECTION -->
    <!-- Activity Bar (always visible) -->
    <div class="flex-shrink-0 w-12 bg-[#0f172a] border-r border-slate-800/50">
      <ActivityBar {activePanel} on:toggle={handlePanelToggle} />
    </div>
    
    <!-- Left Sidebar Panel (single container collapse) -->
    <div
      class="flex-shrink-0 bg-[#0f172a] border-r border-slate-800/50"
      style="width: {activePanel ? leftWidth : 0}px; 
             transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1); 
             overflow: hidden;
             will-change: {activePanel ? 'width' : 'auto'};"
    >
      {#if activePanel === 'files'}
        <LeftSidebar on:close={() => activePanel = null} />
      {:else if activePanel === 'search'}
        <SearchPanel on:close={() => activePanel = null} />
      {:else if activePanel === 'git'}
        <GitPanel on:close={() => activePanel = null} />
      {:else if activePanel === 'extensions'}
        <ExtensionsPanel on:close={() => activePanel = null} />
      {:else if activePanel === 'settings'}
        <SettingsPanel on:close={() => activePanel = null} />
      {/if}
    </div>
    
    <!-- Left Resizer (RIGHT edge of sidebar, VS Code-style) -->
    <div
      class="w-1.5 bg-slate-700/40 hover:bg-blue-500/60 cursor-col-resize flex-shrink-0 transition-colors duration-150"
      style="{isResizing === 'left' ? 'background-color: rgb(59 130 246);' : ''}"
      on:mousedown={(e) => startResize('left', e)}
    ></div>
    
    <!-- CENTER SECTION - Editor Area -->
    <div class="flex flex-col flex-1 min-w-0 bg-[#0a0f1a] overflow-hidden">
      <!-- Main Editor -->
      <div class="flex-1 min-h-0">
        <EditorArea />
      </div>
      
      <!-- Bottom Terminal Panel -->
      <!-- Bottom Resizer (positioned above panel) -->
      <div
        class="h-1.5 bg-slate-700/40 hover:bg-blue-500/60 cursor-row-resize flex-shrink-0 transition-colors duration-150"
        style="{isResizing === 'bottom' ? 'background-color: rgb(59 130 246);' : ''}"
        on:mousedown={(e) => startResize('bottom', e)}
      ></div>
      
      <!-- Bottom Panel (single container collapse) -->
      <div
        class="flex-shrink-0 bg-[#0f172a] border-t border-slate-800/50"
        style="height: {bottomPanelVisible ? bottomHeight : 0}px; 
               transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1); 
               overflow: hidden;
               will-change: {bottomPanelVisible ? 'height' : 'auto'};"
      >
        <BottomPanel on:close={() => bottomPanelVisible = false} />
      </div>
    </div>
    
    <!-- RIGHT SECTION - Secondary Sidebar (Team/Chat) -->
    <!-- Right Resizer (positioned before panel, left edge) -->
    <div
      class="w-1.5 bg-slate-700/40 hover:bg-blue-500/60 cursor-col-resize flex-shrink-0 transition-colors duration-150"
      style="{isResizing === 'right' ? 'background-color: rgb(59 130 246);' : ''}"
      on:mousedown={(e) => startResize('right', e)}
    ></div>
    
    <!-- Right Sidebar Panel (single container collapse) -->
    <div
      class="flex-shrink-0 bg-[#0f172a] border-l border-slate-800/50"
      style="width: {rightSidebarVisible ? rightWidth : 0}px; 
             transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1); 
             overflow: hidden;
             will-change: {rightSidebarVisible ? 'width' : 'auto'};"
    >
      <RightSidebar on:close={() => rightSidebarVisible = false} />
    </div>
  </div>
  
  <!-- Status Bar -->
  <div class="flex-shrink-0 h-6 bg-[#0f172a] border-t border-slate-800/50">
    <StatusBar {activePanel} {bottomPanelVisible} {rightSidebarVisible} />
  </div>

  <!-- Command Palette -->
  <CommandPalette
    visible={commandPaletteVisible}
    on:close={() => commandPaletteVisible = false}
  />
</div>

<style>
  :root {
    --ide-panel-border: #1e293b;
    --ide-background-primary: #0a0f1a;
    --ide-background-secondary: #0f172a;
    --ide-resizer-width: 1px;
  }
  
  /* Remove default focus outlines for IDE-native feel */
  *:focus {
    outline: none;
  }
  
  /* Ensure panels have no internal padding that competes with editor space */
  .ide-panel {
    padding: 0;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
  

</style>
