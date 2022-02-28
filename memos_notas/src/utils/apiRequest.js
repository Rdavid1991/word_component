//@ts-check
import { globals } from "src/globals";

export const apiRequest = () => {

    const controller = new AbortController();

    return {

        /**
         * 
         * @param {string} route 
         * @param {Object<string,any>} params
         */
        post: async (route, params) => {

            const formData = new FormData();

            Object.entries(params).map(([key, value]) => {
                formData.append(key, value);
            });

            setTimeout(() => controller.abort(), 5000);

            return await fetch(`${globals.apiUrl}?action=${route}`, {
                signal: controller.signal,
                method: "POST",
                body  : formData
            });
        },

        /**
         * 
         * @param {string} route
         * @param {Object<string,string>} params
         */
        get: async (route, params) => {

            let paramsString = "";

            Object.entries(params).map(([key, value]) => {
                paramsString += `&${key}=${value}`;
            });

            setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${globals.apiUrl}?action=${route}${paramsString}`, {
                signal: controller.signal,
                method: "GET",
            });

            return response;
        }
    };
};

