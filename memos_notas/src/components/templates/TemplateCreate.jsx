//@ts-check
import React, { useContext } from 'react'
import { context } from 'src/context/context';
import { useForm } from 'src/hooks/useForm';
import { apiRequest } from 'src/utils/apiRequest';
import Swal from 'sweetalert2';
import { getDocument } from './function/documents';

const initialState = {
    name: "",
    type:""
}


export const TemplateCreate = ({fetchTemplate}) => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);
    const {showLoader} = useContext(context);
    /**
     * Encargarse de guardar el documento
     * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e 
     */
    const handleSaveDocument = async (e) => {
        e.preventDefault();

        const document = await getDocument();
        if (document) {
            showLoader(true)
            const response = await apiRequest()
                .post("?action=save_template_doc", { ...values, "document": document });
            if (response) {
                showLoader(false)
                fetchTemplate();
                await Swal.fire(response);
                reset();
            }
            showLoader(false)
        }
    }

    return (
        <>
            <div className="px-3">
                <h3 className="fw-bold text-center">Crear plantillas de documentos</h3>
            </div>

            <form
                className="row g-3"
                onSubmit={handleSaveDocument}
            >
                <div className="col-md-4">
                    <label
                        htmlFor="name"
                        className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        id="name"
                        onChange={handleInputChange}
                        value={values.name}
                        placeholder="Nombre de plantilla"
                        required
                    />
                </div>

                <div className="col-md-4">
                    <select id="type">
                        <option value="memo">Memorandum</option>
                        <option value="nota">Nota</option>
                    </select>
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
