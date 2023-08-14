<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";

  import { enhance } from "$app/forms";
  import { SideContent } from "$lib/components";

  let numOptions = 2;

  const addOption = () => numOptions = Math.min(numOptions + 1, 6);

  const removeOption = () => numOptions = Math.max(numOptions - 1, 2);

  const tagOptions = [
    "Movies", "Gaming", "Books", 
    "Trivia", "Animals", "Religion", "Music",
    "Sports", "Art", "Technology", "Food",
  ];

  let creating = false;

  const formEnhancement: SubmitFunction = async () => {
    creating = true;
    return async ({ update }) => {
      await update();
      creating = false;
    }
  }
</script>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-6 md:col-start-2">
    <form class="card p-6" method="post" action="?/create" use:enhance={formEnhancement}>
      <h2 class="text-xl mb-2">
        Create a Poll
      </h2>
      <div class="mb-4">
        <label for="title" class="block mb-2">Title</label>
        <input type="text" name="title" class="form-input" 
          placeholder="Poll Title" required maxlength=128>
      </div>
      <div class="mb-4">
        <label for="options" class="block mb-2">Options</label>
        <input type="text" name="options" class="form-input" 
          placeholder="Option 1" required maxlength=128>
      </div>
      <div class="mb-4">
        <input type="text" name="options" class="form-input"
          placeholder="Option 2" required maxlength=128>
      </div>
      {#each new Array(numOptions - 2).fill(3).map((n, i) => n + i) as num}
        <div class="flex w-full mb-4">
          <input type="text" name="options" placeholder="Option {num}"
            class="border rounded-l-md py-1.5 px-3 outline-none flex-grow" required maxlength=128>
          <span class="border rounded-r-md px-2 flex items-center bg-gray-100">
            <button type="button" class="btn-close" on:click={removeOption}></button>
          </span>
        </div>        
      {/each}
      <div class="grid md:grid-cols-3 gap-4">
        <button class="btn-white mb-1" type="button" on:click={addOption}>
          Add Option
        </button>
        <select name="tag" class="border rounded-md py-1.5 px-3 mb-1">
          <option value={null}>Add Tag</option>
          {#each tagOptions as tag}
            <option>{tag}</option>
          {/each}
        </select>
        <button class="btn-blue mb-1" type="submit" disabled={creating}>
          Create
        </button>
      </div>
    </form>
  </div>
  <div class="md:col-span-4">
    <SideContent />
  </div>
</div>