<script lang="ts">
  import type { PollSchema } from "$lib/schemas";
  import { api } from "$lib/api";
  import { user, alerts } from "$lib/stores";
  import { formatRelativeDate } from "$lib/utils";
  import { page } from "$app/stores";

  export let poll: PollSchema;
  export let deletable = false;

  let filterByTagLink = `/?tag=${poll.tag || ""}`;
  
  $: if ($page.url.pathname === "/") {
    const params = new URLSearchParams($page.url.searchParams);
    params.set("tag", poll.tag || "");
    filterByTagLink = "/?" + params.toString();
  }

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

  let ref: HTMLElement;

  const deletePoll = async () => {
    const res = await api.delete(`/polls/${poll.id}`);
    if (!res.ok) {
      alerts.set("Something went wrong", "danger");
      return;
    }

    alerts.set("Successfully deleted poll", "info");
    ref.remove();
  }
</script>

<div class="card p-6" bind:this={ref}>
  <small>
    Posted by 
    <a href={`/users/${poll.creator}`} class="hover:underline">{poll.creator}</a> 
    {formatRelativeDate(new Date(poll.timestamp))}
  </small>
  <div class="flex justify-between mb-2">
    <h4 class="text-xl break-all">{poll.title}</h4>
    {#if poll.tag}
      <a href={filterByTagLink} class="flex items-center bg-gray-500 text-white rounded-md px-2">
        {poll.tag}
      </a>
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
  <div class="flex flex-wrap">
    <div class="flex items-center py-1 px-2">
      <img src="/icons/graph.svg" alt="" class="h-5 mr-2" />
      {poll.totalVotes} {poll.totalVotes === 1 ? "Vote" : "Votes"}      
    </div>
    <a class="flex items-center hover:bg-gray-200 duration-200 rounded-md py-1 px-2" href={`/polls/${poll.id}`}>
      <img src="/icons/comment.svg" alt="" class="h-5 mr-2" />
      {poll.numComments} {poll.numComments === 1 ? "Comment" : "Comments"}      
    </a>
    {#if deletable}
      <button on:click={deletePoll} class="flex items-center hover:bg-gray-200 duration-200 rounded-md py-1 px-2">
        <img src="/icons/delete.svg" alt="" class="h-4 mr-2" />
        Delete
      </button>
    {/if}
  </div>
</div>