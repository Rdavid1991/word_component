import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { loadWordVars } from './functions';
import { localStorageKeyUser } from '../../utils';

const initialState = {
    to: "",
    subject: "",
    from: ""
}

export const MemoAndNotesForm = ({ addresseeState, memoOrNoteState, fetchNumbers }) => {

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

        setForm({
            ...form,
            from: localStorage.hasOwnProperty(localStorageKeyUser)
                ? JSON.parse(localStorage.getItem(localStorageKeyUser)).user
                : ""
        })

    }, [form,addresseeState]);


    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.id]: target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(memoOrNoteState) > 0) {
            await loadWordVars(addresseeState, memoOrNoteState, form)
            fetchNumbers()
            setForm(initialState);
        } else {
            Swal.fire(
                "Debe seleccionar",
                "Es memo o nota?",
                "question"
            )
        }
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
                            <option value="">Seleccione un destinatario</option>
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
                            disabled
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

MemoAndNotesForm.prototype = {
    addresseeState: PropTypes.array.isRequired,
    memoOrNoteState: PropTypes.string.isRequired,
    fetchNumbers: PropTypes.func.isRequired,
}