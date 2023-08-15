<script lang="ts">
  import { Poll } from '$lib/components';

  export let data;
</script>

{#each data.polls as poll}
  <Poll {poll} />
{:else}
  <div class="card p-4 text-center">
    Looks like {data.user.username} hasn't created any polls
  </div>
{/each}