<script>
  import { onMount } from 'svelte';
  import AuthModal from './components/auth/AuthModal.svelte';
  import IDELayout from './layouts/IDELayout.svelte';
  import { authStore } from './lib/stores/auth';

  import { projectStore } from './lib/stores/project';
  import { connectSocket } from './lib/websocket/client';

  let showAuthModal = true;

  // Check authentication on load
  onMount(() => {
    authStore.checkAuth();
    if ($authStore.token) {
        connectSocket();
    }

    // Listen for close auth modal event
    const handleCloseAuthModal = () => {
      showAuthModal = false;
    };
    window.addEventListener('closeAuthModal', handleCloseAuthModal);

    return () => {
      window.removeEventListener('closeAuthModal', handleCloseAuthModal);
    };
  });

  // Load projects when authenticated
  $: if ($authStore.isAuthenticated) {
    projectStore.loadProjects();
    connectSocket();
  }
</script>

<main class="h-screen w-screen overflow-hidden">
  <!-- Main IDE Layout -->
  <IDELayout />
  
  <!-- Auth Modal Overlay (Shows if not authenticated and not manually closed) -->
  {#if !$authStore.isAuthenticated && !$authStore.isLoading && showAuthModal}
    <AuthModal />
  {/if}
</main>
