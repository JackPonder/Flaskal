<script>
  export let linkCreate = false;
</script>

<div class="border rounded-md p-4 my-6 mx-2 md:block hidden sticky" style="top: 75px;">
  <div class="text-xl font-bold mb-2">
    About Flaskal
  </div>
  <div>
    <p>
      Need a question answered right this minute? 
      Create a poll and see what the community thinks. 
      Ask anything from simple questions about your favorite 
      foods to deep philosophical inquiries about the meaning of life.
    </p>
    {#if linkCreate}
      <hr class="my-4">
      <a href="/create" class="btn-blue block">Create a Poll</a>      
    {/if}
  </div>
</div>