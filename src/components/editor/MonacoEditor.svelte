<script>
  import * as monaco from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import { onDestroy, onMount } from 'svelte';
  import { get } from 'svelte/store';
  
  import { fileStore } from '../../lib/stores/files';
  
  self.MonacoEnvironment = {
    getWorker: function (_moduleId, label) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    }
  };

  let container;
  let editor;

  // Handle file changes - update editor when active file changes
  $: if ($fileStore.activeFile && editor) {
    const file = $fileStore.activeFile;
    const currentModel = editor.getModel();
    
    // Always update content and language when file changes
    // This prevents content bleeding between files
    if (currentModel) {
        // Set content regardless of difference to ensure clean state
        editor.setValue(file.content || '');
        
        // Update language
        const lang = getLanguageFromPath(file.path || file.name || '');
        monaco.editor.setModelLanguage(currentModel, lang);
    }
  }

  function getLanguageFromPath(p) {
    if (p.endsWith('.ts') || p.endsWith('.tsx')) return 'typescript';
    if (p.endsWith('.js') || p.endsWith('.jsx')) return 'javascript';
    if (p.endsWith('.json')) return 'json';
    if (p.endsWith('.py')) return 'python';
    if (p.endsWith('.go')) return 'go';
    if (p.endsWith('.rs')) return 'rust';
    if (p.endsWith('.md')) return 'markdown';
    if (p.endsWith('.css')) return 'css';
    if (p.endsWith('.html')) return 'html';
    if (p.endsWith('.svelte')) return 'html'; // Svelte files get HTML highlighting
    return 'plaintext';
  }
  
  function showSaveNotification() {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'File saved';
    notification.className = 'fixed top-4 right-4 px-3 py-2 bg-green-600 text-white text-sm rounded-lg shadow-lg z-30 animate-fade-in';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('animate-fade-in');
      notification.classList.add('animate-fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 2000);
  }

  onMount(() => {
    if (!container) return;

    // IDE-native Monaco configuration - editor as primary surface
    editor = monaco.editor.create(container, {
      value: $fileStore.activeFile?.content || '',
      language: getLanguageFromPath($fileStore.activeFile?.path || ''),
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 13, // IDE-standard font size
      lineHeight: 20, // Proper line height for readability
      minimap: { 
        enabled: true,
        showSlider: 'always',
        renderCharacters: false // Cleaner minimap
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      fontWeight: '400',
      scrollBeyondLastLine: false, // IDE-standard behavior
      smoothScrolling: true,
      mouseWheelZoom: true, // Allow zoom with Ctrl+Mousewheel
      padding: { top: 12 }, // Reduced padding for more editor space
      renderLineHighlight: 'all', // Highlight current line
      renderWhitespace: 'none', // Clean appearance
      renderControlCharacters: false,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      wordWrap: 'off',
      wrappingIndent: 'same',
      folding: true,
      showFoldingControls: 'mouseover'
    });

    // Ensure content is set correctly after editor creation
    if ($fileStore.activeFile?.content) {
      editor.setValue($fileStore.activeFile.content);
    }

    // Listen for content changes and update store
    editor.onDidChangeModelContent(() => {
      const activeFile = get(fileStore).activeFile;
      if (activeFile) {
         fileStore.updateFileContent(activeFile.id, editor.getValue());
      }
    });
    
    // Keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      fileStore.saveFile();
      // Show save feedback
      showSaveNotification();
    });
    
    // Quick open/search - CMD+P
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
      // Dispatch custom event for quick open
      window.dispatchEvent(new CustomEvent('quickOpen'));
    });
  });

  onDestroy(() => {
    if (editor) editor.dispose();
  });
</script>

<div class="w-full h-full flex flex-col overflow-hidden" style="background-color: #0a0f1a;">
  <div bind:this={container} class="flex-1 w-full h-full min-h-0"></div>
</div>
