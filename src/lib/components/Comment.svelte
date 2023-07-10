<script lang="ts">
  import type { CommentSchema } from "$lib/schemas";
  import { formatRelativeDate } from "$lib/utils";
  export let comment: CommentSchema;
  export let link: "Poll" | "User" = "User";
</script>

<div class="card p-4">
  <h6 class="flex items-baseline mb-1" >
    {#if link === "User"}
      <a class="font-semibold hover:underline" href={`/users/${comment.creator}`}>
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
  <p>{comment.content}</p>
</div>