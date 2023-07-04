import type { PollSchema } from "../schemas";

export async function load() {
    const res = await fetch('http://127.0.0.1:5000/polls', { method: 'GET' })
    const polls: PollSchema[] = await res.json()
    return {polls};
}