/**
 * @author rcenteno@mides.gob.pa
 * 
 * Se encarga de hacer las peticiones a base de datos
 */


import { getLocalStorageUserDepartment, localStorageKeyUser } from "src/utils";
import { AlertConfirmQuestion, AlertError, AlertSuccess } from "src/utils/Alerts";
import { apiRequest } from "src/utils/apiRequest";
import { clearDocument, readDocument } from "src/utils/documents";
import swal from "sweetalert";



export const getDepartment = async (id = undefined) => {

    const params: any = {};

    if (id) {
        params.id = id;
    }

    try {
        const response = await apiRequest().get("get_options_department_owner", { ...params });

        if (response.ok) {
            return await response.json();
        }
        const { message } = await response.json();
        await AlertError(`Error al consultar destinatarios: ${message.text}`);
    } catch (error) {
        await AlertError(`Error al consultar destinatarios: ${error}`);
    }
    return false;
};

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
        const { message } = await response.json();
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
            const { message } = await response.json();
            await swal(message);
            return { isSaved: true };
        } else {
            const { message } = await response.json();
            await AlertError(`No se pudo guardar el destinatario: ${message.text}`);
        }
    } catch (error) {
        await AlertError(error);
    }
    return { isSaved: false };
};

/**
 * Borrar destinatarios
 * @param {String|Number} id 
 * @param {Function} showLoader Invocar spinner de carga
 */
export const deleteAddressees = async (id) => {

    try {
        let response = await apiRequest().post("delete_addressee", { id });
        if (response.ok) {
            const { message } = await response.json();
            await swal(message);
        } else {
            const { message } = await response.json();
            await AlertError(`No se pudo borrar el destinatario: ${message.text}`);
        }
    } catch (error) {
        await AlertError(error);
    }
};

export const deleteFunctionary = async (id) => {

    try {
        let response = await apiRequest().post("delete_functionary", { id });
        if (response.ok) {
            console.log("llega a borrar");
            const { message } = await response.json();
            await swal(message);
        } else {
            const { message } = await response.json();
            await AlertError(`No se pudo borrar el funcionario: ${message.text}`);
        }
    } catch (error) {
        await AlertError(error);
    }
};

export const saveFunctionary = async (form) => {
    const department_owner = getLocalStorageUserDepartment();

    try {
        const route = `${form.edit ? "edit" : "save"}_functionary`;
        let response = await apiRequest().post(route, { ...form, department_owner });
        if (response.ok) {
            const { message } = await response.json();
            await swal(message);
            return { isSaved: true };
        } else {
            const { message } = await response.json();
            await AlertError(`No se pudo guardar el destinatario: ${message.text}`);
        }
    } catch (error) {
        await AlertError(error);
    }
    return { isSaved: false };
};

/**
 * Obtener funcionarios
 * @returns 
 */
export const getFunctionaries = async () => {

    const department_owner = JSON.parse(localStorage.getItem(localStorageKeyUser)).department;

    try {
        const response = await apiRequest().get("get_functionary", { department_owner });
        if (response.ok) {
            return await response.json();
        }
        const { message } = await response.json();

        await AlertError(`Error al consultar funcionarios: ${message.text}`);
    } catch (error) {
        await AlertError(`Error al consultar funcionarios: ${error}`);
    }
    return false;
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
        const { message } = await response.json();
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
            const { message } = await response.json();
            AlertError(`No se pudo guardar consecutivo: ${message.text}`);
        }
    } catch (error) {
        AlertError(error);
    }
    return false;
};

/**
 * 
 * @param {String | Number} id 
 * @returns 
 */
export const getDocumentTemplate = async (id) => {

    const department_owner = getLocalStorageUserDepartment();

    try {
        const response = await apiRequest().get("get_template_doc", { id, department_owner });
        if (response.ok) {
            return await response.json();
        } else {
            const { message } = await response.json();
            await AlertError(`Error al consultar plantillas: ${message.text}`);
        }
    } catch (error) {
        await AlertError(`Error al consultar plantillas: ${error}`);
    }
    return false;
};


export const getDocumentInfoTemplate = async () => {

    const department_owner = getLocalStorageUserDepartment();

    try {
        const response = await apiRequest().get("get_template_info", { department_owner });
        if (response.ok) {
            return await response.json();
        } else {
            const { message } = await response.json();
            await AlertError(`Error al consultar información de plantillas: ${message.text}`);
        }
    } catch (error) {
        await AlertError(`Error al consultar información de plantillas: ${error}`);
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

    try {
        const document = await readDocument();

        if (document) {

            const department_owner = getLocalStorageUserDepartment();

            const response = await apiRequest()
                .post(`${values.edit ? "edit" : "save"}_template_doc`, { ...values, document, department_owner });
            if (response.ok) {
                handlerFetchTemplate();
                const { message } = await response.json();
                //await Swal.fire(message);
                clearDocument();
                reset();
            } else {
                const { message } = await response.json();
                await AlertError(`No se pudo guardar la plantilla: ${message.text}`);
            }
        }
    } catch (error) {
        await AlertError(`Error al guardar plantilla: ${error}`);
    }
};

/**
 * 
 * @param {Function} handlerFetchTemplate 
 * @param {number| string} id 
 */
export const deleteDocumentTemplate = async (handlerFetchTemplate, id) => {
    const value = await AlertConfirmQuestion("Va a borrar un elemento ¿desea continuar?");

    if (value) {
        try {
            const response = await apiRequest().post("delete_template_doc", { id });
            if (response.ok) {
                handlerFetchTemplate();
                const { message } = await response.json();
                //await Swal.fire(message);
            } else {
                const { message } = await response.json();
                AlertError(`No de pudo borrar la plantilla: ${message.text}`);
            }
        } catch (error) {
            AlertError(error);
        }
    } else {
        AlertSuccess("La acción a sido cancelada");
    }
};

/**
 * Iniciar sesión a los administradores
 * @param user Nombre de usuario administrador
 * @param pass Contraseña de usuario administrador
 */
export const loginAdmin = async (user: string, pass: string) => {

    try {
        const response = await   apiRequest().post("login_admin", { user, pass });
        if (response.ok) {
            return await response.json();
        }
        const { message } = await response.json();

        await AlertError(`Error al iniciar como administrador: ${message.text}`);
    } catch (error) {
        await AlertError(`Error al iniciar como administrador: ${error}`);
    }
    return false;
}