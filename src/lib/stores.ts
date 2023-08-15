import { writable } from "svelte/store";

const alertsStore = () => {
    const { subscribe, set } = writable({ message: "", type: "" });

    return {
        subscribe,
        set: (message: string, type: "danger" | "info") => set({ message, type }),
        clear: () => set({ message: "", type: "" }),
    };
};

const modalsStore = () => {
    const { subscribe, set } = writable(0);

    return {
        subscribe,
        showLogin: () => set(1),
        showRegister: () => set(2),
        clear: () => set(0),
    };
};

export const alerts = alertsStore();

export const modals = modalsStore();