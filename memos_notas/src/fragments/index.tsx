import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { DepartmentSchema } from 'src/interface';
import { getLocalStorageUserDepartment } from 'src/utils';

export const SelectDepartment = ({ values, handleInputChange, departments }) => {

    return (
        <>

            {
                getLocalStorageUserDepartment() === 0 ?
                    <div className="mb-3">
                        <label htmlFor="owner" className="form-label font-weight-bold">Pertenece a</label>
                        <select id="owner"
                            className="form-control form-control-sm"
                            value={values?.owner || ""}
                            onChange={handleInputChange}
                            required
                        >
                            <option disabled value="">Seleccione</option>
                            {
                                departments.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    : null

            }
        </>
    );

};

export const Space = ({ height }) => {
    return (<div style={{ height: `${height}rem` }}></div>);
};


interface PropsInput {
    htmlId?: string,
    onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
    value: string,
    icon?: string,
    name?: string,
    htmlLabel?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    pattern?: string,
    title?: string,
    type?: HTMLInputTypeAttribute
}
export const InputText = ({
    htmlId = "",
    onChange,
    value = "",
    icon = "",
    name = "",
    htmlLabel = "",
    placeholder = "Escribir aquí",
    required = false,
    disabled = false,
    pattern = null,
    title = null,
    type = 'text'
}: PropsInput): JSX.Element => {

    return (
        <div className="mb-3">
            {
                htmlLabel.length > 0 ? <label htmlFor={htmlId} className="form-label font-weight-bold">{htmlLabel}</label> : ""
            }
            <div className="input-group mb-3">
                {
                    icon.length > 0 ? <span className="input-group-text"><i className={icon}></i></span> : ""
                }
                <input
                    type={type}
                    autoComplete="off"
                    className="form-control form-control-sm"
                    id={htmlId}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    onChange={onChange}
                    value={value}
                    name={name}
                    pattern={pattern}
                    title={title}
                />
            </div>
        </div>
    );
};

/**
 * 
 * @param {Object} props
 * @param {string} props.id
 * @param {string=} props.icon
 * @param {string} props.value
 * @param {string} props.label
 * @param {string=} props.description
 * @param {Boolean=} props.required
 * @param {Object<string,string>[]} props.options
 * @param {Function} props.handleInputChange
 * @returns 
 */
export const SelectOptions = ({
    id,
    icon = "",
    value,
    label,
    options,
    description = "",
    required = false,
    handleInputChange,

}) => {
    return (
        <div className="mb-3">
            <label
                htmlFor={id}
                className="font-weight-bold form-label"
            >
                {label}
            </label>
            <div className="input-group mb-3">
                {
                    icon.length > 0 ? <span className="input-group-text"><i className={icon}></i></span> : ""
                }
                <select
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                    required={required}
                >
                    <option value="">Seleccione una opción</option>
                    {
                        options.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
                {
                    description.length > 0 ?
                        <div className="form-text">{description}</div>
                        : ""
                }
            </div>
        </div>
    );
};

/* Botones */

/**
 * 
 * @param {Object} prop 
 * @param {string} prop.title 
 * @returns 
 */
export const ButtonSubmit = ({ title }) => {
    return (
        <button
            type="submit"
            className="btn btn-sm btn-secondary mx-1"
        >
            {title}
        </button>
    );
};

/**
 * 
 * @param {Object} prop 
 * @param {string} prop.title 
 * @returns 
 */
export const ButtonReset = ({ title }) => {
    return (
        <button
            type="reset"
            className="btn btn-sm btn-secondary mx-1"
        >
            {title}
        </button>
    );
};
