/* eslint-disable no-prototype-builtins */
//@ts-check

import { AlertError } from "./Alerts";
import { apiRequest } from "./apiRequest";

const localStorageKeyUser = "infoUser";

/**
 * 
 * @param {String} memo 
 * @returns {Boolean}
 */
const isMemo = (memo) => {
    return parseInt(memo) === 1 ? true : false;
};

/**
 *
 * @param {String} note 
 * @returns {Boolean}
 */
const isNote = (note) => {
    return parseInt(note) === 2 ? true : false;
};

/**
 * @param {Number | String} digit 
 * @returns {String}
 */
const addZeroToLeft = (digit) => {

    switch (digit.toString().length) {
        case 1:
            return `00${digit}`;
        case 2:
            return `0${digit}`;
        default:
            return `${digit}`;
    }
};

/**
 * Obtener los departamentos a los que pertenece un usuario
 * @returns 
 */
export const getDepartmentOwner = async (id= "0") => {
    const response = await apiRequest().get("get_options_department_owner", { id });
    if (response.ok) {
        return await response.json();
    }
    AlertError(`Error al cagar departamentos: ${response.status} - ${response.statusText}`);
    return [];
};

/**
 * Verificar si existe usuario en el almacenamiento local
 * return
 */
const existUser = () => localStorage.hasOwnProperty(localStorageKeyUser) ? true : false;

/**
 * Verificar si no existe usuario en el almacenamiento local
 * return
 */
const notExistUser = () => !localStorage.hasOwnProperty(localStorageKeyUser) ? true : false;

/**
 * @returns {string}
 */
const getLocalStorageUserName = () => localStorage.hasOwnProperty(localStorageKeyUser)
    ? JSON.parse(localStorage.getItem(localStorageKeyUser)).user
    : "";

const getLocalStorageUserEmail = () => localStorage.hasOwnProperty(localStorageKeyUser)
    ? JSON.parse(localStorage.getItem(localStorageKeyUser)).email
    : "";

/**
 * 
 * @returns {string}
 */
const getLocalStorageUserInitials = () => localStorage.hasOwnProperty(localStorageKeyUser)
    ? JSON.parse(localStorage.getItem(localStorageKeyUser)).initials
    : "";

/**
 * 
 * @returns {string}
 */
const getLocalStorageUserDepartment = () => localStorage.hasOwnProperty(localStorageKeyUser)
    ? JSON.parse(localStorage.getItem(localStorageKeyUser)).department
    : "";

export {
    isMemo,
    isNote,
    addZeroToLeft,
    existUser,
    notExistUser,
    getLocalStorageUserName,
    getLocalStorageUserEmail,
    getLocalStorageUserInitials,
    getLocalStorageUserDepartment,
    localStorageKeyUser
};
