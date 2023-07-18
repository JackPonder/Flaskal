<script lang="ts">
  import type { CommentSchema } from "$lib/schemas";
  import { formatRelativeDate } from "$lib/utils";
  import { api } from "$lib/api";
  import { alerts } from "$lib/stores";

  export let comment: CommentSchema;
  export let link: "Poll" | "User" = "User";
  export let deletable = false;

  let ref: HTMLElement;

  const deleteComment = async () => {
    const res = await api.delete(`/comments/${comment.id}`);
    if (!res.ok) {
      alerts.set("Something went wrong", "danger");
      return;
    }

    alerts.set("Successfully deleted comment", "info");
    ref.remove();
  }
</script>

<div class="card p-4" bind:this={ref}>
  <h6 class="flex items-baseline mb-1" >
    {#if link === "User"}
      <a class="font-semibold hover:underline" href={`/users/${comment.creator}`}>
        {comment.creator}
      </a>
    {:else if link === "Poll"}
      On&nbsp;
      <a class="font-semibold hover:underline" href={`/polls/${comment.poll.id}`}>
        {comment.poll.title}
      </a>        
    {/if}
    <small>
      &nbsp;- {formatRelativeDate(new Date(comment.timestamp))}
    </small>
  </h6>
  <p>{comment.content}</p>
  {#if deletable}
    <div class="flex mt-1">
      <button on:click={deleteComment} class="flex items-center hover:bg-gray-200 duration-200 rounded-md py-1 px-2">
        <img src="/icons/delete.svg" alt="" class="h-4 mr-2" />
        Delete
      </button>
    </div>
  {/if}
</div>