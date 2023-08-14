import { fail, type Actions } from "@sveltejs/kit";

import { api } from "$lib/server/api";

export const actions: Actions = {
    register: async ({ request, cookies }) => {
        const data = await request.formData();

        const username = data.get("username") as string;
        const password = data.get("password") as string;
        
        const userResponse = await api.post("/users", { username, password });
        if (!userResponse.ok) {
            return fail(400, { error: "Something went wrong" })
        }

        const tokenResponse = await api.post("/tokens", undefined, {
            authorization: `Basic ${btoa(`${data.get("username")}:${data.get("username")}`)}`,
        });
        if (!tokenResponse.ok) {
            return fail(400, { error: "Something went wrong" });
        }

        cookies.set("accessToken", tokenResponse.body.accessToken);
        cookies.set("user", userResponse.body.username);
    },

    login: async ({ request, cookies }) => {
        const data = await request.formData();

        const username = data.get("username") as string;
        const password = data.get("password") as string;

        const tokenResponse = await api.post("/tokens", undefined, {
            authorization: `Basic ${btoa(`${username}:${password}`)}`
        });
        if (!tokenResponse.ok) {
            return fail(400, { error: "Invalid username or password" });
        }

        const userResponse = await api.get(`/users/${username}`);
        if (!userResponse.ok) {
            return fail(400, { error: "Something went wrong" })
        }

        cookies.set("accessToken", tokenResponse.body.accessToken);
        cookies.set("user", userResponse.body.username);
    },

    logout: async ({ cookies }) => {
        cookies.delete("accessToken");
        cookies.delete("user");
    },
};