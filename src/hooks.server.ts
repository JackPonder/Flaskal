import type { Handle } from "@sveltejs/kit";

import { api } from "$lib/server/api";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("accessToken");
    if (token) {
        const userResponse = await api.get("/users/self", {
            authorization: `Bearer ${token}`
        });
        event.locals.user = userResponse.ok ? userResponse.body : null;
    } else {
        event.locals.user = null;
    }

    return resolve(event);
};