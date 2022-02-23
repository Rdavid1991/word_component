//@ts-check
import { globals } from "src/globals";
import Swal from "sweetalert2";
import { AlertError } from "./Alerts";

export const apiRequest = () => {

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

            return await fetch(`${globals.apiUrl}?action=${route}`, {
                method: "POST",
                body: formData
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

            const response = await fetch(`${globals.apiUrl}?action=${route}${paramsString}`, {
                method: "GET",
            });

            return response;
        }
    };
};

