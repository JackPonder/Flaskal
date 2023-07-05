interface RequestOptions {
    url: string;
    method: string;
    body?: object;
}

export class Api {
    static BASE_URL = "http://127.0.0.1:5000";

    static async request(options: RequestOptions) {
        let response: Response;
        try {
            response = await fetch(Api.BASE_URL + options.url, {
                method: options.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(options.body)
            });
        } catch (e: any) {
            let error = e.message;
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
    }
    
    static async get(url: string) {
        return Api.request({url, method: "GET"});
    }
    
    static async post(url: string, body: object) {
        return Api.request({url, method: "POST", body});
    }

    static async put(url: string, body: object) {
        return Api.request({url, method: "PUT", body});
    }
    
    static async patch(url: string, body: object) {
        return Api.request({url, method: "PATCH", body});
    }
    
    async delete(url: string) {
        return Api.request({url, method: "DELETE"});
    }
}