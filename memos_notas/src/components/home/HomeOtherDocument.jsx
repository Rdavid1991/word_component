//@ts-check
/* global Word */
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { useForm } from 'src/hooks/useForm';

const initialState = {};

const HomeOtherDocument = () => {


    const [values, setValues, handleInputChange, reset] = useForm(initialState);

    const { controls } = useContext(context);
    console.log(controls);

    /**
     * @param {React.ChangeEvent<HTMLFormElement>} e  
     */
    const handleSetToDocument = (e) => {
        e.preventDefault();

        Word.run(async (context) => {
            const control = context.document.body.contentControls;

            context.load(control);

            await context.sync();

            Object.entries(values).map((entry) => {
                const [key, value] = entry;
                const item = control?.items.find(item => item.tag === key);
                item.insertText(value, "Replace");
            });

        });
    };


    return (
        <>
            <form onSubmit={handleSetToDocument}>
                {
                    controls.map((control, index) => (
                        <div key={index} className="mb-3">
                            <label htmlFor={control.tag} className="form-label fw-bold">{control.title}</label>
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
                <button type="submit">guardar</button>
            </form>
        </>
    );
};

export default React.memo(HomeOtherDocument);
