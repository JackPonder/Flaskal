import type { PollSchema } from "$lib/schemas";
import { api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load({ url }) {
    const sort = url.searchParams.get("sort") || "new";
    
    const res = await api.get(`/polls?sort=${sort}`);
    if (!res.ok) {
        throw error(res.status);
    }

    const polls: PollSchema[] = res.body;
    return {polls};
}