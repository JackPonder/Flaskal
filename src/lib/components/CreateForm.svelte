<script lang="ts">
  import { Api } from "$lib/api";
  import { user, alerts } from "$lib/stores";

  let numOptions = 2;

  const addOption = () => numOptions = Math.min(numOptions + 1, 6);

  const removeOption = () => numOptions = Math.max(numOptions - 1, 2);

  const tagOptions = [
    "Movies", "Gaming", "Books", 
    "Trivia", "Animals", "Religion", "Music",
    "Sports", "Art", "Technology", "Food",
  ];

  let title: string, tag: string;
  let options: string[] = [];
  
  const submitPoll = async (event: SubmitEvent) => {
    if ($user === null) {
      alerts.set({message: "You must be logged in to create a poll.", type: "danger"});
      return;
    }

    const response = await Api.post("/polls", {title, tag, options});
    if (response.ok) {
      alerts.set({message: "Successfully created poll.", type: "info"});
      const form = event.target as HTMLFormElement;
      form.reset();
    } else {
      alerts.set({message: "Something went wrong.", type: "danger"});
    }
  }
</script>

<form class="border rounded-md my-6 mx-2 p-6" on:submit|preventDefault={submitPoll}>
  <h2 class="text-xl mb-2">
    Create a Poll
  </h2>
  <div class="mb-4">
    <label for="title" class="block mb-2">Title</label>
    <input type="text" class="form-input" placeholder="Poll Title" bind:value={title} required>
  </div>
  <div class="mb-4">
    <label for="options" class="block mb-2">Options</label>
    <input type="text" class="form-input" placeholder="Option 1" bind:value={options[0]} required>
  </div>
  <div class="mb-4">
    <input type="text" class="form-input" placeholder="Option 2" bind:value={options[1]} required>
  </div>
  {#each new Array(numOptions - 2).fill(2).map((n, i) => n + i) as num}
    <div class="flex w-full mb-4">
      <input type="text" class="border rounded-l-md py-1.5 px-3 flex-grow" 
        placeholder="Option {num + 1}" bind:value={options[num]} required>
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
      <option value="">Add Tag</option>
      {#each tagOptions as tag}
        <option value={tag}>{tag}</option>
      {/each}
    </select>
    <button class="btn-blue mb-1" type="submit">
      Create
    </button>
  </div>
</form>