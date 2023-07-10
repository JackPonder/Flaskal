import type { UserSchema, PollSchema, CommentSchema } from "$lib/schemas";
import { api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const userRes = await api.get(`/users/${params.slug}`);
    if (!userRes.ok) {
        throw error(userRes.status);
    }

    const pollsRes = await api.get(`/users/${params.slug}/polls`);
    if (!pollsRes.ok) {
        throw error(pollsRes.status);
    }

    const commentsRes = await api.get(`/users/${params.slug}/comments`);
    if (!commentsRes.ok) {
        throw error(commentsRes.status);
    }

    const user: UserSchema = userRes.body;
    const polls: PollSchema[] = pollsRes.body;
    const comments: CommentSchema[] = commentsRes.body;

    return { user, polls, comments };
}