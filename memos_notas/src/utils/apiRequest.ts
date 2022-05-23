/**
 * @author rcenteno@mides.gob.pa
 * 
 * Se encarga de abstraer las peticiones al servidor
 */

import { globals } from "src/globals";

interface ApiRequest {
    post: (route: string, params: object) => Promise<any>,
    get: (route: string, params: object) => Promise<any>
}

export const apiRequest = (): ApiRequest => {

    return {

        /**
         * Petición post
         * @param  route 
         * @param  params
         */
        post: async (route: string, params: { [s: string]: any; }) => {

            const formData = new FormData();

            Object.entries(params).map(([key, value]: any) => {
                formData.append(key, value);
            });

            return await fetch(`${globals.apiUrl}?action=${route}`, {
                method: "POST",
                body: formData
            });
        },

        /**
         * 
         * @param route 
         * @param params 
         * @returns 
         */
        get: async (route: string, params: { [s: string]: string; }) => {

            let paramsString = "";

            Object.entries(params).map(([key, value]) => {
                paramsString += `&${key}=${value}`;
            });

            const response = await fetch(`${globals.apiUrl}?action=${route}${paramsString}`, {
                method: "GET",
                cache: "no-cache"
            });

            return response;
        }
    };
};

