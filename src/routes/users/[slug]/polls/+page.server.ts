import type { PageServerLoad } from './$types';
import { type Actions, fail } from '@sveltejs/kit';
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

export const actions: Actions = {
    delete: async ({ request, cookies }) => {
        if (!cookies.get("accessToken")) {
            return fail(400, { error: "You are not authorized to delete this poll." });
        }

        const data = await request.formData();
        const pollId = data.get("pollId");
        
        const deleteResponse = await api.delete(`/polls/${pollId}`, {
            authorization: `Bearer ${cookies.get("accessToken")}`
        });
        if (!deleteResponse.ok) {
            return fail(400, { error: "Something went wrong." });
        }
    }
};