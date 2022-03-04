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
export const Functionary = ({functionaries, fetchFunctionary}) => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);

    

    return (
        <>
            <FunctionaryCreate
                handleInputChange={handleInputChange}
                fetchFunctionary={fetchFunctionary}
                values={values}
                reset={reset}
            />
            <div className="px-3 "><hr/></div>
            <FunctionaryList
                functionaries={functionaries}
            />
        </>
    );
};
