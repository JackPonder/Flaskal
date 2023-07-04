import type { PollSchema, CommentSchema } from "../../../schemas";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const pollRes = await fetch(`http://127.0.0.1:5000/polls/${params.slug}`);
    if (!pollRes.ok) {
        throw error(pollRes.status);
    }

    const commentsRes = await fetch(`http://127.0.0.1:5000/polls/${params.slug}/comments`);
    if (!commentsRes.ok) {
        throw error(commentsRes.status);
    }

    const poll: PollSchema = await pollRes.json();
    const comments: CommentSchema[] = await commentsRes.json();
    return {poll, comments};
}