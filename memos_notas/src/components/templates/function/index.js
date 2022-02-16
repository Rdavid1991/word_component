import { apiRequest } from "src/utils/apiRequest"

/**
 * 
 * @param {Object} params 
 */
export const fetchTemplate = async () => {
   const response = await apiRequest().get("get_template_doc", {})

   console.log(response);
}