//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { renderSelectDepartment } from 'src/fragments';
import { typeOfDocuments } from 'src/utils/constants';
import { saveDocumentTemplate } from 'src/utils/SaveAndGet';

const TemplateCreate = ({ handlerFetchTemplate, values, reset, handleInputChange }) => {

    const { showLoader, departmentOwnerState } = useContext(context);


    /**
     * Encargarse de guardar el documento
     * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e 
     */
    const handleSaveDocument = async (e) => {
        e.preventDefault();
        showLoader(true);
        await saveDocumentTemplate(values, handlerFetchTemplate, reset);
        showLoader(false);

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
                        <option>Seleccione un tipo</option>
                        {
                            Object.entries(typeOfDocuments).map(([key, value], index) => (
                                <option key={index} value={key}>{value}</option>
                            ))
                        }
                    </select>
                </div>

                {renderSelectDepartment(values, handleInputChange, departmentOwnerState)}

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
