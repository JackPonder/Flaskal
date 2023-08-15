import type { PageServerLoad } from './$types';
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