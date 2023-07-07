import type { UserSchema } from "./schemas";
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { api } from "./api";

const userStore = async () => {
    const { subscribe, set } = writable<UserSchema | null>(null);

    if (browser) {
        const res = await api.get("/users/self");
        if (res.ok) {
            set(res.body);
        }    
    }

    return { subscribe, set };
}

export const user = await userStore();

export const alerts = writable({message: "", type: ""});

export const modals = writable(0);