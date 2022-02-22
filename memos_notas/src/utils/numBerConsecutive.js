//@ts-check
import { apiRequest } from "./apiRequest";

const getNumber = async () => {
    const response = await apiRequest().get("get_count_numbers", {});
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
    apiRequest().post("save_count_numbers", numbers);
};

export {
    saveNumber,
    getNumber
};