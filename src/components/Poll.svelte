<script lang="ts">
  import type { PollSchema } from "../schemas";
  export let poll: PollSchema;
  export let showVotes = true;

  const submitVote = (event: Event, voteId: number) => {
    event.preventDefault();
  }
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
        <div>
          {poll.totalVotes} Votes
        </div>
      {:else}
        <form>
          {#each poll.options as option}
            <div class="d-grid mb-2">
              <button class="btn btn-outline-secondary text-start" 
                type="submit" on:click={event => submitVote(event, option.id)}>
                {option.name}
              </button>
            </div>
          {/each}
        </form>
      {/if}
    </div>
  </div>
</div>