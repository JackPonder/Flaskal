<script lang="ts">
  import type { PollSchema } from "$lib/schemas";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { formatRelativeDate } from "$lib/utils";

  export let poll: PollSchema;
  export let deletable = false;

  let filterByTagLink = `/?tag=${poll.tag || ""}`;
  
  $: if ($page.url.pathname === "/") {
    const params = new URLSearchParams($page.url.searchParams);
    params.set("tag", poll.tag || "");
    filterByTagLink = "/?" + params.toString();
  }
</script>

<div class="card p-6">
  <small>
    Posted by 
    <a href={`/users/${poll.creator}/polls`} class="hover:underline">{poll.creator}</a> 
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
  {#if $page.data.currentUser ? poll.voters.includes($page.data.currentUser.username) : true}
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
    <form action={`/polls/${poll.id}?/vote`} method="post" use:enhance>
      {#each poll.options as option}
        <button class="btn-white w-full mb-2" type="submit" name="vote" value={option.name}>
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
      <form action="?/delete" method="post">
        <button type="submit" name="pollId" value={poll.id}
          class="flex items-center hover:bg-gray-200 duration-200 rounded-md py-1 px-2">
          <img src="/icons/delete.svg" alt="Delete" class="h-4 mr-2" />
          Delete
        </button>
      </form>
    {/if}
  </div>
</div>