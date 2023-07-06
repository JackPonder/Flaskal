<script lang="ts">
  import { Poll, Comment, SideContent } from '$lib/components';
  export let data;
</script>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-6 md:col-start-2">
    <Poll poll={data.poll} />
    <form class="border rounded-md my-4 mx-2 p-5">
      <label for="comment" class="block mb-2">Add a comment</label>
      <div class="w-full flex justify-between">
        <textarea class="border rounded-l-md py-1.5 px-3 flex-grow" id="comment" 
          placeholder="Add to the discussion!" rows=2></textarea>
        <button class="text-center text-gray-500 border border-gray-500 px-3 
          hover:text-white hover:bg-gray-500 duration-200 rounded-r-md">
          Comment
        </button>
      </div>
    </form>
    {#each data.comments as comment}
      <Comment {comment} />
    {/each}
  </div>
  <div class="md:col-span-4">
    <SideContent linkCreate />
  </div>
</div>