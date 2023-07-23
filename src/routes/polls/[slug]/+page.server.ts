import type { PollSchema, CommentSchema } from "$lib/schemas";
import { api } from "$lib/api";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const pollRes = await api.get(`/polls/${params.slug}`);
    if (!pollRes.ok) {
        throw error(pollRes.status);
    }

    const commentsRes = await api.get(`/polls/${params.slug}/comments`);
    if (!commentsRes.ok) {
        throw error(commentsRes.status);
    }
    
    return { 
        poll: pollRes.body as PollSchema, 
        comments: commentsRes.body as CommentSchema[],
    };
}