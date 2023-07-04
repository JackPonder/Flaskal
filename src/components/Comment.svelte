<script lang="ts">
  import type { CommentSchema } from "../schemas";
  export let comment: CommentSchema;
</script>

<div class="card my-4">
  <div class="card-body">
    <h6 class="card-title">
      {comment.creator} - {new Date(comment.timestamp).toDateString()}
    </h6>
    <div class="card-text">
      {comment.content}
    </div>
  </div>
</div>