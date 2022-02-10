//@ts-check


const localStorageKeyUser = "infoUser"

/**
 * 
 * @param {String} memo 
 * @returns {Boolean}
 */
const isMemo = (memo) => {
    return parseInt(memo) === 1 ? true : false
}

/**
 *
 * @param {String} note 
 * @returns {Boolean}
 */
const isNote = (note) => {
    return parseInt(note) === 2 ? true : false
}

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

export {
    isMemo,
    isNote,
    addZeroToLeft,
    localStorageKeyUser
}
