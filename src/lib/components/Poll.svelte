<script lang="ts">
  import type { PollSchema } from "$lib/schemas";
  export let poll: PollSchema;
  export let showVotes = true;

  let vote: number;
  const submitVote = (event: Event) => {}
</script>

<div class="border rounded-md my-6 mx-2 p-6">
  <h4 class="text-2xl mb-2">{poll.title}</h4>
  <div class="">
    {#if showVotes}
      {#each poll.options as option}
        <div class="mb-2">
          <div>{option.name}</div>
          <div class="bg-gray-300 rounded-md">
            <div class="text-white text-center bg-blue-500 rounded-md" style="width: {option.percentage}%;">
              {option.percentage}%
            </div>
          </div>
        </div>
      {/each}
      <a href={`/polls/${poll.id}`}>
        {poll.totalVotes} Votes
      </a>
    {:else}
      <form on:submit|preventDefault={submitVote}>
        {#each poll.options as option}
            <button class="btn-white w-full mb-2" type="submit" on:click={() => vote = option.id}>
              {option.name}
            </button>
        {/each}
      </form>
    {/if}
  </div>
</div>