<script lang="ts">
  import { alerts } from "$lib/stores";
</script>

{#if $alerts.message}
  <div class="container-fluid">
    <div class="row alert alert-{$alerts.type} mb-0 rounded-0" role="alert">
      <div class="col-10 offset-1 text-center">{$alerts.message}</div>
      <div class="col-1 text-end">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>    
  </div>
{/if}