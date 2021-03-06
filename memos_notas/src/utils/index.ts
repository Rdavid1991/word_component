/* eslint-disable no-prototype-builtins */
//@ts-check

const localStorageKeyUser = "infoUser";
const localStorageAdminKey = "adminUser"

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
 * Verificar si existe usuario en el almacenamiento local
 * return
 */
const existUser = () => localStorage.hasOwnProperty(localStorageKeyUser) ? true : false;

const existAdmin = () => localStorage.hasOwnProperty(localStorageAdminKey) ? true : false;

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
const getLocalStorageUserDepartment = () => {

    if (localStorage.hasOwnProperty(localStorageKeyUser)) {
        return JSON.parse(localStorage.getItem(localStorageKeyUser)).department
    } else if (localStorage.hasOwnProperty(localStorageAdminKey)) {
        return JSON.parse(localStorage.getItem(localStorageAdminKey)).department
    } else {
        return ""
    }


}
export {
    isMemo,
    isNote,
    addZeroToLeft,
    existUser,
    existAdmin,
    notExistUser,
    getLocalStorageUserName,
    getLocalStorageUserEmail,
    getLocalStorageUserInitials,
    getLocalStorageUserDepartment,
    localStorageKeyUser,
    localStorageAdminKey
};
