//@ts-check

import { globals } from "../../../../globals";


const getNumber = async () => {
    let response = await fetch(`${globals.apiUrl}?action=get_count_numbers`, {})
    if (response.ok) {
        return await response.json();
    }
    return false
};


/**
 * @param {Object} numbers 
 * @param {string} numbers.memo
 * @param {string} numbers.note
 */
const saveNumber = async (numbers) => {
    const formData = new FormData()
    formData.append("memo", numbers.memo)
    formData.append("note", numbers.note)
    var requestOptions = {
        method: 'POST',
        body: formData
    };

    let response = await fetch(`${globals.apiUrl}?action=save_count_numbers`, requestOptions)
    if (response.ok) {
        return await response.json();
    }
    return false
}

export {
    saveNumber,
    getNumber
};

