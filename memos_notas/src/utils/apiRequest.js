import { globals } from "src/globals";
import { AlertError } from "./Alerts";

export const apiRequest = () => {

    return {

        /**
         * 
         * @param {string} url 
         * @param  {object} params 
         */
        post: async (route, params) => {

            const formData = new FormData();

            Object.entries(params).map((entry) => {
                const [key, value] = entry
                formData.append(key, value)
            })

            const response = await fetch(globals.apiUrl + route, {
                method: "POST",
                body: formData
            }).catch((error) => {
                AlertError(error)
            })

            if (response.ok) {
                try {
                    return await response.json()
                } catch (error) {
                    await AlertError(error)
                    return false
                }
            }
            await AlertError("Fallo la conexión")
            return  false;
        }
    }
}
