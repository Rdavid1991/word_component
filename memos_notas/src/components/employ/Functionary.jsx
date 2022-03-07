import React from 'react';
import { useForm } from 'src/hooks/useForm';
import { FunctionaryCreate } from './FunctionaryCreate';
import { FunctionaryList } from './FunctionaryList';

const initialState = {
    name    : "",
    idCard  : "",
    jobTitle: "",
    position: ""
};
export const Functionary = ({ functionaries, fetchFunctionary }) => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);



    return (
        <>
            <div className="w-100 px-3">
                <h3 className="fw-bold text-truncate">Funcionarios</h3>
                <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar funcionarios para plantillas</p>
            </div>
            <div className="functionary_pane h-100">
                <FunctionaryCreate
                    handleInputChange={handleInputChange}
                    fetchFunctionary={fetchFunctionary}
                    values={values}
                    reset={reset}
                />
                <div className="px-3 "><hr /></div>
                <FunctionaryList
                    functionaries={functionaries}
                />
            </div>
        </>
    );
};
