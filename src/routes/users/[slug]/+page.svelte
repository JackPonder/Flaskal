<script lang="ts">
  import { Poll, Comment } from "$lib/components";
  import img from "$lib/assets/flask.png";

  export let data;

  enum DisplayOptions { 
    Polls = "Polls", 
    Comments = "Comments",
  };

  let display = DisplayOptions.Polls;
</script>

<style lang="postcss">
  .active {
    @apply text-white bg-blue-500
  }
</style>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-4 md:col-start-2">
    <div class="card p-4 sticky top-[75px] flex flex-col items-center">
      <img src={img} alt="" height=50% class="my-6">
      <h2 class="text-2xl font-semibold">{data.user.username}</h2>
      <h4 class="text-lgxl mb-3">Joined {new Date(data.user.dateJoined).toDateString()}</h4>
    </div>
  </div>
  <div class="md:col-span-6">
    <ul class="card p-4 grid grid-cols-2">
      {#each Object.values(DisplayOptions) as option}
        <button class="text-center rounded-md py-1.5 duration-200" 
            class:active={display === option} on:click={() => display = option}>
          {option}
        </button>
      {/each}
    </ul>
    {#if display === DisplayOptions.Polls}
      {#if data.polls.length === 0}
        <div class="card p-4 text-center">
          Looks like {data.user.username} hasn't created any polls.
        </div>
      {/if}
      {#each data.polls as poll}
        <Poll {poll} />
      {/each}
    {:else if display === DisplayOptions.Comments}
      {#if data.comments.length === 0}
        <div class="card p-4 text-center">
          Looks like {data.user.username} hasn't created any comments.
        </div>
      {/if}
      {#each data.comments as comment}
        <Comment {comment} link="Poll" />
      {/each}    
    {/if}
  </div>
</div>