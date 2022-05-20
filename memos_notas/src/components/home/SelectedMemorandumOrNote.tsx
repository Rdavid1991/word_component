import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { fetchData } from './functions';
import { context } from 'src/context/context';
import { getLocalStorageUserName } from 'src/utils';
import { useForm } from 'src/hooks/useForm';
import { AlertError, AlertSuccess, AlertWarning } from 'src/utils/Alerts';
import { InputText, SelectOptions } from 'src/fragments';
import { SendDataToDocument } from './functions/SendDataToDocument';
import MultiSelect from './fragment/MultiSelect';
import { AddresseesSchema, FunctionarySchema, SelectedMemorandumOrNoteState } from 'src/interface';



const initialState = {
    to: NaN,
    subject: "",
    functionary: "",
    cc: [],
    from: getLocalStorageUserName(),
    hasCopy: false
};



interface Props {
    functionaries: Array<FunctionarySchema>,
    addressee: Array<AddresseesSchema>,
    memoOrNoteState: any,
    fetchNumbers: () => void,
    setSelectedState: (select: string) => void
}



const SelectedMemorandumOrNote = ({ functionaries, addressee, memoOrNoteState, fetchNumbers, setSelectedState }: Props): JSX.Element => {

    const [form, setForm, handleInputChange, reset] = useForm<SelectedMemorandumOrNoteState>(initialState);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (!isNaN(form.to) && form.subject.length > 0 && form.from.length > 0) {
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
    }, [addressee]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(memoOrNoteState) > 0) {
            //showLoader(true);

            const { data } = await fetchData(addressee, memoOrNoteState, form);

            if (data.length > 0) {

                const functionaryFound = functionaries.find((f) => parseInt(f.id) === parseInt(form.functionary));


                SendDataToDocument.SendDataToMemoOrNote(addressee, data[0].consecutive, form, functionaryFound)
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
            //showLoader(false);

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
                <label htmlFor="to" className="form-label font-weight-bold">Dirigido a</label>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="far fa-paper-plane"></i></span>
                    <select
                        value={form.to}
                        className="form-control form-control-sm"
                        id="to"
                        placeholder="A quien a dirigido"
                        required={true}
                        onChange={handleInputChange}
                    >
                        <option disabled value="">Seleccione un destinatario</option>
                        {
                            addressee.map((item, index) => (
                                <option key={index} value={index}>{item.department}</option>
                            ))
                        }

                    </select>
                </div>
            </div>

            <div className="mb-3">
                <div className="form-check">
                    <input className="form-check-input"
                        type="checkbox"
                        value=""
                        id="hasCopy"
                        checked={form.hasCopy}
                        onChange={handleInputChange} />
                    <label className="form-check-label font-weight-bold" >
                        Con copia
                    </label>
                </div>
            </div>


            {
                form.hasCopy ?
                    <MultiSelect
                        options={addressee}
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
                name={''} />
            <InputText
                htmlId="from"
                onChange={handleInputChange}
                value={form.from}
                htmlLabel={"Solicitado por"}
                icon={"fas fa-user-edit"}
                placeholder="Quien lo solicita"
                required={true}
                disabled={true}
                name={''} />
            <button
                type="submit"
                className="btn btn-sm btn-secondary"
                disabled={buttonDisabled}
            >
                Enviar
            </button>
        </form>

    );
};

export default React.memo(SelectedMemorandumOrNote);