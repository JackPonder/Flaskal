<script lang="ts">
  let numOptions = 2;

  const addOption = () => {
    numOptions = Math.min(numOptions + 1, 6);
  }

  const removeOption = () => {
    numOptions = Math.max(numOptions - 1, 2);
  }

  const tagOptions = [
    "Movies", "Gaming", "Books", 
    "Trivia", "Animals", "Religion", "Music",
    "Sports", "Art", "Technology", "Food",
  ];

  let title: string, tag: string;
  let options: string[] = [];
  
  const submitPoll = (event: Event) => {}
</script>

<form class="card my-4" on:submit|preventDefault={submitPoll}>
  <div class="card-body m-2 mt-3">
    <h5 class="card-title">
      Create a Poll
    </h5>
    <div class="mb-3">
      <label for="pollTitle" class="form-label">Title</label>
      <input type="text" class="form-control" placeholder="Poll Title" bind:value={title} required>
    </div>
    <div class="mb-3">
      <label for="pollOption1" class="form-label">Options</label>
      <input type="text" class="form-control" placeholder="Option 1" bind:value={options[0]} required>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Option 2" bind:value={options[1]} required>
    </div>
    {#each new Array(numOptions - 2).fill(2).map((n, i) => n + i) as num}
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Option {num + 1}" bind:value={options[num]} required>
        <span class="input-group-text">
          <button type="button" class="btn-close" on:click={removeOption}></button>
        </span>
      </div>        
    {/each}
    <div class="row mb-2">
      <div class="col d-grid">
        <button class="btn btn-outline-secondary" type="button" on:click={addOption}>
          Add Option
        </button>
      </div>
      <div class="col d-grid">
        <select class="form-select" bind:value={tag}>
          <option value="">Add Tag</option>
          {#each tagOptions as tag}
            <option value={tag}>{tag}</option>
          {/each}
        </select>
      </div>
      <div class="col d-grid">
        <button class="btn btn-primary" type="submit">Create</button>
      </div>
    </div>
  </div>
</form>