<script lang="ts">
  import { Poll, SideContent } from '$lib/components';
  import { page } from '$app/stores';

  export let data;

  let sortByLinks = { 
    new: "/?sort=new", 
    top: "/?sort=top",
  };

  $: {
    const params = new URLSearchParams($page.url.searchParams);
    Object.keys(sortByLinks).forEach(key => {
      params.set("sort", key);
      sortByLinks[key as keyof typeof sortByLinks] = "/?" + params.toString();
    });
  }
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
      <a href={sortByLinks.new} class="text-center rounded-md py-1" 
        class:active={["new", null].includes($page.url.searchParams.get("sort"))}>
        New
      </a>
      <a href={sortByLinks.top} class="text-center rounded-md py-1" 
        class:active={$page.url.searchParams.get("sort") === "top"}>
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
