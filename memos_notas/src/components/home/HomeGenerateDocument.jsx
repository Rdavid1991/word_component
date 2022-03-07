//@ts-check
import React, { useContext, useEffect, useState } from 'react';
import { fetchData, loadWordVars } from './functions';
import { context } from 'src/context/context';
import { getLocalStorageUserName } from 'src/utils';
import { useForm } from 'src/hooks/useForm';
import { AlertError, AlertSuccess, AlertWarning } from 'src/utils/Alerts';
import { InputText } from 'src/fragments';


const initialState = {
    to     : "",
    subject: "",
    from   : getLocalStorageUserName()
};
const HomeGenerateDocument = ({ addresseeState, memoOrNoteState, fetchNumbers, setSelectedState }) => {

    const { showLoader } = useContext(context);

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
                        setSelectedState("");
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

        <form
            onSubmit={handleSubmit}
        >
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
            <InputText
                htmlId="subject"
                onChange={handleInputChange}
                value={form.subject}
                htmlLabel={"Asunto"}
                icon={"fas fa-comments"}
                placeholder="Asunto"
                required={true}
            />
            <InputText
                htmlId="from"
                onChange={handleInputChange}
                value={form.from}
                htmlLabel={"Solicitado por"}
                icon={"fas fa-user-edit"}
                placeholder="Quien lo solicita"
                required={true}
                disabled={true}
            />
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