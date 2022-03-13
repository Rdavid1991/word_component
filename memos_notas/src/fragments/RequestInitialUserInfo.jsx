import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'src/hooks/useForm';
import { InputText } from '.';

const RequestInitialUserInfo = ({department, initialState}) => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);
 
    return (
        <>
            <p>Para continuar ingrese la información solicitada</p>

            <InputText
                value={values.user}
                onChange={handleInputChange}
                htmlId="swal-input1"
                placeholder="Nombre Apellido"
                htmlLabel="Nombre y apellido"
            />

            <InputText
                value={values.email}
                onChange={handleInputChange}
                htmlId="swal-input2"
                placeholder="usuario@mides.gob.pa"
                htmlLabel="Correo"
            />
            
            <div className="mb-3">
                <label htmlFor="swal-input1" className="form-label fw-bold">Departamento</label>
                <select
                    id='user_department'
                    className="form-select form-select-sm"
                    value={values.department}
                    onChange={handleInputChange}
                >
                    <option disabled value="">Seleccione un departamento</option>
                    {
                        department.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

        </>
    );
};

RequestInitialUserInfo.propTypes = {};

export default React.memo(RequestInitialUserInfo);