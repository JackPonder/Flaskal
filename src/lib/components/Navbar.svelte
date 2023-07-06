<script lang="ts">
  import { Alert, LoginForm, RegisterForm } from ".";
  import { modals, user } from "$lib/stores";
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
    <button class="text-white" on:click={() => modals.set(1)}>
      Log In
    </button>
  {/if}
</nav>
<Alert />
<LoginForm />
<RegisterForm  />