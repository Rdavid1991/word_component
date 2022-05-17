import { useState } from 'react';

/**
 * 
 * @param {*} initialState estado inicial 
 * @returns {array} [values, setValues, handleInputChange, reset]
 */
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target }) => {
      
        if (target.tagName === 'SELECT' && target.multiple) {
            let selected = [];
            for (let option of target.selectedOptions) {
                selected.push(option.value);
            }
            setValues({
                ...values,
                [target.name || target.id]: selected
            });

        }else if (target.tagName === 'INPUT' && target.type === "checkbox") {
            setValues({
                ...values,
                [target.name || target.id]: target.checked
            });
        }else{
            setValues({
                ...values,
                [target.name || target.id]: target.value
            });
        }
    };

    return [values, setValues, handleInputChange, reset];
};