import { browser } from "$app/environment";

interface RequestOptions {
    url?: string;
    method?: string;
    authorization?: string;
    body?: object;
}

export const api = {
    BASE_URL: "http://127.0.0.1:5000",

    request: async (options: RequestOptions) => {
        let response: Response;
        try {
            response = await fetch(api.BASE_URL + options.url, {
                method: options.method,
                headers: {
                    "content-type": "application/json",
                    "authorization": options.authorization || 
                        `Bearer ${browser ? localStorage.getItem("accessToken") || "" : ""}`,
                },
                body: JSON.stringify(options.body)
            });
        } catch (e: any) {
            const error = e.message;
            return {
                ok: false,
                status: 500,
                body: {error}
            }   
        }
    
        const json = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            body: json,
        }
    },
    
    get: async (url: string, options?: RequestOptions) => {
        return api.request({url, method: "GET", ...options});
    },
    
    post: async (url: string, body?: object, options?: RequestOptions) => {
        return api.request({url, method: "POST", body, ...options});
    },

    put: async (url: string, body?: object, options?: RequestOptions) => {
        return api.request({url, method: "PUT", body, ...options});
    },
    
    patch: async (url: string, body?: object, options?: RequestOptions) => {
        return api.request({url, method: "PATCH", body, ...options});
    },
    
    delete: async (url: string, options?: RequestOptions) => {
        return api.request({url, method: "DELETE", ...options});
    },
}