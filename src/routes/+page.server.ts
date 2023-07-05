import type { PollSchema } from "../schemas";
import { error } from "@sveltejs/kit";

export async function load() {
    const res = await fetch('http://127.0.0.1:5000/polls');
    if (!res.ok) {
        throw error(res.status);
    }

    const polls: PollSchema[] = await res.json();
    return {polls};
}