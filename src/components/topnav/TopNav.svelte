<script>
  import { createEventDispatcher } from 'svelte';
  import { authStore } from '../../lib/stores/auth';
  import { projectStore } from '../../lib/stores/project';
  import RunControls from './RunControls.svelte';
  import RuntimeSelector from './RuntimeSelector.svelte';
  
  const dispatch = createEventDispatcher();
  let showProjectDropdown = false;

  // Load projects on mount if authenticated
  $: if ($authStore.isAuthenticated) {
    projectStore.loadProjects();
  }

  function handleLogout() {
    authStore.logout();
    window.location.reload(); // Clean state
  }

  function selectProject(project) {
    projectStore.setActiveProject(project);
    showProjectDropdown = false;
  }

  function handleCommandPalette() {
    dispatch('toggleCommandPalette');
  }

  async function handleCreateProject() {
    // Simple prompt for MVP
    const name = window.prompt("Enter project name:", "My App");
    if (!name) return;

    const res = await projectStore.createProject(name);
    if (!res.success) {
      alert("Failed to create project: " + res.error);
    } else {
      showProjectDropdown = false;
    }
  }
</script>

<nav class="h-12 flex items-center justify-between px-4 gap-4 relative" style="
  background: linear-gradient(180deg, #0f172a 0%, #0a0f1a 100%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
">
  <!-- Subtle top highlight -->
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent pointer-events-none"></div>
  
  <!-- Left section - App/Project Selector -->
  <div class="flex items-center gap-3 relative z-10">
    <div 
      class="relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-150 group"
      style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(51, 65, 85, 0.6);"
      on:mouseenter={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'; e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.7)'; }}
      on:mouseleave={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'; e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.6)'; }}
      on:click={() => showProjectDropdown = !showProjectDropdown}
    >
      <div class="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M3 3h18v18H3z"/>
          <path d="M9 3v18"/>
          <path d="M3 9h6"/>
        </svg>
      </div>
      
      {#if $projectStore.isLoading && !$projectStore.activeProject}
        <span class="text-sm text-slate-300 animate-pulse">Loading...</span>
      {:else}
        <span class="text-sm font-medium text-slate-200">
          {$projectStore.activeProject ? $projectStore.activeProject.name : 'Select Project'}
        </span>
      {/if}

      <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>

      <!-- Project Dropdown -->
      {#if showProjectDropdown}
        <div class="absolute top-full left-0 mt-2 w-64 rounded-xl card-elevated z-40 animate-fade-in overflow-hidden" on:click|stopPropagation>
          <div class="px-4 py-3 border-b divider-strong text-xs font-semibold text-subtle uppercase tracking-wider">
            Switch Project
          </div>
          
          <div class="max-h-60 overflow-y-auto">
            {#each $projectStore.projects as project}
              <button 
                class="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-150 flex items-center gap-3 group"
                on:click={() => selectProject(project)}
              >
                <div class="w-2 h-2 rounded-full {project.id === $projectStore.activeProject?.id ? 'bg-blue-500' : 'bg-slate-600'} transition-colors"></div>
                <span class="group-hover:text-white transition-colors">{project.name}</span>
              </button>
            {/each}
            
            {#if $projectStore.projects.length === 0}
               <div class="px-4 py-4 text-sm text-subtle italic text-center">No projects found</div>
            {/if}
          </div>
          
          <button 
            class="w-full px-4 py-3 border-t divider-strong text-left text-xs font-medium text-blue-400 hover:bg-slate-700/50 hover:text-blue-300 transition-colors duration-150 flex items-center justify-center gap-2"
            on:click={handleCreateProject}
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Project
          </button>
        </div>
      {/if}
    </div>
    
    <!-- Separator -->
    <div class="w-px h-7 bg-slate-700/50"></div>
  </div>

  <!-- Center section - Enhanced Command Bar -->
  <div class="flex-1 max-w-2xl relative z-10 px-8">
    <div class="relative group">
      <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-blue-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        placeholder="Search files, commands... (⌘K)"
        class="w-full pl-11 pr-20 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200"
        style="
          background: linear-gradient(180deg, #1e293b 0%, #1a2332 100%);
          border: 1px solid rgba(71, 85, 105, 0.4);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        "
        on:focus={(e) => {
          e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
          e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(59, 130, 246, 0.15)';
        }}
        on:blur={(e) => {
          e.target.style.borderColor = 'rgba(71, 85, 105, 0.4)';
          e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.3)';
        }}
        on:keydown={(e) => { if (e.key === 'Enter') handleCommandPalette(); }}
      />
      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
        <span class="text-xs text-slate-500 font-mono px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">⌘K</span>
      </div>
    </div>
  </div>

  <!-- Right section - Actions -->
  <div class="flex items-center gap-2.5 relative z-10">
    <!-- Separator -->
    <div class="w-px h-7 bg-slate-700/50 mr-1"></div>
    
    <RuntimeSelector />
    <RunControls />
    
    <!-- Separator -->
    <div class="w-px h-7 bg-slate-700/50 mx-1"></div>
    
    <button 
      class="h-9 px-3 rounded-md text-slate-300 hover:text-slate-100 transition-all duration-150 flex items-center justify-center gap-2"
      style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(71, 85, 105, 0.4);"
      on:mouseenter={(e) => { e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)'; }}
      on:mouseleave={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
      on:click={() => dispatch('toggleBottomPanel')}
      aria-label="Toggle Terminal"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
      <span class="text-xs font-medium">Terminal</span>
    </button>
    
    <button 
      class="h-9 px-3 rounded-md text-slate-300 hover:text-slate-100 transition-all duration-150 flex items-center justify-center gap-2"
      style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(71, 85, 105, 0.4);"
      on:mouseenter={(e) => { e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)'; }}
      on:mouseleave={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
      on:click={() => dispatch('toggleRightSidebar')}
      aria-label="Toggle Chat"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span class="text-xs font-medium">Chat</span>
    </button>
    
    <!-- Separator -->
    <div class="w-px h-7 bg-slate-700/50 mx-1"></div>
    
    <!-- User Avatar / Auth State -->
    {#if $authStore.user}
      <div class="group relative">
        <button class="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-150 border border-blue-400/20">
          {$authStore.user.name.substring(0, 2).toUpperCase()}
        </button>
        
        <!-- Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-52 py-2 rounded-xl card-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div class="px-4 py-3 border-b divider-strong">
            <div class="text-sm font-medium text-slate-200">{$authStore.user.name}</div>
            <div class="text-xs text-subtle truncate mt-1">{$authStore.user.email}</div>
          </div>
          <button 
            on:click={handleLogout}
            class="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors duration-150 flex items-center gap-3"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    {:else}
      <!-- Placeholder if loading -->
      <div class="w-9 h-9 rounded-md bg-slate-700 animate-pulse"></div>
    {/if}
  </div>
</nav>
