<script>
  export let linkCreate = false;
</script>

<div class="card my-4 d-md-block d-none sticky-top" style="top: 75px">
  <div class="card-header">
    About Flaskal
  </div>
  <div class="card-body">
    <div class="card-text">
      Need a question answered right this minute? 
      Create a poll and see what the community thinks. 
      Ask anything from simple questions about your favorite 
      foods to deep philosophical inquiries about the meaning of life.
    </div>
    {#if linkCreate}
      <hr>
      <div class="d-grid">
        <a href="/create" class="btn btn-primary">Create a Poll</a>      
      </div>      
    {/if}
  </div>
</div>