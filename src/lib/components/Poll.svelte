<script lang="ts">
  import type { PollSchema } from "$lib/schemas";
  import { api } from "$lib/api";
  import { user, alerts } from "$lib/stores";
  import { formatRelativeDate } from "$lib/utils";

  export let poll: PollSchema;

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

<div class="card p-6">
  <small>
    Posted by 
    <a href={`/users/${poll.creator}`} class="hover:underline">{poll.creator}</a> 
    {formatRelativeDate(new Date(poll.timestamp))}
  </small>
  <div class="flex justify-between mb-2">
    <h4 class="text-xl">{poll.title}</h4>  
    {#if poll.tag}
      <span class="flex items-center bg-gray-500 text-white rounded-md px-2">
        {poll.tag}
      </span>
    {/if}  
  </div>
  {#if $user ? poll.voters.includes($user.username) : true}
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
  <div class="flex">
    <div class="flex items-center">
      <img src="/icons/graph.svg" alt="" class="h-5 mx-2" />
      {poll.totalVotes} {poll.totalVotes === 1 ? "Vote" : "Votes"}      
    </div>
    <a class="flex items-center" href={`/polls/${poll.id}`}>
      <img src="/icons/comment.svg" alt="" class="h-5 mx-2" />
      {poll.numComments} {poll.numComments === 1 ? "Comment" : "Comments"}      
    </a>
  </div>
</div>