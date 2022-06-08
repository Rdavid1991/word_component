import React, { ChangeEvent, FormEvent, useEffect, useState, useContext } from 'react';
import { getLocalStorageUserName } from 'src/utils';
import { useForm } from 'src/hooks/useForm';
import { InputText } from 'src/fragments';
import { initialStateSelectedMemorandumOrNote } from 'src/helpers/states/states';
import { FetchContext } from '../../context/context';
import { AddresseesSchema } from 'src/helpers/interface';
import { selectedNoteSubmit } from '../../helpers/functions/selectedNoteSubmit';

interface Props {
    setSelectedState: (select: string) => void
}

interface PropsHasCopy {
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void
    addressee: Array<AddresseesSchema>
}

const HasCopy = ({ addressee, handleSelectChange }: PropsHasCopy) => {
    return (
        <div className="mb-3">
            <label htmlFor="cc" className="form-label font-weight-bold">Con copia a</label>
            <div className="input-group mb-3">
                <span className="input-group-text">
                    <i className="far fa-paper-plane"></i>
                </span>
                <select
                    onChange={handleSelectChange}
                    className="form-control form-control-sm selectpicker"
                    id="cc"
                    required={true}
                    data-selected-text-format="count"
                    title='No hay nada seleccionado'
                    multiple
                >
                    {
                        addressee.map((item, index) => (
                            <option className="w-100" key={index} value={index}>{item.department}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

const SelectedNote = ({ setSelectedState }: Props): JSX.Element => {

    const { data } = useContext(FetchContext)
    const { addressee, functionaries } = data;

    const [form, setForm, handleInputChange, reset] = useForm<typeof initialStateSelectedMemorandumOrNote>(initialStateSelectedMemorandumOrNote);
    const [buttonDisabled, setButtonDisabled] = useState(true);


    useEffect(() => {
        if (!isNaN(form.to) && form.subject.length > 0 && form.from.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [form]);

    useEffect(() => {
        $("#cc").selectpicker("refresh")
    }, [form.hasCopy]);

    useEffect(() => {
        setForm({
            ...form,
            from: getLocalStorageUserName()
        });
    }, [addressee]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        selectedNoteSubmit(functionaries, addressee, form, setSelectedState);
        reset();
    }

    const handleSelectChange = ({ currentTarget }: ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            cc: $(currentTarget).val() as Array<string>
        })
    }

    return (

        <form
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label htmlFor="to" className="form-label font-weight-bold">Dirigido a</label>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="far fa-paper-plane"></i></span>
                    <select
                        value={isNaN(form.to) ? "" : form.to}
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
                        onChange={() => setForm({ ...form, hasCopy: !form.hasCopy })} />
                    <label className="form-check-label font-weight-bold" >
                        Con copia
                    </label>
                </div>
            </div>

            {
                form.hasCopy
                    ? <HasCopy {...{ addressee, handleSelectChange }} />
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

export default React.memo(SelectedNote);