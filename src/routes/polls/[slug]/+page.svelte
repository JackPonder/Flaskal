<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { Poll, Comment, SideContent } from '$lib/components';
  import { alerts } from '$lib/stores.js';

  export let data;

  let creating = false;

  const formEnhancement: SubmitFunction = async () => {
    creating = true
    return async ({ update, result }) => {
      await update();
      if (result.type === "failure") {
        alerts.set(result.data?.error, "danger");
      } else if (result.type === "success") {
        alerts.set("Successfully created comment.", "info");
      }
      creating = false;
    }
  }
</script>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-6 md:col-start-2">
    <Poll poll={data.poll} />
    <form action="?/comment" method="post" class="card p-4" use:enhance={formEnhancement}>
      <label for="comment" class="block mb-2">Add a comment</label>
      <div class="w-full flex justify-between">
        <textarea class="form-input !rounded-r-none" name="content" required
          placeholder="Add to the discussion!" rows=2></textarea>
        <button type="submit" disabled={creating}
          class="btn-white !border-l-0 !rounded-l-none">
          Comment
        </button>
      </div>
    </form>
    {#each data.comments as comment}
      <Comment {comment} />
    {/each}
  </div>
  <div class="md:col-span-4">
    <SideContent hasCreateButton />
  </div>
</div>