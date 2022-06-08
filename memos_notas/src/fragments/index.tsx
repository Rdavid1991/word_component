import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { DepartmentSchema, TemplateInfoSchema } from 'src/helpers/interface';
import { getLocalStorageUserDepartment } from 'src/utils';

interface Props {
    values: TemplateInfoSchema,
    departments: Array<DepartmentSchema>,
    handleInputChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
}

export const SelectDepartment = ({ values, handleInputChange, departments }: Props) => {


    return (
        <>

            {
                getLocalStorageUserDepartment() === 0
                    ?
                        <div className="mb-3">
                            <label htmlFor="owner" className="form-label font-weight-bold">Pertenece a</label>
                            <select id="owner"
                                className="form-control form-control-sm"
                                value={values.department_owner_id}
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

export const Space = ({ height }: { height: number }) => {
    return (<div style={{ height: `${height}rem` }}></div>);
};


interface PropsInput {
    htmlId?: string,
    onChange?: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
    value?: string,
    icon?: string,
    name?: string,
    htmlLabel?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    pattern?: string,
    title?: string,
    type?: HTMLInputTypeAttribute,
    iconHelp?: boolean
    descriptionHelp?: string
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
    type = 'text',
    iconHelp,
    descriptionHelp
}: PropsInput): JSX.Element => {

    return (
        <div className="mb-3">
            {
                htmlLabel.length > 0
                    ?
                        <label
                            htmlFor={htmlId}
                            className="form-label font-weight-bold"
                        > {htmlLabel}
                        </label>
                    : ""
            }
            {
                iconHelp
                    ?
                        <span
                            className='float-right intermitent'
                            data-toggle="tooltip"
                            data-html="true"
                            title={descriptionHelp}>
                            <i className="far fa-question-circle"></i>
                        </span>
                    : ""
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

}: any) => {
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
                    description.length > 0
                        ? <div className="form-text text-danger">{description}</div>
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
export const ButtonSubmit = ({ title }: any) => {
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
export const ButtonReset = ({ title }: any) => {
    return (
        <button
            type="reset"
            className="btn btn-sm btn-secondary mx-1"
        >
            {title}
        </button>
    );
};
