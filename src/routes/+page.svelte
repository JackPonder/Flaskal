<script lang="ts">
  import { Poll, SideContent } from "../components";
  export let data;
</script>

<style>
  .jumbotron {
    background-color: #eee; 
    padding-top: 6rem;
    padding-bottom: 5.25rem;
    text-align: center;
  }
</style>

<div class="jumbotron">
  <h1>Welcome to Flaskal!</h1>
  <h6>Create polls for the community to answer</h6>
</div>
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-1">
      <div class="card d-grid my-4 p-3">
        <a href="/create" class="btn btn-outline-secondary">Create a Poll</a>
      </div>
      {#each data.polls as poll}
        <Poll {poll} />
      {/each}
    </div>
    <div class="col-md-4">
      <SideContent linkCreate />
    </div>
  </div>
</div>
