import { writable } from "svelte/store";

const alertsStore = () => {
    const { subscribe, set } = writable({ message: "", type: "" });

    return {
        subscribe,
        set: (message: string, type: string) => set({ message, type }),
        clear: () => set({ message: "", type: "" }),
    };
}

export const alerts = alertsStore();

export const modals = writable(0);