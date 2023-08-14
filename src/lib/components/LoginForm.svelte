<script lang="ts">
  import { enhance } from "$app/forms";
  import { modals } from "$lib/stores";
</script>

<div id="loginModal" tabindex="-1" role="dialog"
  class="fixed top-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto {$modals === 1 ? "flex" : "hidden"}">
  <div class="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
    <form action="/auth?/login" method="post" use:enhance
      class="relative bg-white rounded-lg p-8 flex-grow mx-4 max-w-[425px]">
      <div class="grid grid-cols-8 pt-2 pb-8">
        <h1 class="col-span-6 col-start-2 text-4xl text-center font-semibold">
          Log In
        </h1>
        <div class="flex items-center justify-center mt-1">
          <button type="button" class="btn-close" on:click={() => modals.set(0)}></button>          
        </div>
      </div>
      <div class="mb-4">
        <input type="text" name="username" placeholder="Enter Username" class="form-input">
      </div>
      <div class="mb-4">
        <input type="password" name="password" placeholder="Enter Password" class="form-input">
      </div>
      <button type="submit" class="btn-white-lg w-full py-2">
        Log In
      </button>
      <p class="text-center my-4">Forgot Password?</p>
      <hr class="mb-4">
      <button type="button" class="btn-blue-lg w-full mb-2" on:click={() => modals.set(2)}>
        Create A New Account
      </button>
    </form>
  </div>
</div>
