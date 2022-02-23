//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { getLocalStorageUserDepartment } from 'src/utils';
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

            const department_owner = getLocalStorageUserDepartment();

            try {
                showLoader(true);
                const response = await apiRequest()
                    .post(`${values.edit ? "edit" : "save"}_template_doc`, { ...values, document, department_owner });
                if (response.ok) {
                    handlerFetchTemplate();
                    showLoader(false);
                    await Swal.fire(await response.json());
                    reset();
                } else {
                    showLoader(false);
                    await AlertError(`No se pudo guardar la plantilla: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                showLoader(false);
                await AlertError(`Error al guardar plantilla: ${error}`);
            }
        }
    };

    const handleReset = () => reset();


    return (
        <>

            <h3 className="fw-bold">Crear plantillas de documentos</h3>

            <form
                onSubmit={handleSaveDocument}
                onReset={handleReset}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">Nombre</label>
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
                    <label htmlFor="type" className="form-label fw-bold">Tipo de documento</label>
                    <select id="type"
                        className="form-select form-select-sm"
                        value={values.type}
                        onChange={handleInputChange}
                        required
                    >
                        <option disabled value="">Seleccione un tipo</option>
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
