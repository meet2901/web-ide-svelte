<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let visible = true;
  
  let extensions = [
    {
      id: 1,
      name: 'ESLint',
      description: 'Integrates ESLint JavaScript into VS Code.',
      icon: 'eslint'
    },
    {
      id: 2,
      name: 'Prettier',
      description: 'Code formatter using prettier.',
      icon: 'prettier'
    },
    {
      id: 3,
      name: 'GitLens',
      description: 'Supercharge the Git capabilities built into Visual Studio Code.',
      icon: 'gitlens'
    },
    {
      id: 4,
      name: 'Live Server',
      description: 'Launch a development local Server with live reload feature.',
      icon: 'liveserver'
    },
    {
      id: 5,
      name: 'Bracket Pair Colorizer',
      description: 'A customizable extension for colorizing matching brackets.',
      icon: 'bracket'
    },
    {
      id: 6,
      name: 'Auto Rename Tag',
      description: 'Automatically rename paired HTML/JSX tags.',
      icon: 'autotag'
    },
    {
      id: 7,
      name: 'Path Intellisense',
      description: 'Visual Studio Code plugin that autocompletes filenames.',
      icon: 'path'
    },
    {
      id: 8,
      name: 'Material Icon Theme',
      description: 'Material Design Icons for Visual Studio Code.',
      icon: 'material'
    }
  ];
  let searchQuery = '';
</script>

{#if visible}
  <aside class="flex flex-col overflow-hidden animate-slide-in" style="background-color: #0f172a; border-right: 1px solid #334155;">
    <div class="flex items-center justify-between px-3 py-2" style="border-bottom: 1px solid #334155;">
      <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Extensions</span>
      <button class="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-200 hover-scale active-press" on:click={() => dispatch('close')} aria-label="Close Panel">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="p-3" style="border-bottom: 1px solid #334155;">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21L16.65 16.65"/>
        </svg>
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Search extensions..."
          class="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/50"
          style="background-color: #1e293b; border: 1px solid #334155;"
        />
      </div>
      
      <div class="flex gap-1 mt-3">
        <button class="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 font-medium">Installed</button>
        <button class="px-3 py-1 text-xs rounded-full hover:bg-slate-700/50 text-slate-400 transition-colors">Popular</button>
        <button class="px-3 py-1 text-xs rounded-full hover:bg-slate-700/50 text-slate-400 transition-colors">Recommended</button>
      </div>
    </div>
    
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="8" height="8" rx="1"/>
          <rect x="13" y="3" width="8" height="8" rx="1"/>
          <rect x="3" y="13" width="8" height="8" rx="1"/>
          <rect x="13" y="13" width="8" height="8" rx="1"/>
        </svg>
      </div>
      <p class="text-sm text-slate-500 leading-relaxed">No extensions installed.<br/>Browse the marketplace to add functionality.</p>
    </div>
  </aside>
{/if}
