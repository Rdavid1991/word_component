//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { writeDocument } from './functions/writeDocument';

export const SelectMemoOrNotes = ({ setMemoOrNoteState }) => {
    const { documents } = useContext(context)

    const handleSelectChange = ({ target }) => {
        const template = JSON.parse(documents.find(item => parseInt(item.id) === parseInt(target.value)).doc)
        writeDocument(template);
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
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        </form>
    );
};
