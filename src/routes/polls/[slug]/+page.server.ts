import type { PageServerLoad } from "./$types";
import type { Actions } from "@sveltejs/kit";
import type { PollSchema, CommentSchema } from "$lib/schemas";

import { api } from "$lib/server/api";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
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
};

export const actions: Actions = {
    comment: async ({ request, cookies, params }) => {
        if (!cookies.get("accessToken")) {
            return fail(400, {  error: "You must be logged in to comment." });
        }

        const data = await request.formData();

        const commentResponse = await api.post(`/polls/${params.slug}/comments`, {
            content: data.get("content"),
        }, { authorization: `Bearer ${cookies.get("accessToken")}` });
        if (!commentResponse.ok) {
            return fail(400, { error: "Something went wrong." });
        }
    }
};