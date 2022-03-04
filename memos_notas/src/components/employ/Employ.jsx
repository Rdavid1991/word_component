import React from 'react';
import { useForm } from 'src/hooks/useForm';
import { EmployCreate } from './EmployCreate';
import { EmployList } from './EmployList';

const initialState = {
    name    : "",
    idCard  : "",
    jobTitle: "",
    position: ""
};
export const Employ = () => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);

    

    return (
        <>
            <EmployCreate
                handleInputChange={handleInputChange}
                values={values}
                reset={reset}
            />
            <div className="px-3"><hr/></div>
            <EmployList />
        </>
    );
};
