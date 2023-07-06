<script lang="ts">
  export let show = false;
  let username: string, password: string;
  const register = async (event: SubmitEvent) => {}
</script>

<div id="registerModal" tabindex="-1" role="dialog"
  class="fixed top-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto {show ? "flex" : "hidden"}">
  <div class="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
    <form class="relative bg-white rounded-lg max-w-sm mx-auto p-6 flex-grow" on:submit|preventDefault={register}>
      <div class="grid grid-cols-8 pt-2 pb-8">
        <h1 class="col-span-6 col-start-2 text-4xl text-center font-semibold">
          Register
        </h1>
        <div class="flex items-center justify-center mt-1">
          <button type="button" class="btn-close" on:click={() => show = false}></button>          
        </div>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" placeholder="Enter Username" class="form-input" 
          minlength=4 maxlength=20 bind:value={username}>
        <small>Must be 4-20 characters</small>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" placeholder="Enter Password" class="form-input" 
          minlength=4 maxlength=20 bind:value={password}>
        <small>Must be 4-20 characters</small>
      </div>
      <button type="submit" class="btn-white w-full">
        Register
      </button>
    </form>
  </div>
</div>