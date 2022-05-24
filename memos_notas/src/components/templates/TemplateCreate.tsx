import React, { useContext, MouseEvent, ChangeEvent } from 'react';
import { context } from 'src/context/context';
import { InputText, SelectDepartment } from 'src/fragments';
import { typeOfDocuments } from 'src/utils/constants';
import { saveDocumentTemplate } from 'src/utils/SaveAndGet';
import { FetchContext } from '../../context/context';
import PropTypes from 'prop-types';
import { TemplateInfoSchema } from '../../helpers/interface/index';

interface Props {
    values: TemplateInfoSchema,
    reset: () => void,
    handleInputChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
}

const TemplateCreate = ({ values, reset, handleInputChange } : Props) => {

    const { showLoader, departments } = useContext(context);
    const { fetchTemplate } = useContext(FetchContext);


    /**
     * Encargarse de guardar el documento
     */
    const handleSaveDocument = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        //showLoader(true);
        const saved = await saveDocumentTemplate(values, reset);
        if (saved) fetchTemplate();
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

                <SelectDepartment {...{ values, handleInputChange, departments }} />

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
