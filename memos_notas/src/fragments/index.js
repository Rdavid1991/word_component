import React from 'react';
import { getLocalStorageUserDepartment } from 'src/utils';

/**
     * Solo se muestra si tiene acceso para crear plantillas para otros
     * @returns 
     */
export const renderSelectDepartment = (values, handleInputChange, departmentOwnerState) => {
    if (getLocalStorageUserDepartment() == "0") {

        return (
            <div className="mb-3">
                <label htmlFor="owner" className="form-label fw-bold">Pertenece a</label>
                <select id="owner"
                    className="form-select form-select-sm"
                    value={values?.owner || ""}
                    onChange={handleInputChange}
                    required
                >
                    <option disabled value="">Seleccione un departamento</option>
                    {
                        departmentOwnerState.map((item, index) => (
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

/**
 * @component
 * @param {Object} props 
 * @param {String} props.htmlId 
 * @param {Function} props.onChange
 * @param {String} props.value
 * @param {String=} props.htmlLabel 
 * @param {String=} props.icon fontAwesome class
 * @param {String=} props.placeholder
 * @param {boolean=} props.required
 * @returns 
 */
export const InputText = ({
    htmlId,
    onChange,
    value,
    icon = "",
    htmlLabel = "",
    placeholder = "Escribir aquí",
    required = false
}) => {

    return (
        <div className="mb-3">
            {
                htmlLabel.length > 0 ? <label htmlFor={htmlId} className="form-label fw-bold">{htmlLabel}</label> : ""
            }
            <div className="input-group mb-3">
                {
                    icon.length > 0 ? <span className="input-group-text"><i className={icon}></i></span> : ""
                }
                <input
                    type="text"
                    className="form-control form-control-sm"
                    id={htmlId}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    value={value}
                />
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
export const ButtonSubmit = ({title}) => {
    return (
        <button
            type="submit"
            className="btn btn-sm btn-success mx-1"
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
export const ButtonReset = ({title}) => {
    return (
        <button
            type="reset"
            className="btn btn-sm btn-secondary mx-1"
        >
            {title}
        </button>
    );
};
