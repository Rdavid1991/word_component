import Swal from 'sweetalert2';

const AlertError = async (error) => {
    return await Swal.fire({
        title: "A ocurrido un error",
        text : error,
        icon : "error"
    });
};

const AlertWarning = async (warning) => {
    return await Swal.fire({
        title: "Oops!!",
        text : warning,
        icon : "warning"
    });
};

const AlertSuccess = async (success) => {
    return await Swal.fire({
        title: "Hecho",
        text : success,
        icon : "success"
    });
};

/**
 * Alerta de confirmación
 * @param {string} question Pregunta de acción a realizar
 * @returns 
 */
const AlertConfirmQuestion = async (question) => {
    return await Swal.fire({
        title             : 'Esta seguro(a)?',
        html              : question,
        icon              : 'question',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Si, hacerlo'
    });
};


export {
    AlertError,
    AlertWarning,
    AlertSuccess,
    AlertConfirmQuestion
};