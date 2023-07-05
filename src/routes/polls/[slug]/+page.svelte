<script lang="ts">
  import { Poll, Comment, SideContent } from '$lib/components';
  export let data;
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-1">
      <Poll poll={data.poll} />
      <form class="card my-4">
        <div class="card-body">
          <label for="comment" class="form-label">Add a comment</label>
          <div class="input-group mb-2">
            <textarea id="comment" class="form-control" placeholder="Add to the discussion!"></textarea>
            <button class="btn btn-outline-secondary">
              Comment
            </button>
          </div>
        </div>
      </form>
      {#each data.comments as comment}
        <Comment {comment} />
      {/each}
    </div>
    <div class="col-md-4">
      <SideContent linkCreate />
    </div>
  </div>
</div>