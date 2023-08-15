<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  export let data;

  enum DisplayOptions { 
    Polls = "Polls", 
    Comments = "Comments",
  };
</script>

<style lang="postcss">
  .active {
    @apply text-white bg-blue-500
  }
</style>

<div class="grid md:grid-cols-12 mx-auto max-w-lg md:max-w-6xl">
  <div class="md:col-span-4 md:col-start-2 -mb-4">
    <div class="card p-4 sticky top-[70px] flex flex-col items-center">
      <img src="/icons/user.svg" alt="" class="h-40 my-6">
      <h2 class="text-2xl font-semibold">{data.user.username}</h2>
      <h4 class="text-lgxl mb-3">Joined {new Date(data.user.dateJoined).toDateString()}</h4>
      {#if data.currentUser?.username === data.user.username}
        <form action="/auth?/logout" method="post" use:enhance>
          <button type="submit" class="btn-blue w-full">Logout</button> 
        </form>     
      {/if}
    </div>
  </div>
  <div class="md:col-span-6">
    <div class="card p-4 grid grid-cols-2">
      {#each Object.values(DisplayOptions) as option}
        <a href={`/users/${$page.params.slug}/${option.toLowerCase()}`} 
          class="text-center rounded-md py-1.5 duration-200"
          class:active={$page.url.pathname.split("/").at(-1) == option.toLowerCase()}>
          {option}
        </a>
      {/each}
    </div>
    <slot />
  </div>
</div>