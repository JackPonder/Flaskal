import type { Handle } from "@sveltejs/kit";

import { api } from "$lib/server/api";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = null;
    const user = event.cookies.get("user");
    if (user) {
        const userResponse = await api.get(`/users/${user}`);
        event.locals.user = userResponse.ok && userResponse.body;
    }

    return resolve(event);
};