<script lang="ts">
  import { api } from "$lib/api";
  import { user, alerts } from "$lib/stores";

  let numOptions = 2;

  const addOption = () => numOptions = Math.min(numOptions + 1, 6);

  const removeOption = () => numOptions = Math.max(numOptions - 1, 2);

  const tagOptions = [
    "Movies", "Gaming", "Books", 
    "Trivia", "Animals", "Religion", "Music",
    "Sports", "Art", "Technology", "Food",
  ];

  let formRef: HTMLFormElement;
  let title: string, tag: string | null;
  let options: string[] = [];
  
  const submitPoll = async () => {
    if ($user === null) {
      alerts.set("You must be logged in to create a poll.", "danger");
      return;
    }

    const response = await api.post("/polls", { title, tag, options });
    if (!response.ok) {
      alerts.set("Something went wrong.", "danger");
      return;
    }
  
    alerts.set("Successfully created poll.", "info");
    formRef.reset();
  }
</script>

<form class="card p-6" on:submit|preventDefault={submitPoll} bind:this={formRef}>
  <h2 class="text-xl mb-2">
    Create a Poll
  </h2>
  <div class="mb-4">
    <label for="title" class="block mb-2">Title</label>
    <input type="text" class="form-input" placeholder="Poll Title" bind:value={title} required maxlength="128">
  </div>
  <div class="mb-4">
    <label for="options" class="block mb-2">Options</label>
    <input type="text" class="form-input" placeholder="Option 1" bind:value={options[0]} required maxlength="128">
  </div>
  <div class="mb-4">
    <input type="text" class="form-input" placeholder="Option 2" bind:value={options[1]} required maxlength="128">
  </div>
  {#each new Array(numOptions - 2).fill(2).map((n, i) => n + i) as num}
    <div class="flex w-full mb-4">
      <input type="text" class="border rounded-l-md py-1.5 px-3 flex-grow" 
        placeholder="Option {num + 1}" bind:value={options[num]} required maxlength="128">
      <span class="border rounded-r-md px-2 flex items-center bg-gray-100">
        <button type="button" class="btn-close" on:click={removeOption}></button>
      </span>
    </div>        
  {/each}
  <div class="grid md:grid-cols-3 gap-4">
    <button class="btn-white mb-1" type="button" on:click={addOption}>
      Add Option
    </button>
    <select class="border rounded-md py-1.5 px-3 mb-1" bind:value={tag}>
      <option value={null}>Add Tag</option>
      {#each tagOptions as tag}
        <option value={tag}>{tag}</option>
      {/each}
    </select>
    <button class="btn-blue mb-1" type="submit">
      Create
    </button>
  </div>
</form>