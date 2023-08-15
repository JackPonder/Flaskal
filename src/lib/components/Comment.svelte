<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { CommentSchema } from "$lib/schemas";

  import { enhance } from "$app/forms";
  import { formatRelativeDate } from "$lib/utils";
  import { alerts } from "$lib/stores";

  export let comment: CommentSchema;
  export let link: "Poll" | "User" = "User";
  export let deletable = false;

  const formEnhancement: SubmitFunction = async () => {
    return async ({ update, result }) => {
      await update();
      if (result.type === "failure") {
        alerts.set(result.data?.error, "danger");
      } else if (result.type === "success") {
        alerts.set("Successfully deleted comment.", "info");
      }
    }
  }
</script>

<div class="card p-4">
  <h6 class="flex items-baseline mb-1" >
    {#if link === "User"}
      <a class="font-semibold hover:underline" href={`/users/${comment.creator}/polls`}>
        {comment.creator}
      </a>
    {:else if link === "Poll"}
      On&nbsp;
      <a class="font-semibold hover:underline" href={`/polls/${comment.pollId}`}>
        {comment.pollTitle}
      </a>        
    {/if}
    <small>
      &nbsp;- {formatRelativeDate(new Date(comment.timestamp))}
    </small>
  </h6>
  <p class="break-all">{comment.content}</p>
  {#if deletable}
    <div class="flex mt-1">
      <form action="?/delete" method="post" use:enhance={formEnhancement}>
        <button type="submit" name="commentId" value={comment.id}
          class="flex items-center hover:bg-gray-200 duration-200 rounded-md py-1 px-2">
          <img src="/icons/delete.svg" alt="Delete" class="h-4 mr-2" />
          Delete
        </button>
      </form>
    </div>
  {/if}
</div>