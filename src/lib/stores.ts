import type { UserSchema } from "./schemas";
import { writable } from "svelte/store";
import { api } from "./api";

const userStore = async () => {
    const { subscribe, set } = writable<UserSchema | null>(null);

    const res = await api.get("/users/self");
    if (res.ok) {
        set(res.body);
    }    

    return { subscribe, set };
}

const alertsStore = () => {
    const { subscribe, set } = writable({message: "", type: ""});

    return {
        subscribe,
        set: (message: string, type: string) => set({message, type}),
        clear: () => set({message: "", type: ""}),
    }
}

export const user = await userStore();

export const alerts = alertsStore();

export const modals = writable(0);