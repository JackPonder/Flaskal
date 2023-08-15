<script lang="ts">
  import { Comment } from '$lib/components';

  export let data;
</script>

{#each data.comments as comment}
  <Comment {comment} />
{:else}
  <div class="card p-4 text-center">
    Looks like {data.user.username} hasn't made any comments
  </div>
{/each}