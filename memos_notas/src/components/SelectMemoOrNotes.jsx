import React, { useContext } from 'react';
import { LoaderContext } from 'src/context/context';
import { globals } from 'src/globals';
import Swal from 'sweetalert2';



export const SelectMemoOrNotes = ({ setMemoOrNoteState }) => {

    const setLoader = useContext(LoaderContext)

    const insertDoc = async (memoOrNotes) => {
        setLoader(true)
        const response = await fetch(`${globals.apiUrl}?action=get_type&type=${memoOrNotes}`, {})

        if (response.ok) {
            const result = await response.json();
            if (result) {


                Word.run(function (context) {

                    const body = context.document.body;
                    const header = context.document.sections.getFirst().getHeader("Primary");
                    const footer = context.document.sections.getFirst().getFooter("Primary");

                    body.clear();
                    header.clear();
                    footer.clear();

                    body.insertOoxml(JSON.parse(result.doc).body.toString(), Word.InsertLocation.start);
                    header.insertOoxml(JSON.parse(result.doc).header.toString(), Word.InsertLocation.start);
                    footer.insertOoxml(JSON.parse(result.doc).footer.toString(), Word.InsertLocation.start);

                    return context.sync().then(function () {
                        setLoader(false)
                        Swal.fire(
                            "Hecho",
                            "Documento cargado satisfactoriamente",
                            "success"
                        )
                    }).catch((error) => {
                        setLoader(false)
                        Swal.fire(
                            "Hecho",
                            "No se puede cargar documento, revise si el documento actual no tiene controles bloqueados. " + error,
                            "error"
                        )
                    });
                })
            } else {
                setLoader(false)
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
