import swal from 'sweetalert';

const AlertError = async (error) => {
    return await swal({
        title : "A ocurrido un error",
        text  : error,
        icon  : "error"
    });
};

const AlertWarning = async (warning : string) => {

    const span = document.createElement("div");
    span.innerHTML = warning;

    return await swal({
        content: {
            element: span
        },
        icon  : "warning",
        title : "Oops!!",
    });
};

const AlertSuccess = async (success: string) => {
    return await swal({
        icon  : "success",
        text  : success,
        title : "Hecho",
    });
};

/**
 * Alerta de confirmación
 * @param {string} question Pregunta de acción a realizar
 * @returns 
 */
const AlertConfirmQuestion = async (question: string) : Promise<boolean> => {
    return await swal(
        'Esta seguro(a)?',
        question,
        'warning', {
            buttons: {
                cancel : true,
                yes    : {
                    text  : "Si, hacerlo",
                    value : true
                }
            }
        });
};

export const AlertPlatform = async () => {
    // return await swal({
    //     title            : 'Plataforma incorrecta',
    //     html             : "Debe instalar complemento en word para poder acceder",
    //     icon             : 'error',
    //     showConfirmButton: false
    // });
};

export {
    AlertError,
    AlertWarning,
    AlertSuccess,
    AlertConfirmQuestion
};