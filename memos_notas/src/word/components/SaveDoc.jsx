import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { globals } from '../../globals';

export const SaveDoc = () => {

    const handleSaveDoc = (saveMemoOrNotes) => {

        Swal.fire({
            title: 'Esta seguro(a)?',
            text: `Va a sobrescribir ${saveMemoOrNotes === 1 ? "un memo" : "una nota"} este cambio no se puede revertir`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, hacerlo'
        }).then((result) => {
            if (result.isConfirmed) {
                Word.run((context) => {

                    const body = context.document.body
                    const docBody = body.getOoxml()
                    const docFooter = context.document.sections.getFirst().getFooter("Primary").getOoxml()
                    const docHeader = context.document.sections.getFirst().getHeader("Primary").getOoxml()
                    return context.sync().then(async () => {

                        Swal.fire(await saveDoc(docBody.value, docFooter.value, docHeader.value, saveMemoOrNotes))

                    })
                })
            }
        })

    };

    const saveDoc = async (docBody, docFooter, docHeader, type) => {

        const formdata = new FormData()
        formdata.append("body", docBody)
        formdata.append("footer", docFooter)
        formdata.append("header", docHeader)
        formdata.append("type", type)
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
