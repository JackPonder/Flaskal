import type { LayoutServerLoad } from './$types';
import type { UserSchema } from '$lib/schemas';

import { api } from '$lib/server/api';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params }) => {
    const userResponse = await api.get(`/users/${params.slug}`);
    if (!userResponse.ok) {
        throw error(userResponse.status);
    }

    return { user: userResponse.body as UserSchema };
};