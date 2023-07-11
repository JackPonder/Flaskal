<script lang="ts">
  import { Poll, CommentForm, Comment, SideContent } from '$lib/components';
  export let data;
</script>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-6 md:col-start-2">
    <Poll poll={data.poll} />
    <CommentForm poll={data.poll} bind:comments={data.comments} />
    {#each data.comments as comment}
      <Comment {comment} />
    {/each}
  </div>
  <div class="md:col-span-4">
    <SideContent hasCreateButton />
  </div>
</div>