//@ts-check
import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from './functions';
import { context } from 'src/context/context';
import { getLocalStorageUserName } from 'src/utils';
import { useForm } from 'src/hooks/useForm';
import { AlertError, AlertSuccess, AlertWarning } from 'src/utils/Alerts';
import { InputText, SelectOptions } from 'src/fragments';
import { SendDataToDocument } from './functions/SendDataToDocument';
import MultiSelect from './fragment/MultiSelect';


const initialState = {
    to         : "",
    cc         : [],
    subject    : "",
    functionary: "",
    from       : getLocalStorageUserName()
};

/**
 * 
 * @param {Object} props
 * @param {Object[]} props.functionaries
 * @param {String} props.functionaries.id
 * @param {String} props.functionaries.name
 * @param {String} props.functionaries.id_card
 * @param {String} props.functionaries.job_title
 * @param {String} props.functionaries.position_number
 * @param {any} props.addresseeState
 * @param {any} props.memoOrNoteState
 * @param {any} props.fetchNumbers
 * @param {any} props.setSelectedState
 * 
 * @returns 
 */
const HomeGenerateDocument = ({ functionaries, addresseeState, memoOrNoteState, fetchNumbers, setSelectedState }) => {

    const { showLoader } = useContext(context);

    const [form, setForm, handleInputChange, reset] = useForm(initialState);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [select, setSelect] = useState(false);

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

                const functionaryFound = functionaries.find((f) => parseInt(f.id) === parseInt(form.functionary));


                SendDataToDocument.SendDataToMemoOrNote(addresseeState, data[0].consecutive, form, functionaryFound)
                    .then(() => {
                        AlertSuccess('La información esta lista');
                        setSelectedState("");
                    })
                    .catch((err) => {
                        AlertError("No se puede editar el documento" + err,);
                    });
            } else {
                await AlertError('Error al consultar base de datos o no existen registros');
            }
            showLoader(false);

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
            <SelectOptions
                icon="fas fa-users"
                id="functionary"
                handleInputChange={handleInputChange}
                label="Funcionario"
                value={form.functionary}
                options={functionaries}
                description="Opcional, seleccionar en caso de que la plantilla incluya al funcionario"
            />
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
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={select} onChange={({ target }) => setSelect(target.checked)} />
                    <label  className="form-check-label fw-bold" >
                        Con copia
                    </label>
                </div>
            </div>


            {
                select ?
                    <MultiSelect
                        options={addresseeState}
                        optionsLabel="department"
                        id="cc"
                        value={form.cc}
                        required={true}
                        onChange={handleInputChange}
                    />
                    : null
            }

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