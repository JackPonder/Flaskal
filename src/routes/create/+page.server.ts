import { type Actions, fail } from "@sveltejs/kit";

import { api } from "$lib/api";

export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        
        const response = await api.post("/polls", { 
            title: data.get("title"), 
            options: data.getAll("options"), 
            tag: data.get("tag"),
        });

        if (!response.ok) {
            return fail(400, { error: "Something went wrong." });
        }
    }
};