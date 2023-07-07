<script>
  import { Navbar, Alert, LoginForm, RegisterForm } from "$lib/components";
  import "../app.css";
</script>

<Navbar />
<Alert />
<slot />
<LoginForm />
<RegisterForm  />