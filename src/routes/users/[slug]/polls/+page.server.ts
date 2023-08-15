import type { PageServerLoad } from './$types';
import type { PollSchema } from '$lib/schemas';

import { api } from '$lib/server/api';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const pollsResponse = await api.get(`/users/${params.slug}/polls`);
    if (!pollsResponse.ok) {
        throw error(pollsResponse.status);
    }

    return { polls: pollsResponse.body as PollSchema[] };
};