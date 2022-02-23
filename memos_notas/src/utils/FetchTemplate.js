import { getLocalStorageUserDepartment } from ".";
import { apiRequest } from "./apiRequest";

export const fetchTemplate = async () => {

    const department_owner = getLocalStorageUserDepartment();

    const response = await apiRequest().get("get_template_doc", {department_owner});
    if (response.ok) {
        return await response.json();
    }
    return false;
};