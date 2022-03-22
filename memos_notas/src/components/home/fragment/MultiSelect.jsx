import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./MultiSelect.css";


const initialState = {
    target: {
        id   : "cc",
        name : "",
        value: []
    }
};
const CCMultiSelect = props => {

    const { options, optionsLabel, value, id, required = false, onChange } = props;

    const [selected, setSelected] = useState(initialState);
    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const handleChange = (e) => {
        if (e.target.checked) {
            setSelected({
                target: {
                    ...selected.target,
                    value: [
                        ...selected.target.value,
                        e.target.dataset.value
                    ]
                }
            });
        } else {
            setSelected({
                target: {
                    ...selected.target,
                    value: selected.target.value.filter((sel) => sel !== e.target.dataset.value)
                }
            });
        }
    };

    useEffect(() => {
        onChange(selected);
    }, [selected]);


    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label fw-bold">Con copia a</label>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="far fa-paper-plane"></i></span>
                <select
                    readOnly
                    value={value}
                    className="d-none"
                    id={id}
                    required={required}
                    multiple={true}
                >
                    <option disabled value="">Seleccione un destinatario</option>
                    {
                        options.map((item, index) => (
                            <option className="w-100" key={index} value={index}>{item.department}</option>
                        ))
                    }
                </select>


                <div
                    className="form-control form-control-sm text-start d-flex justify-content-between"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                >
                    <div>
                        {selected.target.value.length} - seleccionados
                    </div>
                    <span className="me-2">
                        <i className="fas fa-angle-down"></i>
                    </span>
                </div>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                    {
                        options.map((item, index) => (
                            <li
                                key={index}
                                className="px-3 options"
                            >
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" data-value={index} name="" id={`select-${index}`} onChange={handleChange} />
                                    <label htmlFor={`select-${index}`} className="form-check-label text-truncate w-100">{item[optionsLabel]}</label>
                                </div>
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    );
};

CCMultiSelect.propTypes = {
    options     : PropTypes.any.isRequired,
    optionsLabel: PropTypes.string.isRequired,
    value       : PropTypes.any.isRequired,
    onChange    : PropTypes.any.isRequired,
    id          : PropTypes.string,
    required    : PropTypes.bool
};

export default CCMultiSelect;