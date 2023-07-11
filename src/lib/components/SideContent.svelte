<script>
  export let hasCreateButton = false;
</script>

<div class="card md:block hidden sticky top-[70px]">
  <div class="bg-gray-50 border-b rounded-t-md px-4 py-2">
    About Flaskal
  </div>
  <div class="p-4 pt-3">
    <p>
      Need a question answered right this minute? 
      Create a poll and see what the community thinks. 
      Ask anything from simple questions about your favorite 
      foods to deep philosophical inquiries about the meaning of life.
    </p>
    {#if hasCreateButton}
      <hr class="my-4">
      <a href="/create" class="btn-blue block">Create a Poll</a>      
    {/if}
  </div>
</div>