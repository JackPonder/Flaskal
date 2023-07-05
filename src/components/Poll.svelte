<script lang="ts">
  import type { PollSchema } from "../schemas";
  export let poll: PollSchema;
  export let showVotes = true;

  let vote: number;
  const submitVote = (event: Event) => {}
</script>

<div class="card my-4">
  <div class="card-body m-2">
    <h4 class="card-title">{poll.title}</h4>
    <div class="card-text">
      {#if showVotes}
        {#each poll.options as option}
          <div class="mb-2">
            <div>{option.name}</div>
            <div class="progress">
              <div class="progress-bar" style="width: {option.percentage}%;">
                {option.percentage}%
              </div>
            </div>
          </div>
        {/each}
        <a href={`/polls/${poll.id}`} class="text-decoration-none text-body">
          {poll.totalVotes} Votes
        </a>
      {:else}
        <form on:submit|preventDefault={submitVote}>
          {#each poll.options as option}
            <div class="d-grid mb-2">
              <button class="btn btn-outline-secondary text-start"
                type="submit" on:click={() => vote = option.id}>
                {option.name}
              </button>
            </div>
          {/each}
        </form>
      {/if}
    </div>
  </div>
</div>