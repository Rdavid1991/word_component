import React, { useEffect, useContext } from 'react';
import { context } from 'src/context/context';
import { InputText } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { localStorageKeyUser } from 'src/utils';
import swal from 'sweetalert';

/* globals $*/

const initialState = {
    user      : "",
    email     : "",
    department: ""
};

const ModalInitialUser = ({ setShowModal }) => {

    const { departments } = useContext(context);
    const [values, setValues, handleInputChange, reset] = useForm(initialState);

    useEffect(() => {
        $('#initialUser').modal('show');
    }, []);

    const handleSave = async () => {

        const arrayUser =values.user.split(/\s/);

        if (values.department.length > 0 && arrayUser.length >= 2 && values.user.length > 0 && new RegExp("@mides.gob.pa", "g").test(values.email)) {

            localStorage.setItem(localStorageKeyUser, JSON.stringify({
                ...values,
                initials: `${arrayUser[0].charAt(0)}${arrayUser[1].charAt(0)}`.toLowerCase(),
            }));

            $('#initialUser').modal('hide');
            setShowModal(false);
    
        } else {
            await swal("Complete la información");
        }
    };

    return (
        <div className="modal fade" id="initialUser" tabIndex="-1" role="dialog" aria-labelledby="initialUserLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="initialUserLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Para continuar ingrese la información solicitada</p>

                        <InputText
                            value={values.user}
                            onChange={handleInputChange}
                            name="user"
                            htmlId="swal-input1"
                            placeholder="Nombre Apellido"
                            htmlLabel="Nombre y apellido"
                        />

                        <InputText
                            value={values.email}
                            onChange={handleInputChange}
                            name="email"
                            htmlId="swal-input2"
                            placeholder="usuario@mides.gob.pa"
                            htmlLabel="Correo"
                        />

                        <div className="mb-3">
                            <label htmlFor="swal-input1" className="form-label font-weight-bold">Departamento</label>
                            <select
                                id='user_department'
                                className="form-control form-control-sm"
                                value={values.department}
                                name="department"
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Seleccione un departamento</option>
                                {
                                    departments.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInitialUser;