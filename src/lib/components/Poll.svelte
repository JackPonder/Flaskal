<script lang="ts">
  import type { PollSchema } from "$lib/schemas";
  import { api } from "$lib/api";
  import { user, alerts } from "$lib/stores";

  export let poll: PollSchema;
  $: showVotes = $user ? poll.voters.includes($user.username) : true;

  let vote: number;

  const submitVote = async () => {
    if ($user === null) {
      alerts.set("You must be logged in to vote.", "danger");
      return;
    }

    const response = await api.patch(`/polls/${poll.id}/vote`, {vote});
    if (!response.ok) {
      alerts.set("Something went wrong.", "danger");
      return;
    }
    
    poll = response.body;
  }
</script>

<div class="border rounded-md my-6 mx-2 p-6">
  <h4 class="text-xl mb-2">{poll.title}</h4>
  {#if showVotes}
    {#each poll.options as option}
      <div class="mb-2">
        <div>{option.name}</div>
        <div class="bg-gray-200 rounded-md">
          <div class="text-white text-center bg-blue-500 rounded-md" style="width: {option.percentage}%;">
            {option.percentage}%
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <form on:submit|preventDefault={submitVote}>
      {#each poll.options as option}
        <button class="btn-white w-full mb-2" type="submit" on:click={() => vote = option.id}>
          {option.name}
        </button>
      {/each}
    </form>
  {/if}
  <a href={`/polls/${poll.id}`}>
    {poll.totalVotes} {poll.totalVotes === 1 ? "Vote" : "Votes"},
    {poll.numComments} {poll.numComments === 1 ? "Comment" : "Comments"}
  </a>
</div>