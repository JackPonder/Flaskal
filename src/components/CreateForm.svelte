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

  const submitPoll = (event: Event) => {
    event.preventDefault();
  }
</script>

<form class="card my-4" method="post">
  <div class="card-body m-2 mt-3">
    <h5 class="card-title">
      Create a Poll
    </h5>
    <div class="mb-3">
      <label for="pollTitle" class="form-label">Title</label>
      <input type="text" class="form-control" placeholder="Poll Title" id="pollTitle" required>
    </div>
    <div class="mb-3">
      <label for="pollOption1" class="form-label">Options</label>
      <input type="text" class="form-control" placeholder="Option 1" id="pollOption1" required>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Option 2" id="pollOption2" required>
    </div>
    {#each Array(numOptions - 2).fill(2).map((n, i) => n + i + 1) as num}
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Option {num}" required>
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
        <select class="form-select">
          <option value="">Add Tag</option>
          {#each tagOptions as tag}
            <option value={tag}>{tag}</option>
          {/each}
        </select>
      </div>
      <div class="col d-grid">
        <button class="btn btn-primary" type="submit" on:click={submitPoll}>Create</button>
      </div>
    </div>
  </div>
</form>