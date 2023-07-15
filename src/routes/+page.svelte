<script lang="ts">
  import { Poll, SideContent } from '$lib/components';
  import { page } from '$app/stores';
  export let data;
</script>

<style lang="postcss">
  .active {
    @apply bg-blue-500 text-white
  }
</style>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-6 md:col-start-2">
    <div class="card p-4">
      <a href="/create" class="btn-white block">
        Create a Poll
      </a>
    </div>
    <div class="card p-4 grid grid-cols-2">
      <a class="text-center rounded-md py-1" 
        class:active={!$page.url.searchParams.get("sort")} href="/">
        New
      </a>
      <a class="text-center rounded-md py-1" 
        class:active={$page.url.searchParams.get("sort") === "top"} href="/?sort=top">
        Top
      </a>
    </div>
    {#each data.polls as poll}
      <Poll {poll} />
    {/each}
  </div>
  <div class="md:col-span-4">
    <SideContent hasCreateButton />
  </div>
</div>
