<script>
  export let activePanel = 'files';
  export let bottomPanelVisible = true;
  export let rightSidebarVisible = true;
</script>

<footer class="h-6 flex items-center justify-between px-3 text-xs bg-[#007acc] border-t border-[#005a9e]">
  <div class="flex items-center gap-2 text-white/90">
    <button class="flex items-center gap-1.5 px-2 h-6 hover:bg-white/10 transition-colors rounded text-white/70">
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="6" y1="3" x2="6" y2="15"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M18 9a9 9 0 0 1-9 9"/>
      </svg>
      <span class="font-medium">main</span>
    </button>

    <span class="flex items-center gap-1 px-2 text-white/60">
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>0</span>
    </span>

    <span class="flex items-center gap-1 px-2 text-white/60">
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <span>0</span>
    </span>
  </div>

  <div class="flex items-center gap-4 text-white/70">
    <span>Ready</span>
  </div>

  <div class="flex items-center gap-3 text-white/60">
    <span>TypeScript</span>
    <span>UTF-8</span>
    <span>Ln 1, Col 1</span>
  </div>
</footer>
