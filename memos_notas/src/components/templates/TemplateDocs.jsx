import React from 'react'
//import { useForm } from 'src/hooks/useForm'

export const TemplateDocs = () => {

    //useForm()

    return (

        <>
            <h5 className="text-center mt-2 text-decoration-underline">Crear plantillas de documentos</h5>
            <form
                className="row g-3">
                <div
                    className="col-md-4">
                    <label
                        htmlFor="name"
                        className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        id="name"
                        value={"value.name"}
                        placeholder="Nombre de plantilla"
                        required
                    />
                </div>

                <div
                    className="col-12">
                    <button
                        className="btn btn-sm btn-primary"
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>

    )
}
