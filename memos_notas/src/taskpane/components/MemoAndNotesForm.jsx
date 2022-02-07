import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import moment from 'moment';
import 'moment/locale/es-us';
import { globals } from '../../globals';
import { isMemo } from '../utils';
moment.locale("es")

const initialState = {
    to: "",
    subject: "",
    from: ""
}

export const MemoAndNotesForm = ({ addresseeState, memoOrNoteState }) => {

    /**
     * addresseeState structure
     *  {
     *      "id": 1,
     *      "name": "asd",
     *      "jobTitle": "asd",
     *      "archetype": "asd",
     *      "department": "asdd"
     *  }
     */

    const [form, setForm] = useState(initialState);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (form.to.length > 0 && form.subject.length > 0 && form.from.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [form]);


    const handleInputChange = ({ target }) => {
        console.log(target.value);
        setForm({
            ...form,
            [target.id]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Word.run((context) => {
            /**
             * Obtener variables dinámicas
             */
            const numMemoOrNoteControl = context.document.body.contentControls.getByTag(
                isMemo(memoOrNoteState)
                    ? "num_memo"
                    : "num_note"
            );
            const yearControl = context.document.body.contentControls.getByTag("year");
            const dateControl = context.document.body.contentControls.getByTag("date");

            /**
             * Obtener variables del memo o nota
             */
            const requestControl = context.document.body.contentControls.getByTag("request");
            const subjectControl = context.document.body.contentControls.getByTag("subject");

            /**
             * Obtener variables de destinatario
             */
            const addresseeNameControl = context.document.body.contentControls.getByTag("addressee_name");
            const addresseeJobTitleControl = context.document.body.contentControls.getByTag("addressee_job_title");
            const addresseeArchetypeControl = context.document.body.contentControls.getByTag("addressee_archetype");
            const addresseeDepartmentControl = context.document.body.contentControls.getByTag("addressee_department");

            /**
             * Cargar variables dinamicas
             */
            context.load(numMemoOrNoteControl)
            context.load(yearControl)
            context.load(dateControl)

            /**
             * Cargar variables de memo o notas
             */
            context.load(requestControl)
            context.load(subjectControl)

            /**
             * Cargar variables destinatario
             */
            context.load(addresseeNameControl)
            context.load(addresseeJobTitleControl)
            context.load(addresseeArchetypeControl)
            context.load(addresseeDepartmentControl)

            return context.sync().then(async () => {

                const response = await fetchData();
                if (response) {

                    /**
                     * insertar texto variables dinámicas
                     */
                    numMemoOrNoteControl.items[0]?.insertText(response.id.toString(), "Replace");
                    yearControl.items[0]?.insertText(moment().year(), "Replace");
                    dateControl.items[0]?.insertText(moment().format('LL'), "Replace");

                    /**
                     * insertar texto variables memos o notas
                     */
                    subjectControl.items[0]?.insertText(form.subject, "Replace");
                    requestControl.items[0]?.insertText(form.from, "Replace")

                    /**
                     * insertar texto variables destinatario
                     */
                    addresseeNameControl.items[0]?.insertText(addresseeState[form.to].name, "Replace")
                    addresseeJobTitleControl.items[0]?.insertText(addresseeState[form.to].jobTitle, "Replace")
                    addresseeArchetypeControl.items[0]?.insertText(addresseeState[form.to].archetype, "Replace")
                    addresseeDepartmentControl.items[0]?.insertText(addresseeState[form.to].department, "Replace")

                    Swal.fire(
                        'Hecho',
                        'La información esta lista',
                        'success'
                    )

                    setForm(initialState);
                } else {
                    Swal.fire(
                        'Hay un problema',
                        'Error al consultar base de datos',
                        'error'
                    )
                }
            })

        })
    }

    const fetchData = async () => {

        const formdata = new FormData()
        formdata.append("dirigido", addresseeState[form.to].department)
        formdata.append("asunto", form.subject)
        formdata.append("solicitado", form.from)
        var requestOptions = {
            method: 'POST',
            body: formdata
        };

        let response = await fetch(`${globals.apiUrl}?action=set_number`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
        return false
    }

    return (
        <>
            <form className='px-2' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="to" className="form-label fw-bold">Dirigido a</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="far fa-paper-plane"></i></span>
                        <select
                            defaultValue={form.to}
                            className="form-select form-select-sm"
                            id="to"
                            placeholder="A quien a dirigido"
                            required={true}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Seleccione un destinatario</option>
                            {
                                addresseeState.map((item, index) => (
                                    <option key={index} value={index}>{item.department}</option>
                                ))
                            }

                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-bold">Asunto</label>
                    <div className="input-group mb-3">

                        <span className="input-group-text"><i className="fas fa-comments"></i></span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="subject"
                            placeholder="Asunto"
                            required={true}
                            onChange={handleInputChange}
                            value={form.subject}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="from" className="form-label fw-bold">Solicitado por</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-user-edit"></i></span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="from"
                            placeholder="Quien lo solicita"
                            required={true}
                            onChange={handleInputChange}
                            value={form.from}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-secondary"
                    disabled={buttonDisabled}
                >
                    Guardar
                </button>
            </form>
        </>
    );
};
