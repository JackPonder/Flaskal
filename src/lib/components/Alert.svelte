<script lang="ts">
  import { alerts } from "$lib/stores";
  
  const clearAlert = () => alerts.set({message: "", type: ""});
</script>

<style lang="postcss">
  .alert-danger {
    @apply bg-red-100 text-rose-900 border-red-200
  }
  .alert-info {
    @apply bg-blue-100 text-blue-800 border-blue-300
  }
</style>

{#if $alerts.message}
  <div class="alert-{$alerts.type} grid grid-cols-12 p-4 pb-3.5 border">
    <div class="col-start-2 col-span-10 text-center">
      {$alerts.message}
    </div>
    <div class="text-end">
      <button type="button" class="btn-close" on:click={clearAlert}></button>
    </div>
  </div>
{/if}