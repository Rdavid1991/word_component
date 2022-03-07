//@ts-check
import React, { useContext, useState } from 'react';
import { context } from 'src/context/context';
import { AlertError, AlertSuccess } from 'src/utils/Alerts';
import { typeOfDocuments } from 'src/utils/constants';
import { writeDocument } from 'src/utils/documents';
import { selectedDocumentType } from './functions';
import { parametersOfDocuments } from './functions/parametersOfDocuments';

const HomeSelectDocument = ({ setMemoOrNoteState, memoOrNoteState, documents, setSelectedState, selectedState }) => {
    const { setControls } = useContext(context);

    const handleSelectChange = ({ target }) => {
        setSelectedState(target.value);
        const template = JSON.parse(documents.find(item => parseInt(item.id) === parseInt(target.value)).doc);

        setMemoOrNoteState(selectedDocumentType(target));

        writeDocument(template)
            .then(async () => {
                await AlertSuccess("Documento cargado satisfactoriamente");
                setControls(await parametersOfDocuments());
            })
            .catch(async (error) => {
                await AlertError("No se puede cargar documento, revise si el documento actual no tiene controles bloqueados. " + error);
            });
    };

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="to" className="form-label fw-bold">Seleccionar una plantilla</label>
                <select
                    name="type"
                    className="form-select form-select-sm"
                    required={true}
                    onChange={handleSelectChange}
                    value={selectedState}
                >
                    <option disabled value="">Seleccione una plantilla</option>
                    {
                        documents.map((item, index) => (
                            <option
                                key={index}
                                data-type={item.type}
                                value={item.id}
                            >
                                {typeOfDocuments[item.type]} - {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </form >
    );
};

export default React.memo(HomeSelectDocument);