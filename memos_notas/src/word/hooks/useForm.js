import { useState } from 'react';

/**
 * 
 * @param {*} initialState estado inicial 
 * @returns {array} [values, handleInputChange, reset]
 */
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name || target.id]: target.value
        });

    }

    return [values, setValues, handleInputChange, reset];
}