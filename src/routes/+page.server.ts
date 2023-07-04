import { error } from "@sveltejs/kit";
import type { PollSchema } from "../schemas";

export async function load() {
    const res = await fetch('http://127.0.0.1:5000/polls');
    if (!res.ok) {
        throw error(res.status);
    }

    const polls: PollSchema[] = await res.json();
    return {polls};
}