import React from 'react';
import Swal from 'sweetalert2';
import { globals } from '../../globals';

export const SelectMemoOrNotes = ({setMemoOrNoteState}) => {

    const insertDoc = async (memoOrNotes) => {

        const response = await fetch(`${globals.apiUrl}?action=get_type&type=${memoOrNotes}`, {})

        if (response.ok) {
            const result = await response.json();
            if (result) {
                Word.run(function (context) {

                    const body = context.document.body;
                    
                    body.clear();
                    body.insertOoxml(result.doc.toString(), Word.InsertLocation.start);

                    return context.sync().then(function () {
                        Swal.fire(
                            "Hecho",
                            "Documento cargado satisfactoriamente",
                            "success"
                        )
                    });
                })
            } else {
                Swal.fire(
                    "Oops!!!",
                    "Documento no encontrado o no existe",
                    "warning"
                )
            }
        }
    };

    const handleSelectChange = ({ target }) => {
        insertDoc(target.value)
        setMemoOrNoteState(target.value)
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
                    <option value="0">Seleccione ¿memo o nota?</option>
                    <option value="1">Memo</option>
                    <option value="2">Nota</option>
                </select>
            </div>
        </form>
    );
};
