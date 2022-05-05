import swal from 'sweetalert';

const AlertError = async (error) => {
    return await swal({
        title: "A ocurrido un error",
        text : error,
        icon : "error"
    });
};

const AlertWarning = async (warning) => {
    return await swal({
        title: "Oops!!",
        text : warning,
        icon : "warning"
    });
};

const AlertSuccess = async (success) => {
    return await swal({
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
    return await swal(
        'Esta seguro(a)?',
        question,
        'warning', {
            buttons: {
                cancel: "No",
                yes   : {
                    text : "Si, hacerlo",
                    value: true
                }
            }
    });
};

export const AlertPlatform = async () => {
    return await swal({
        title            : 'Plataforma incorrecta',
        html             : "Debe instalar complemento en word para poder acceder",
        icon             : 'error',
        showConfirmButton: false
    });
};

export {
    AlertError,
    AlertWarning,
    AlertSuccess,
    AlertConfirmQuestion
};