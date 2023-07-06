<script lang="ts">
  import type { CommentSchema } from "$lib/schemas";
  export let comment: CommentSchema;
</script>

<div class="border my-4 mx-2 rounded-md p-4">
  <h6 class="font-semibold mb-1">
    {comment.creator} - {new Date(comment.timestamp).toDateString()}
  </h6>
  <p>{comment.content}</p>
</div>