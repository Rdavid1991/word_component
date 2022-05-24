//@ts-check
/* global Word */
import React, { ChangeEvent, useContext } from 'react';
import { context } from 'src/context/context';
import { useForm } from 'src/hooks/useForm';

const initialState = {};

const SelectedOtherDocument = () => {

    const [values, setValues, handleInputChange, reset]: any = useForm(initialState);

    const { controls } = useContext(context);

    const handleSetToDocument = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        Word.run(async (context) => {
            const control = context.document.body.contentControls;

            context.load(control);

            await context.sync();

            Object.entries(values).map((entry) => {
                const [key, value]: any = entry;
                const item = control?.items.find(item => item.tag === key);
                item.insertText(value, "Replace");
                return null;
            });
        });
    };

    return (
        <>
            {
                controls.length > 0
                    ?
                    <form onSubmit={handleSetToDocument}>
                        {
                            controls.map((control, index) => (
                                <div key={index} className="mb-3">
                                    <label htmlFor={control.tag} className="form-label font-weight-bold">{control.title}</label>
                                    <div className="input-group mb-3">

                                        <span className="input-group-text"><i className="far fa-keyboard"></i></span>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id={control.tag}
                                            placeholder={control.title}
                                            required={true}
                                            onChange={handleInputChange}
                                            value={values[control.tag] || ""}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        <button className="btn btn-sm btn-success" type="submit">Enviar</button>
                    </form>
                    :
                    <h2 className="text-center">Esta plantilla no cuenta con variables</h2>
            }
        </>
    );
};

export default React.memo(SelectedOtherDocument);
