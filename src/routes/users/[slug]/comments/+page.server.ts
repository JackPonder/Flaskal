import type { PageServerLoad } from './$types';
import { type Actions, fail } from '@sveltejs/kit';
import type { CommentSchema } from '$lib/schemas';

import { api } from '$lib/server/api';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const commentsResponse = await api.get(`/users/${params.slug}/comments`);
    if (!commentsResponse.ok) {
        throw error(commentsResponse.status);
    }

    return { comments: commentsResponse.body as CommentSchema[] };
};

export const actions: Actions = {
    delete: async ({ request, cookies }) => {
        if (!cookies.get("accessToken")) {
            return fail(400, { error: "You are not authorized to delete this comment." });
        }

        const data = await request.formData();
        const commentId = data.get("commentId");
        
        const deleteResponse = await api.delete(`/comments/${commentId}`, {
            authorization: `Bearer ${cookies.get("accessToken")}`
        });
        if (!deleteResponse.ok) {
            return fail(400, { error: "Something went wrong." });
        }
    }
};