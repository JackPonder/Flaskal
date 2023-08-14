import type { PageServerLoad } from "./$types";
import type { PollSchema } from "$lib/schemas";

import { api } from "$lib/api";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
    const response = await api.get("/polls", { 
        query: { 
            sort: url.searchParams.get("sort") ?? "new", 
            tag: url.searchParams.get("tag") ?? "", 
        } 
    });

    if (!response.ok) {
        throw error(response.status);
    }

    return { polls: response.body as PollSchema[] };
}