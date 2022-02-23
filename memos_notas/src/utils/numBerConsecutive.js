//@ts-check
import { localStorageKeyUser } from ".";
import { AlertError } from "./Alerts";
import { apiRequest } from "./apiRequest";

const getNumber = async () => {
    
    const department_owner = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;
    
    const response = await apiRequest().get("get_count_numbers", { department_owner });
    if (response.ok) {
        return await response.json();
    }
    return false;
};

/**
 * @param {Object} numbers 
 * @param {string} numbers.memo
 * @param {string} numbers.note
 */
const saveNumber = async (numbers) => {
    try {
        const department_owner = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;
        const response = await apiRequest().post("save_count_numbers", {...numbers, department_owner});
        if (!response.ok) {
            AlertError(`No se pudo guardar consecutivo: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        AlertError(error);
    }
    
};

export {
    saveNumber,
    getNumber
};