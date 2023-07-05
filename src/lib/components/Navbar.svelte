<script lang="ts">
  import { Alert, LoginForm, RegisterForm } from ".";
  import { user } from "$lib/stores";
  
  const logout = () => user.set(null);
</script>

<nav class="navbar navbar-dark bg-dark sticky-top">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Flaskal</a>
    {#if $user}
      <button class="text-white bg-dark border-0" on:click={logout}>
        Log Out
      </button>
    {:else}
      <button class="text-white bg-dark border-0" data-bs-toggle="modal" data-bs-target="#loginModal">
        Log In
      </button>
    {/if}
	</div>
</nav>
<Alert />
<LoginForm />
<RegisterForm />