//@ts-check
/* global Word */
import React, { useEffect, useState } from 'react';
import { useForm } from 'src/hooks/useForm';
import { parametersOfDocuments } from './functions/parametersOfDocuments';

const initialState ={};

const HomeOtherDocument = () => {

    const [controls, setControls] = useState([]);
    const [values, setValues, handleInputChange, reset] = useForm(initialState);

    console.log(values);

    useEffect(() => {
        parametersOfDocuments().then((result) => {
            setControls(result);
        });
    }, []);

    /**
     * 
     * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e  
     */
    const handleSetToDocument = (e) => {
        e.preventDefault();

        Word.run(async (context) => {
            const control = context.document.body.contentControls;

            context.load(control);

            await context.sync();

            Object.entries(values).map((entry, index) => {
                const [key, value] = entry;

                control?.items[index].insertText(value, "Replace");
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
                                    value={values[control.tag] ||""}
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
