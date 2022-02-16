import { apiRequest } from "./apiRequest"

export const fetchTemplate = async () => {
    const response = await apiRequest().get("get_template_doc", {})
    return response.ok ? await response.json() : false
}