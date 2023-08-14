import { type Actions, fail } from "@sveltejs/kit";

import { api } from "$lib/server/api";

export const actions: Actions = {
    create: async ({ request, cookies }) => {
        if (!cookies.get("accessToken")) {
            return fail(400, { error: "You must be logged in to create a poll." });
        }

        const data = await request.formData();
        
        const response = await api.post("/polls", { 
            title: data.get("title"), 
            options: data.getAll("options"), 
            tag: data.get("tag"),
        }, { authorization: `Bearer ${cookies.get("accessToken")}` });
        if (!response.ok) {
            return fail(400, { error: "Something went wrong." });
        }
    }
};