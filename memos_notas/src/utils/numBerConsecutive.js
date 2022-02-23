//@ts-check
import { localStorageKeyUser } from ".";
import { apiRequest } from "./apiRequest";


const getNumber = async () => {
    
    const department = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;
    
    const response = await apiRequest().get("get_count_numbers", { department });
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
    const department = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;
    apiRequest().post("save_count_numbers", {...numbers, department});
};

export {
    saveNumber,
    getNumber
};