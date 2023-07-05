<script lang="ts">
  import { LoginForm, RegisterForm } from ".";
  import type { UserSchema } from "$lib/schemas";
  let user: UserSchema;
</script>

<nav class="navbar navbar-dark bg-dark sticky-top">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Flaskal</a>
    {#if user}
      <button class="text-white bg-dark border-0">
        Log Out
      </button>
    {:else}
      <button class="text-white bg-dark border-0" data-bs-toggle="modal" data-bs-target="#loginModal">
        Log In
      </button>
    {/if}
	</div>
</nav>
<LoginForm />
<RegisterForm />