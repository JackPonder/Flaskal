<script lang="ts">
  import type { Action } from "svelte/action";
  import "../app.css";

  import { Navbar, Alert, LoginForm, RegisterForm } from "$lib/components";
  import { modals } from "$lib/stores";

  const bodyClass: Action<HTMLBodyElement, {
    className: string;
    toggle: boolean;
  }> = (node, { className, toggle }) => {
    node.classList.toggle(className, toggle);

    return {
      update: ({ className, toggle }) => {
        node.classList.toggle(className, toggle);
      }
    };
  };
</script>

<svelte:body use:bodyClass={{ 
  className: "overflow-hidden", 
  toggle: $modals !== 0,
}} />

<Navbar />
<Alert />
<slot />
<LoginForm />
<RegisterForm  />