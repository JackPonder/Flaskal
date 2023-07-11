<script lang="ts">
  import { Poll, SideContent } from '$lib/components';
  export let data;
</script>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-6 md:col-start-2">
    <div class="card p-4">
      <a href="/create" class="btn-white block">
        Create a Poll
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
