<script lang="ts">
  import { api } from "$lib/api";
  import { user, modals, alerts } from "$lib/stores";

  let username: string, password: string;

  const register = async (event: SubmitEvent) => {
    const response = await api.post("/users", {username, password});

    if (!response.ok) {
      return;
    }

    const login = await api.post("/tokens", undefined, {
      authorization: `Basic ${btoa(`${username}:${password}`)}`
    });

    if (!login.ok) {
      return;
    }

    localStorage.setItem("accessToken", login.body.token);
    user.set((await api.get("/users/self")).body);
    alerts.set(`Logged in as ${username}`, "info");
    modals.set(0);
    
    const form = <HTMLFormElement> event.target;
    form.reset();
  }
</script>

<div id="registerModal" tabindex="-1" role="dialog"
  class="fixed top-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto {$modals === 2 ? "flex" : "hidden"}">
  <div class="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
    <form class="relative bg-white rounded-lg mx-4 p-8 flex-grow" 
      style="max-width: 425px;"  on:submit|preventDefault={register}>
      <div class="grid grid-cols-8 pt-2 pb-4">
        <h1 class="col-span-6 col-start-2 text-4xl text-center font-semibold">
          Register
        </h1>
        <div class="flex items-center justify-center mt-1">
          <button type="button" class="btn-close" on:click={() => modals.set(0)}></button>          
        </div>
      </div>
      <div class="mb-4">
        <label for="username" class="block mb-2">Username</label>
        <input type="text" placeholder="Enter Username" class="form-input" 
          minlength=4 maxlength=20 bind:value={username}>
        <small class="text-gray-500">Must be 4-20 characters</small>
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input type="password" placeholder="Enter Password" class="form-input" 
          minlength=4 maxlength=20 bind:value={password}>
        <small class="text-gray-500">Must be 4-20 characters</small>
      </div>
      <button type="submit" class="btn-white-lg w-full mb-2">
        Register
      </button>
    </form>
  </div>
</div>