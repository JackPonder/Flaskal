import type { PollSchema } from "$lib/schemas";
import { api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load() {
    const res = await api.get("/polls");
    if (!res.ok) {
        throw error(res.status);
    }

    const polls: PollSchema[] = res.body;
    return {polls};
}