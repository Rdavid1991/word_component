import React from 'react';
import PropTypes from 'prop-types';

const InputTime = ({ label, id, value, onChange, required }) => {
    return (
        <div className="mb-3">
            <label
                forHtml={`#${id}`}
                className="font-weight-bold form-label"
            >
                {label}
            </label>
            <input type="time"
                className="form-control form-control-sm"
                onChange={onChange}
                value={value}
                id={id}
                required={required}
            />
        </div>
    );
};

InputTime.propTypes = {
    label   : PropTypes.string.isRequired,
    id      : PropTypes.string.isRequired,
    value   : PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};

export default InputTime;