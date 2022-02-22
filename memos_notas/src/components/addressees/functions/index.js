//@ts-check
import { globals } from "../../../globals";


/**
 * 
 * @param {object} form 
 * @param {string} form.id 
 * @param {string} form.name 
 * @param {boolean} form.edit 
 * @param {string} form.jobTitle 
 * @param {string} form.archetype 
 * @param {string} form.department 
 * @returns 
 */
const saveAddressees = async (form) => {

    const formdata = new FormData();
    formdata.append("id", form.id);
    formdata.append("name", form.name);
    formdata.append("jobTitle", form.jobTitle);
    formdata.append("archetype", form.archetype);
    formdata.append("department", form.department);
    var requestOptions = {
        method: 'POST',
        body: formdata
    };

    let response = await fetch(`${globals.apiUrl}?action=${form.edit ? "edit" : "save"}_addressee`, requestOptions);
    if (response.ok) {
        return await response.json();
    }
    return false;
};

const deleteAddressees = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    var requestOptions = {
        method: 'POST',
        body: formData
    };

    let response = await fetch(`${globals.apiUrl}?action=delete_addressee`, requestOptions);
    if (response.ok) {
        return  await response.json();
    }
};

export {
    saveAddressees,
    deleteAddressees
};