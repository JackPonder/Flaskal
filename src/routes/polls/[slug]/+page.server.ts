import type { PollSchema, CommentSchema } from "$lib/schemas";
import { Api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const pollRes = await Api.get(`/polls/${params.slug}`);
    if (!pollRes.ok) {
        throw error(pollRes.status);
    }

    const commentsRes = await Api.get(`/polls/${params.slug}/comments`);
    if (!commentsRes.ok) {
        throw error(commentsRes.status);
    }

    const poll: PollSchema = pollRes.body;
    const comments: CommentSchema[] = commentsRes.body;
    return {poll, comments};
}