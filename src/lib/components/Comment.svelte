<script lang="ts">
  import type { CommentSchema } from "$lib/schemas";
  import { formatRelativeDate } from "$lib/utils";

  export let comment: CommentSchema;
  export let link: "Poll" | "User" = "User";
  export let deletable = false;
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
      <button class="flex items-center hover:bg-gray-200 duration-200 rounded-md py-1 px-2">
        <img src="/icons/delete.svg" alt="" class="h-4 mr-2" />
        Delete
      </button>
    </div>
  {/if}
</div>