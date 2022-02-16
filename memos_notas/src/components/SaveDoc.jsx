//@ts-check
import React, { useContext } from 'react';
import { LoaderContext } from 'src/context/context';
import { globals } from 'src/globals';
import Swal from 'sweetalert2';


export const SaveDoc = () => {

    const setLoader = useContext(LoaderContext)

    /**
     * Preparar el documento y sus partes para guardarlo
     * @param {number} saveMemoOrNotes - Numero de tipo de documento 1 = memo, 2 = nota
     */
    const handleSaveDoc = (saveMemoOrNotes) => {



        

    };

    /**
     * Guardar documento
     * @param {string} docBody - Cuerpo del documento
     * @param {string} docFooter - Pie de pagina del documento
     * @param {string} docHeader - Encabezado de documento
     * @param {number} type 
     * @returns 
     */
    const saveDoc = async (docBody, docFooter, docHeader, type) => {

        const formdata = new FormData()
        formdata.append("body", docBody)
        formdata.append("footer", docFooter)
        formdata.append("header", docHeader)
        formdata.append("type", String(type))
        var requestOptions = {
            method: 'POST',
            body: formdata
        };

        let response = await fetch(`${globals.apiUrl}?action=save_document`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
        return false
    }

    return (
        <>
            <div className="px-2">
                <h3 className="text-center fw-bold">Crear o guardar plantilla</h3>
                <div className="row mb-4">
                    <button
                        className="btn btn-success"
                        onClick={() => handleSaveDoc(2)}
                    >Guardar plantilla de notas</button>
                </div>
                <div className="row">
                    <button
                        className="btn btn-success"
                        onClick={() => handleSaveDoc(1)}
                    >Guardar plantilla de Memos</button>
                </div>
            </div>
        </>
    );
};
