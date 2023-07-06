<script lang="ts">
  import { Alert, LoginForm, RegisterForm } from ".";
  import { user } from "$lib/stores";
  
  let showLoginModal = false, showRegisterModal = false;
  const logout = () => user.set(null);
</script>

<nav class="bg-black py-3 px-4 flex justify-between sticky top-0">
  <a class="text-white text-xl" href="/">
    Flaskal
  </a>
  {#if $user}
    <button class="text-white" on:click={logout}>
      Log Out
    </button>
  {:else}
    <button class="text-white" on:click={() => showLoginModal = !showLoginModal}>
      Log In
    </button>
  {/if}
</nav>
<Alert />
<LoginForm show={showLoginModal} showRegisterModal={() => {showLoginModal = !showLoginModal; showRegisterModal = !showRegisterModal}} />
<RegisterForm show={showRegisterModal} />