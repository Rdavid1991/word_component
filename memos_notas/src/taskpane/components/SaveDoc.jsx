import React, { useState,useEffect } from 'react';

export const SaveDoc = () => {

    const handleSaveDoc = (saveMemoOrNotes) => {
        Word.run((context) => {

            const body = context.document.body

            const bodyHtml = body.getOoxml()

            console.log("fallo");
            return context.sync().then(() => {
                saveDoc(bodyHtml.value, saveMemoOrNotes)
            })
        })
    };

    const saveDoc = async (docXml, type) => {

        const formdata = new FormData()
        formdata.append("document", docXml)
        formdata.append("type", type)
        var requestOptions = {
            method: 'POST',
            body: formdata
        };

        let response = await fetch(`http://172.20.70.46:8080/api/`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
        return false
    }

    return (
        <>
            <button
                onClick={() => handleSaveDoc(2)}
            >Guardar plantilla de notas</button>
            <button
                onClick={() => handleSaveDoc(1)}
            >Guardar plantilla de Memos</button>
        </>
    );
};
