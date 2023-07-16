import type { PollSchema } from "$lib/schemas";
import { api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load({ url }) {
    const sort = url.searchParams.get("sort") || "new";
    const tag = url.searchParams.get("tag") || "";
    
    const res = await api.get("/polls", { query: { sort, tag } });
    if (!res.ok) {
        throw error(res.status);
    }

    const polls: PollSchema[] = res.body;
    return { polls };
}