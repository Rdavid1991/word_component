import swal from 'sweetalert';

const AlertError = async (error) => {

    console.error(error);

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
    return await swal({
        title             : 'Esta seguro(a)?',
        html              : question,
        icon              : 'question',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Si, hacerlo'
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