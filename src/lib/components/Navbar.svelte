<script lang="ts">
  import { modals, user } from "$lib/stores";
</script>

<nav class="bg-black py-3 px-4 flex justify-between sticky top-0">
  <a class="text-white text-xl" href="/">
    Flaskal
  </a>
  {#if $user}
    <button class="text-white" on:click={() => user.set(null)}>
      Log Out
    </button>
  {:else}
    <button class="text-white" on:click={() => modals.set(1)}>
      Log In
    </button>
  {/if}
</nav>