//@ts-check
import { useContext } from "react";
import { context } from "src/context/context";
import { AlertError } from "src/utils/Alerts";
import { getLocalStorageUserDepartment } from "src/utils";
import { apiRequest } from "src/utils/apiRequest";
import Swal from "sweetalert2";


/**
 * 
 * @param {object} form 
 * @param {string} form.id 
 * @param {string} form.name 
 * @param {boolean} form.edit 
 * @param {string} form.jobTitle 
 * @param {string} form.archetype 
 * @param {string} form.department 
 * @param {Function} showLoader Invocar spinner de carga
 */
const saveAddressees = async (form, showLoader) => {

    const department_owner = getLocalStorageUserDepartment();

    try {
        showLoader(true);
        const route = `${form.edit ? "edit" : "save"}_addressee`;
        let response = await apiRequest().post(route, { ...form, department_owner });
        showLoader(false);
        if (response.ok) {
            await Swal.fire(await response.json());
        } else {
            await AlertError(`No se pudo guardar el destinatario: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        showLoader(false);
        await AlertError(error);
    }
};

/**
 * Borrar destinatarios
 * @param {String|Number} id 
 * @param {Function} showLoader Invocar spinner de carga
 */
const deleteAddressees = async (id, showLoader) => {
   
    try {
        showLoader(true);
        let response = await apiRequest().post("delete_addressee", { id });
        showLoader(false);
        if (response.ok) {
            await Swal.fire(await response.json());
        } else {
            await AlertError(`No se pudo borrar el destinatario: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        showLoader(false);
        await AlertError(error);
    }
};

export {
    saveAddressees,
    deleteAddressees
};