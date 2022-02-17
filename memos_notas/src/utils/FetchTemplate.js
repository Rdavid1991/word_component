import { apiRequest } from "./apiRequest"

export const fetchTemplate = async () => {
    let json;
    const response = await apiRequest().get("get_template_doc", {})
    if (response.ok) {
        json = await response.json()
        return json
    }
    return false
}