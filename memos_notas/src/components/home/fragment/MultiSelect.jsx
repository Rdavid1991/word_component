import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./MultiSelect.css";


const initialState = {
    value: []
};

const MultiSelect = props => {

    const { options, optionsLabel, value, id, required = false, onChange } = props;

    const [selected, setSelected] = useState(initialState);
    const evt = useRef();
    const select = useRef();

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const handleChange = (e) => {

        let datasetValue = "";
        if (e.target.dataset) {
            datasetValue = e.target.dataset.value;
        } else {
            datasetValue = e.target.getAttribute("data-value");
        }

        if (e.target.checked) {
            setSelected({
                value: [
                    ...value,
                    datasetValue
                ]
            });
        } else {

            setSelected({
                value: selected.value.filter((sel) => sel !== datasetValue)
            });
        }
    };



    useEffect(() => {
        evt.current = new Event("setValues");
        select.current = document.querySelector(`#${id}`);
        select.current.addEventListener("setValues", onChange);
    }, []);

    useEffect(() => {
        triggerSelectEvent();
    }, [selected]);

    const triggerSelectEvent = () => {
        select.current.dispatchEvent(evt.current);
    };

    console.log({ options });

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label font-weight-bold">Con copia a</label>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="far fa-paper-plane"></i></span>
                <select
                    readOnly
                    value={selected.value}
                    className="d-none"
                    id={id}
                    name={id}
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
                    data-toggle="dropdown"
                    data-auto-close="outside"
                    aria-expanded="false"
                >
                    <div>
                        {selected.value.length} - seleccionados
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

MultiSelect.propTypes = {
    options     : PropTypes.any.isRequired,
    optionsLabel: PropTypes.string.isRequired,
    value       : PropTypes.any.isRequired,
    onChange    : PropTypes.any.isRequired,
    id          : PropTypes.string,
    required    : PropTypes.bool
};

export default MultiSelect;