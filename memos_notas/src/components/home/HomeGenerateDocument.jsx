//@ts-check
import React, { useContext, useEffect, useState } from 'react';
import { fetchData, loadWordVars } from './functions';
import { context } from 'src/context/context';
import { getLocalStorageUserName } from 'src/utils';
import { useForm } from 'src/hooks/useForm';
import { AlertError, AlertSuccess, AlertWarning } from 'src/utils/Alerts';


const initialState = {
    to: "",
    subject: "",
    from: getLocalStorageUserName()
};
const HomeGenerateDocument = ({ addresseeState, memoOrNoteState, fetchNumbers }) => {

    const { showLoader } = useContext(context);
    /**
     * addresseeState structure
     *  {
     *      "id": 1,
     *      "name": "",
     *      "jobTitle": "",
     *      "archetype": "",
     *      "department": ""
     *  }
     */

    const [form, setForm, handleInputChange, reset] = useForm(initialState);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (form.to.length > 0 && form.subject.length > 0 && form.from.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [form]);

    useEffect(() => {
        setForm({
            ...form,
            from: getLocalStorageUserName()
        });
    }, [addresseeState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(memoOrNoteState) > 0) {
            showLoader(true);

            const { data } = await fetchData(addresseeState, memoOrNoteState, form);

            if (data.length > 0) {
                showLoader(false);
                loadWordVars(addresseeState, data[0].id, form)
                    .then(() => {
                        AlertSuccess('La información esta lista');
                    })
                    .catch((err) => {
                        AlertError("No se puede editar el documento" + err,);
                    });
            } else {
                showLoader(false);
                await AlertError('Error al consultar base de datos o no existen registros');
            }

            fetchNumbers();
            reset();
        } else {
            await AlertWarning("Es memo o nota?");
        }
    };

    return (

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
                        <option disabled value="">Seleccione un destinatario</option>
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

    );
};

export default React.memo(HomeGenerateDocument);