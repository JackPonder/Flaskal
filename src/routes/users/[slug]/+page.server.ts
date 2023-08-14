import type { PageServerLoad } from "./$types";
import type { UserSchema, PollSchema, CommentSchema } from "$lib/schemas";

import { api } from "$lib/server/api";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
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

    return { 
        user: userRes.body as UserSchema, 
        polls: pollsRes.body as PollSchema[], 
        comments: commentsRes.body as CommentSchema[], 
    };
}