import { ChangeEvent, useState } from 'react';




export const useForm = <TypeSchema>(initialState: TypeSchema): [TypeSchema, (state: TypeSchema) => void, (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, () => void] => {

    const [values, setValues] = useState<TypeSchema>(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target }) => {

        if (target.tagName === 'SELECT' && target.multiple) {
            const selected = [];
            for (const option of target.selectedOptions) {
                selected.push(option.value);
            }
            setValues({
                ...values,
                [target.name || target.id]: selected
            });

        } else if (target.tagName === 'INPUT' && target.type === "checkbox") {
            setValues({
                ...values,
                [target.name || target.id]: target.checked
            });
        } else {
            setValues({
                ...values,
                [target.name || target.id]: target.value
            });
        }
    };

    return [values, setValues, handleInputChange, reset];
};