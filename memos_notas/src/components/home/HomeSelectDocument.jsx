//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { AlertError, AlertSuccess } from 'src/utils/Alerts';
import { typeOfDocuments } from 'src/utils/constants';
import { writeDocument } from 'src/utils/documents';

export const SelectMemoOrNotes = ({ setMemoOrNoteState }) => {
    const { documents } = useContext(context)

    const handleSelectChange = ({ target }) => {
        const template = JSON.parse(documents.find(item => parseInt(item.id) === parseInt(target.value)).doc)
        const documentType = target.children[target.selectedIndex].dataset.type

        setMemoOrNoteState(documentType)

        writeDocument(template)
            .then(async () => {
                await AlertSuccess("Documento cargado satisfactoriamente");
            }).
            catch(async (error) => {
                await AlertError("No se puede cargar documento, revise si el documento actual no tiene controles bloqueados. " + error)
            });
    }

    return (
        <form className="px-2">
            <div className="mb-3">
                <label htmlFor="to" className="form-label fw-bold">Memo o Notas?</label>
                <select
                    name="type"
                    className="form-select form-select-sm"
                    required={true}
                    onChange={handleSelectChange}
                >
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
