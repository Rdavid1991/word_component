//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { AlertError } from 'src/utils/Alerts';
import { apiRequest } from 'src/utils/apiRequest';
import { typeOfDocuments } from 'src/utils/constants';
import { getDocument } from 'src/utils/documents';
import Swal from 'sweetalert2';


const TemplateCreate = ({ handlerFetchTemplate, values, reset, handleInputChange }) => {

    const { showLoader } = useContext(context);
    /**
     * Encargarse de guardar el documento
     * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e 
     */
    const handleSaveDocument = async (e) => {
        e.preventDefault();

        const document = await getDocument();
        if (document) {
            try {
                showLoader(true);
                const response = await apiRequest()
                .post(`${values.edit ? "edit" : "save"}_template_doc`, { ...values, "document": document });
                if (response.ok) {
                    handlerFetchTemplate();
                    showLoader(false);
                    await Swal.fire(await response.json());
                    reset();
                }else{
                    showLoader(false); 
                    AlertError(`No se pudo guardar la plantilla: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                showLoader(false); 
                AlertError(error);
            }
        }
    };

    const handleReset = () => reset();


    return (
        <>
            <div className="px-3">
                <h3 className="fw-bold text-center">Crear plantillas de documentos</h3>
            </div>

            <form
                className="g-3"
                onSubmit={handleSaveDocument}
                onReset={handleReset}
            >
                <div className="mb-3">
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

                <div className="mb-3">
                    <select id="type"
                        className="form-select form-select-sm"
                        value={values.type}
                        onChange={handleInputChange}
                    >
                        <option disabled defaultValue="">Seleccione un tipo</option>
                        {
                            Object.entries(typeOfDocuments).map(([key, value], index) => (
                                <option key={index} value={key}>{value}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">

                    <button
                        className="btn btn-sm btn-primary mx-1"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button
                        className="btn btn-sm btn-primary mx-1"
                        type="reset"
                    >
                        Limpiar campos
                    </button>
                </div>
            </form>
        </>
    );
};

export default React.memo(TemplateCreate);
