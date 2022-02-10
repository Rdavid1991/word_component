import Swal from 'sweetalert2'

export const ErrorAlert = async (error) => {
    await Swal.fire({
        title: "A ocurrido un error",
        text: error,
        icon: "error"
    })
}
