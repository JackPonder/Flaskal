<script lang="ts">
  let username: string, password: string;
  const login = async (event: SubmitEvent) => {}
</script>

<form class="modal" id="loginModal" tabindex="-1" on:submit|preventDefault={login}>
  <div class="modal-dialog modal-dialog-centered" style="max-width: 425px;">
    <div class="modal-content" style="border-radius: 0.5rem;">
      <div class="modal-body mx-3 m-2">
        <h1 class="text-center mb-4 py-2">Log In</h1>
        <div class="mb-3">
          <input bind:value={username} type="text" class="form-control" required placeholder="Enter Username">
        </div>
        <div class="mb-3">
          <input bind:value={password} type="password" class="form-control" required placeholder="Enter Password">
        </div>
        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-outline-secondary btn-lg">Log In</button>
        </div>
        <p class="text-center">Forgot Password?</p>
        <hr>
        <div class="d-grid mb-3">
          <button type="button" class="btn btn-primary btn-lg" data-bs-dismiss="modal"
            data-bs-toggle="modal" data-bs-target="#registerModal">
            Create a New Account
          </button>
        </div>
      </div>
    </div>
  </div>
</form>