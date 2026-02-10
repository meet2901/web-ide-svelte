<script>
  import { createEventDispatcher } from 'svelte';
  import { authStore } from '../../lib/stores/auth';
  
  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';
  let name = '';
  let isRegister = false;
  let error = '';
  
  async function handleSubmit() {
    error = '';
    
    if (isRegister) {
      if (!name) { error = 'Name is required'; return; }
      const res = await authStore.register(email, password, name);
      if (!res.success) error = res.error;
    } else {
      const res = await authStore.login(email, password);
      if (!res.success) error = res.error;
      else dispatch('close');
    }
  }
</script>

<div class="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div class="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl transition-transform duration-200 ease-in-out">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-white mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
      <p class="text-slate-400 text-sm">Sign in to access your cloud workspace</p>
    </div>

    {#if error}
      <div class="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
        {error}
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      {#if isRegister}
        <div>
          <label class="block text-slate-400 text-xs font-medium mb-1.5 ml-1">Full Name</label>
          <input 
            type="text" 
            bind:value={name}
            class="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            placeholder="John Doe"
          />
        </div>
      {/if}
      
      <div>
        <label class="block text-slate-400 text-xs font-medium mb-1.5 ml-1">Email Address</label>
        <input 
          type="email" 
          bind:value={email}
          class="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          placeholder="name@example.com"
        />
      </div>

      <div>
        <label class="block text-slate-400 text-xs font-medium mb-1.5 ml-1">Password</label>
        <input 
          type="password" 
          bind:value={password}
          class="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit"
        class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={$authStore.isLoading}
      >
        {#if $authStore.isLoading}
          <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
          Processing...
        {:else}
          {isRegister ? 'Create Account' : 'Sign In'}
        {/if}
      </button>
    </form>

    <div class="mt-6 text-center text-sm">
      <span class="text-slate-500">{isRegister ? 'Already have an account?' : "Don't have an account?"}</span>
      <button 
        class="ml-1 text-blue-400 hover:text-blue-300 font-medium transition-colors"
        on:click={() => { isRegister = !isRegister; error = ''; }}
      >
        {isRegister ? 'Sign in' : 'Create one'}
      </button>
    </div>
  </div>
</div>
