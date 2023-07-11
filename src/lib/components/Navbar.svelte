<script lang="ts">
  import { modals, user } from "$lib/stores";
</script>

<nav class="bg-gray-900 py-3 px-4 flex justify-between sticky top-0 z-10">
  <a class="flex items-center text-white text-xl" href="/">
    <img src="/icons/flask.svg" class="flex items-center h-6 mr-2" alt="">
    Flaskal
  </a>
  {#if $user}
    <a class="text-white self-center" href={`/users/${$user.username}`}>
      {$user.username}
    </a>
  {:else}
    <button class="text-white" on:click={() => modals.set(1)}>
      Log In
    </button>
  {/if}
</nav>