import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { UserSchema } from "./schemas";

export const user: Writable<UserSchema | null> = writable(null);

export const alerts = writable({message: "", type: ""});

export const modals = writable(0);