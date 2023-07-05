<script lang="ts">
  let username: string, password: string;
  const register = async (event: SubmitEvent) => {}
</script>

<form class="modal" id="registerModal" tabindex="-1" on:submit|preventDefault={register}>
  <div class="modal-dialog modal-dialog-centered" style="max-width: 425px;">
    <div class="modal-content" style="border-radius: 0.5rem;">
      <div class="modal-body mx-3 m-2">
        <h1 class="text-center mb-4 py-2">Register</h1>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input id="username" bind:value={username} type="text" minlength=4 maxlength=20
            class="form-control" required placeholder="Enter Username">
          <span class="form-text">Must be 4-20 characters</span>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input id="password" bind:value={password} type="password" minlength=4 maxlength=20
            class="form-control" required placeholder="Enter Password">
          <span class="form-text">Must be 4-20 characters</span>
        </div>
        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-outline-secondary btn-lg">Register</button>
        </div>
      </div>
    </div>
  </div>
</form>