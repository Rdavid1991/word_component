import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import moment from 'moment';
import 'moment/locale/es-us';
import { globals } from '../../globals';
moment.locale("es")

const initialState = {
    to: "",
    subject: "",
    from: ""
}

export const MemoAndNotesForm = ({ addresseeState }) => {


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
        if (form.from.length > 0 && form.from.length > 0 && form.from.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [form]);


    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.id]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Word.run((context) => {
            const numControl = context.document.body.contentControls.getByTag("num");
            const yearControl = context.document.body.contentControls.getByTag("year");
            const subjectControl = context.document.body.contentControls.getByTag("subject");
            const dateControl = context.document.body.contentControls.getByTag("date");
            const addresseeNameControl = context.document.body.contentControls.getByTag("addresseeName");
            const addresseeJobTitle = context.document.body.contentControls.getByTag("addresseeJobTitle");

            context.load(numControl)
            context.load(yearControl)
            context.load(subjectControl)
            context.load(dateControl)
            context.load(addresseeNameControl)
            context.load(addresseeJobTitle)

            return context.sync().then(async () => {
                if (numControl.items.length > 0 &&
                    yearControl.items.length > 0 &&
                    subjectControl.items.length > 0 &&
                    dateControl.items.length > 0
                ) {
                    const response = await fetchData();
                    if (response) {
                        console.log(response.id.toString());
                        numControl.items[0].insertText(response.id.toString(), "Replace");
                        yearControl.items[0].insertText("2022", "Replace");
                        subjectControl.items[0].insertText(form.subject, "Replace");
                        dateControl.items[0].insertText(moment().format('LL'), "Replace");
                        addresseeNameControl.items[0].insertText(addresseeState[form.to].name,"Replace")
                        addresseeJobTitle.items[0].insertText(addresseeState[form.to].jobTitle,"Replace")

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
                } else {
                    Swal.fire(
                        'Hay un problema',
                        'Las variables no están definidas, cargue la plantilla correcta o cree las variables',
                        'error'
                    )
                }
            })

        })
    }

    const fetchData = async () => {

        const formdata = new FormData()
        formdata.append("dirigido", form.to)
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
                            value={form.to}
                            className="form-select form-select-sm"
                            id="to"
                            placeholder="A quien a dirigido"
                            required={true}
                            onChange={handleInputChange}
                        >
                            
                            {
                                addresseeState.map((item, index) => (
                                    <option value={index}>{item.department}</option>
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
