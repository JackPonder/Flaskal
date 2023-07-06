<script lang="ts">
  import { Poll, SideContent } from '$lib/components';
  export let data;
</script>

<div class="bg-gray-100 text-center py-24">
  <h1 class="text-4xl font-semibold mb-2">Welcome to Flaskal!</h1>
  <h6 class="text-md font-semibold">Create polls for the community to answer</h6>
</div>
<div class="grid grid-cols-12 mx-28">
  <div class="col-span-6 col-start-2">
    <div class="border border-gray-300 my-6 mx-2 p-4 rounded-md">
      <a href="/create" class="btn-white block">
        Create a Poll
      </a>
    </div>
    {#each data.polls as poll}
      <Poll {poll} />
    {/each}
  </div>
  <div class="col-span-4">
    <SideContent linkCreate />
  </div>
</div>
