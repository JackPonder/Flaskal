<script lang="ts">
  import type { CommentSchema } from "../schemas";
  export let comment: CommentSchema;
</script>

<div class="card my-4">
  <div class="card-body">
    <div class="card-title">
      {comment.creator}
    </div>
    <div class="card-text">
      {comment.content}
    </div>
  </div>
</div>