//@ts-check
import { globals } from "src/globals";
import { AlertError } from "./Alerts";

export const apiRequest = () => {

    return {

        /**
         * 
         * @param {string} route 
         * @param {Object<string,string>} params
         */
        post: async (route, params) => {

            const formData = new FormData();

            Object.entries(params).map(([key, value]) => {
                formData.append(key, value);
            });

            try {
                const response = await fetch(`${globals.apiUrl}?action=${route}`, {
                    method: "POST",
                    body: formData
                });
                if (response.ok) {
                    return await response.json();
                } else {
                    AlertError(`${response.status} ${response.statusText}`);
                    return false;
                }
            } catch (error) {
                AlertError(error);
            }
            return false;
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

            const response = await fetch(`${globals.apiUrl}?action=${route}${paramsString}`, {
                method: "GET",
            });

            return response;
        }
    };
};

