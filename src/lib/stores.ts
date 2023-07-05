import { writable } from "svelte/store";
import type { UserSchema } from "./schemas";

export const user = writable(null as UserSchema | null);
export const alerts = writable({
    message: "", 
    type: ""
});