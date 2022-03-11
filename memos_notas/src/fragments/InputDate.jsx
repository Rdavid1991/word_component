import React from 'react';
import PropTypes from 'prop-types';

const InputDate = ({ label, id, value, onChange, required }) => {
    return (
        <div className="mb-3">
            <label
                forHtml={`#${id}`}
                className="fw-bold form-label"
            >
                {label}
            </label>
            <input type="date"
                className="form-control form-control-sm"
                onChange={onChange}
                value={value}
                id={id}
                required={required}
            />
        </div>
    );
};

InputDate.propTypes = {
    label   : PropTypes.string.isRequired,
    id      : PropTypes.string.isRequired,
    value   : PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};

export default InputDate;