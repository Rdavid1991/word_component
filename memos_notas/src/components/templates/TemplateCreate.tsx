//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { InputText, renderSelectDepartment } from 'src/fragments';
import { typeOfDocuments } from 'src/utils/constants';
import { saveDocumentTemplate } from 'src/utils/SaveAndGet';

const TemplateCreate = ({ handlerFetchTemplate, values, reset, handleInputChange }) => {

    const { showLoader, departments } = useContext(context);


    /**
     * Encargarse de guardar el documento
     * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e 
     */
    const handleSaveDocument = async (e) => {
        e.preventDefault();
        //showLoader(true);
        await saveDocumentTemplate(values, handlerFetchTemplate, reset);
        //showLoader(false);

    };

    const handleReset = () => reset();

    return (
        <>
            <form
                autoComplete="off"
                onSubmit={handleSaveDocument}
                onReset={handleReset}
            >
                <InputText
                    htmlId="name"
                    htmlLabel="Nombre"
                    onChange={handleInputChange}
                    value={values.name}
                    placeholder="Nombre de plantilla"
                    required={true}
                    icon="far fa-file-alt"
                    name='name'
                />

                <div className="mb-3">
                    <label htmlFor="type" className="form-label font-weight-bold">Tipo de documento</label>
                    <select id="type"
                        className="form-control form-control-sm"
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

                {renderSelectDepartment(values, handleInputChange, departments)}

                <div className="mb-3">
                    <button
                        className="btn btn-sm btn-secondary mx-1"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button
                        className="btn btn-sm btn-secondary mx-1"
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