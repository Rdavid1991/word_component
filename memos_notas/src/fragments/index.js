import React from 'react';
import { getLocalStorageUserDepartment } from 'src/utils';

/**
     * Solo se muestra si tiene acceso para crear plantillas para otros
     * @returns 
     */
export const renderSelectDepartment = (values, handleInputChange, department) => {

    if (getLocalStorageUserDepartment() == "0") {

        return (
            <div className="mb-3">
                <label htmlFor="owner" className="form-label font-weight-bold">Pertenece a</label>
                <select id="owner"
                    className="form-control form-control-sm"
                    value={values?.owner || ""}
                    onChange={handleInputChange}
                    required
                >
                    <option disabled value="">Seleccione un departamento</option>
                    {
                        department.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        );
    } else {
        return null;
    }
};

export const Space = ({ height }) => {
    return (<div style={{ height: `${height}rem` }}></div>);
};


/**
 * @component
 * @param {Object} props 
 * @param {String} props.htmlId 
 * @param {Function} props.onChange
 * @param {String} props.value
 * @param {String=} props.htmlLabel 
 * @param {String=} props.icon fontAwesome class
 * @param {String=} props.name fontAwesome class
 * @param {String=} props.placeholder
 * @param {boolean=} props.required
 * @param {boolean=} props.disabled
 * @param {String=} props.pattern
 * @param {String=} props.title
 * @returns 
 */
export const InputText = ({
    htmlId,
    onChange,
    value,
    icon = "",
    name = "",
    htmlLabel = "",
    placeholder = "Escribir aquí",
    required = false,
    disabled = false,
    pattern = null,
    title = null
}) => {

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
                    type="text"
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
 * @param {String} props.id
 * @param {String=} props.icon
 * @param {String} props.value
 * @param {String} props.label
 * @param {String=} props.description
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
 * @param {String} prop.title 
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
 * @param {String} prop.title 
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
