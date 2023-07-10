<script lang="ts">
  import { api } from "$lib/api";
  import { user, alerts } from "$lib/stores";
  import type { PollSchema, CommentSchema } from "$lib/schemas";

  export let data: {poll: PollSchema, comments: CommentSchema[]};

  let content: string;

  const submitComment = async (event: SubmitEvent) => {
    if ($user === null) {
      alerts.set("You must be logged in to comment.", "danger");
      return;
    }

    const response = await api.post(`/polls/${data.poll.id}/comments`, {content});
    if (!response.ok) {
      alerts.set("Something went wrong.", "danger");
      return;
    }

    data.comments = [...data.comments, response.body];
    const form = <HTMLFormElement> event.target;
    form.reset();
  }
</script>

<form class="card p-4" on:submit|preventDefault={submitComment}>
  <label for="comment" class="block mb-2">Add a comment</label>
  <div class="w-full flex justify-between">
    <textarea class="border rounded-l-md py-1.5 px-2 flex-grow" id="comment" 
      placeholder="Add to the discussion!" rows=2 bind:value={content}></textarea>
    <button type="submit" class="text-center text-gray-500 border border-gray-500 px-3 
      hover:text-white hover:bg-gray-500 duration-200 rounded-r-md">
      Comment
    </button>
  </div>
</form>