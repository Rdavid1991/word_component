import { getLocalStorageUserDepartment, localStorageKeyUser } from "src/utils";
import { AlertError } from "src/utils/Alerts";
import { apiRequest } from "src/utils/apiRequest";
import { clearDocument, readDocument } from "src/utils/documents";
import Swal from "sweetalert2";

/**
 * Obtener los destinatarios
 * @returns 
 */
export const getAddresses = async () => {

    const department_owner = getLocalStorageUserDepartment();
    try {

        let response = await apiRequest().get("get_addressee", { department_owner });
        if (response.ok) {
            return await response.json();
        }
        const {message} = await response.json();
        await AlertError(`Error al consultar destinatarios: ${message.text}`);
    } catch (error) {
        await AlertError(`Error al consultar destinatarios: ${error}`);
    }
    return false;
};

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
export const saveAddressees = async (form) => {

    const department_owner = getLocalStorageUserDepartment();

    try {
        const route = `${form.edit ? "edit" : "save"}_addressee`;
        let response = await apiRequest().post(route, { ...form, department_owner });
        if (response.ok) {
            await Swal.fire(await response.json());
            return { isSaved: true };
        } else {
            const {message} = await response.json();
            await AlertError(`No se pudo guardar el destinatario: ${message.text}`);
        }
    } catch (error) {
        await AlertError(error);
    }
    return {isSaved: false};
};

/**
 * Borrar destinatarios
 * @param {String|Number} id 
 * @param {Function} showLoader Invocar spinner de carga
 */
export const deleteAddressees = async (id, showLoader) => {

    try {
        showLoader(true);
        let response = await apiRequest().post("delete_addressee", { id });
        showLoader(false);
        if (response.ok) {
            await Swal.fire(await response.json());
        } else {
            const {message} = await response.json();
            await AlertError(`No se pudo borrar el destinatario: ${message.text}`);
        }
    } catch (error) {
        showLoader(false);
        await AlertError(error);
    }
};

/**
 * Obtener consecutivo
 * @returns 
 */
export const getConsecutiveNumber = async () => {

    const department_owner = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;

    try {
        const response = await apiRequest().get("get_count_numbers", { department_owner });
        if (response.ok) {
            return await response.json();
        }
        const {message} = await response.json();
        await AlertError(`Error al consultar consecutivo: ${message.text}`);
    } catch (error) {
        await AlertError(`Error al consultar consecutivo: ${error}`);
    }
    return false;
};

/**
 * Guardar consecutivo
 * @param {Object} numbers 
 * @param {string} numbers.memo
 * @param {string} numbers.note
 */
export const saveConsecutiveNumber = async (numbers) => {
    try {
        const department_owner = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;
        const response = await apiRequest().post("save_count_numbers", { ...numbers, department_owner });
        if (response.ok) {
            return response;
        } else {
            const {message} = await response.json();
            AlertError(`No se pudo guardar consecutivo: ${message.text}`);
        }
    } catch (error) {
        AlertError(error);
    }
    return false;
};

export const getDocumentTemplate = async () => {

    const department_owner = getLocalStorageUserDepartment();

    try {
        const response = await apiRequest().get("get_template_doc", { department_owner });
        if (response.ok) {
            return await response.json();
        } else {
            const {message} = await response.json();
            await AlertError(`Error al consultar plantillas: ${message.text}`);
        }
    } catch (error) {
        await AlertError(`Error al consultar plantillas: ${error}`);
    }
    return false;
};

/**
 * Guardar template de documento
 * @param {Object<string,string>} values 
 * @param {Function} handlerFetchTemplate 
 * @param {Function} reset 
 */
export const saveDocumentTemplate = async (values, handlerFetchTemplate, reset) => {
    const document = await readDocument();
    if (document) {

        const department_owner = getLocalStorageUserDepartment();

        try {
            const response = await apiRequest()
                .post(`${values.edit ? "edit" : "save"}_template_doc`, { ...values, document, department_owner });
            if (response.ok) {
                handlerFetchTemplate();
                await Swal.fire(await response.json());
                clearDocument();
                reset();
            } else {
                const {message} = await response.json();
                await AlertError(`No se pudo guardar la plantilla: ${message.text}`);
            }
        } catch (error) {
            await AlertError(`Error al guardar plantilla: ${error}`);
        }
    }
};