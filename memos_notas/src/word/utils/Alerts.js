import Swal from 'sweetalert2'

const AlertError = async (error) => {
    await Swal.fire({
        title: "A ocurrido un error",
        text: error,
        icon: "error"
    })
}

const AlertWarning = async (warning) => {
    await Swal.fire({
        title: "Oops!!",
        text: warning,
        icon: "warning"
    })
}

const AlertSuccess = async (success) => {
    await Swal.fire({
        title: "Hecho",
        text: success,
        icon: "success"
    })
}


export {
    AlertError,
    AlertWarning,
    AlertSuccess
}