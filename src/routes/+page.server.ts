import type { PollSchema } from "$lib/schemas";
import { Api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load() {
    const res = await Api.get("/polls");
    if (!res.ok) {
        throw error(res.status);
    }

    const polls: PollSchema[] = res.body;
    return {polls};
}