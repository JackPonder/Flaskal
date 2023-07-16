import type { UserSchema } from "./schemas";
import { writable } from "svelte/store";
import { api } from "./api";

const userStore = () => {
    const { subscribe, set } = writable<UserSchema | null>(null);

    api.get("/users/self").then(res => {
        set(res.ok ? res.body : null);
    });

    return { subscribe, set };
}

const alertsStore = () => {
    const { subscribe, set } = writable({ message: "", type: "" });

    return {
        subscribe,
        set: (message: string, type: string) => set({ message, type }),
        clear: () => set({ message: "", type: "" }),
    };
}

export const user = userStore();

export const alerts = alertsStore();

export const modals = writable(0);