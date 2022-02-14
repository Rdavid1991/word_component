//@ts-check
import React, { useContext } from 'react'
import { LoaderContext } from 'src/context/loaderContext'
import { useForm } from 'src/hooks/useForm'
import { apiRequest } from 'src/utils/apiRequest'
import Swal from 'sweetalert2'


const initialState = {
    name: "",
    variable: "",
    dataType: ""
}
const route = "?action=save_template_field"

export const TemplateFields = () => {


    // eslint-disable-next-line no-unused-vars
    const [values, setValues, handleInputChange, reset] = useForm(initialState)
    const setLoader = useContext(LoaderContext)
    /**
     * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e Evento del formulario
     */
    const handleSaveField = async (e) => {
        e.preventDefault()
        setLoader(true)
        const response = await apiRequest().post(route, values)
        if (response) {
            setLoader(false)
            await Swal.fire(response)
            reset();
        }
    }

    return (
        <>
            <h5 className="text-center mt-2 text-decoration-underline">Crear campos y variables</h5>
            <form
                className="row g-3 needs-validation"
                onSubmit={handleSaveField}
            >
                <div className="col-md-4">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        id="name"
                        value={values.name}
                        onChange={handleInputChange}
                        placeholder="Nombre de campo"
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="variable" className="form-label">Variable</label>
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        id="variable"
                        value={values.variable}
                        onChange={handleInputChange}
                        placeholder="Variable para el campo"
                        required
                    />

                </div>
                <div className="col-md-4">
                    <label htmlFor="dataType" className="form-label">Tipo</label>
                    <select
                        id="dataType"
                        value={values.dataType}
                        onChange={handleInputChange}
                        className="form-select form-select-sm"
                    >
                        <option disabled value="">Seleccione un tipo</option>
                        <option value="text">Texto</option>
                        <option value="number">Numérico</option>
                    </select>
                </div>

                <div className="col-12 d-flex justify-content-evenly">
                    <button
                        className="btn btn-sm btn-primary"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={reset}
                    >
                        Limpiar campos
                    </button>
                </div>
            </form>
        </>
    )
}
