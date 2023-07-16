import type { HttpMethod } from "@sveltejs/kit";
import { browser } from "$app/environment";

type RequestOptions = {
    method?: HttpMethod;
    path?: string;
    query?: Record<string, string>;
    authorization?: string;
    body?: object;
};

export const api = {
    BASE_URL: "http://127.0.0.1:5000",

    request: async (options: RequestOptions) => {
        const queryParams = options.query ? "?" + new URLSearchParams(options.query).toString() : "";
        let response: Response;

        try {
            response = await fetch(api.BASE_URL + options.path + queryParams, {
                method: options.method,
                headers: {
                    "content-type": "application/json",
                    "authorization": options.authorization || 
                        `Bearer ${browser ? localStorage.getItem("accessToken") || "" : ""}`,
                },
                body: JSON.stringify(options.body)
            });
        } catch (e: any) {
            return {
                ok: false,
                status: 500,
                body: { error: e.message },
            };
        }
    
        const json = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            body: json,
        };
    },
    
    get: async (path: string, options?: RequestOptions) => {
        return api.request({ method: "GET", path, ...options });
    },
    
    post: async (path: string, body?: object, options?: RequestOptions) => {
        return api.request({ method: "POST", path, body, ...options });
    },

    put: async (path: string, body?: object, options?: RequestOptions) => {
        return api.request({ method: "PUT", path, body, ...options });
    },
    
    patch: async (path: string, body?: object, options?: RequestOptions) => {
        return api.request({ method: "PATCH", path, body, ...options });
    },
    
    delete: async (path: string, options?: RequestOptions) => {
        return api.request({ method: "DELETE", path, ...options });
    },
}