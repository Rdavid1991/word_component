import { useEffect, useContext, FormEvent, useState } from 'react';
import { context } from 'src/context/context';
import { InputText } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { localStorageAdminKey, localStorageKeyUser } from 'src/utils';
import { AlertWarning } from 'src/utils/Alerts';
import { loginAdmin } from '../utils/SaveAndGet';

const initialState = {
    email      : "",
    department : "",
    user       : "",
};

const initialAdmin = {
    pass : "",
    user : "",
};

const ModalInitialUser = ({ setShowModal }: any) => {

    const { departments } = useContext(context);
    const [values, setValues, handleInputChange, reset] = useForm<typeof initialState>(initialState);
    const [admin, setAdmin, handleAdminChange, resetAdmin] = useForm<typeof initialAdmin>(initialAdmin);
    const [panel, setPanel] = useState<"initial" | "admin">("initial"); // Estado para cambiar panel al iniciar

    useEffect(() => {
        $('#initialUser').modal('show');
        $('#initialUser').on("hidden.bs.modal", () => {
            if (!verifyData()) {
                $('#initialUser').modal('show');
            }
        });
    }, []);

    const verifyData = () => {

        const arrayUser = values.user.split(/\s/);
        if (values.department.length > 0 &&
            arrayUser.length >= 2 &&
            values.user.length > 0 &&
            new RegExp("@mides.gob.pa", "g").test(values.email) ||
            localStorage.hasOwnProperty(localStorageAdminKey)) {
            return true;
        } else {
            AlertWarning(`
                ${arrayUser.length < 2 ? "Hace falta <b>Nombre y/o Apellido</b>" : ""}
                <br>
                ${!new RegExp("@mides.gob.pa", "g").test(values.email) ? "El correo debe ser el institucional. Ejemplo: <b>sucorreo@mides.gob.pa</b>"  : ""}\n
            `);
            return false;
        }
    };

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (panel === 'initial') {
            const arrayUser = values.user.split(/\s/);

            if (verifyData()) {

                localStorage.setItem(localStorageKeyUser, JSON.stringify({
                    ...values,
                    initials: `${arrayUser[0].charAt(0)}${arrayUser[1].charAt(0)}`.toLowerCase(),
                }));

                $('#initialUser').modal('hide');
                setShowModal(false);
                window.location.reload();
            }

        } else if (panel === 'admin') {
            const { data } = await loginAdmin(admin.user, admin.pass);

            localStorage.setItem(localStorageAdminKey, JSON.stringify({
                department : data[0].department,
                admin      : data[0].user,
            }));

            $('#initialUser').modal('hide');
            window.location.reload();
        }
    };

    return (
        <div className="modal fade" id="initialUser" tabIndex={-1} role="dialog" aria-labelledby="initialUserLabel" data-backdrop="static" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="initialUserLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    {
                        panel === 'admin'
                            ?
                                <form
                                    onSubmit={handleSave}
                                >
                                    <div className="modal-body">
                                        <InputText
                                            value={admin.user}
                                            onChange={handleAdminChange}
                                            name="user"
                                            placeholder="Nombre de usuario administrador"
                                            htmlLabel="Usuario"
                                            required={true}
                                        />

                                        <InputText
                                            type={'password'}
                                            value={admin.pass}
                                            onChange={handleAdminChange}
                                            name="pass"
                                            placeholder="Contraseña de administrador"
                                            htmlLabel="Contraseña"
                                            required={true}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className='float-left btn btn-sm btn-secondary' onClick={() => setPanel("initial")}>Perfil</button>
                                        <button type="submit" className="btn btn-sm btn-primary" >Iniciar</button>
                                    </div>
                                </form>
                            :
                                <form
                                    onSubmit={handleSave}
                                >
                                    <div className="modal-body">
                                        <p>Para continuar ingrese la información solicitada</p>

                                        <InputText
                                            value={values.user}
                                            onChange={handleInputChange}
                                            name="user"
                                            htmlId="swal-input1"
                                            placeholder="Nombre Apellido"
                                            htmlLabel="Nombre y apellido"
                                            required={true}
                                        />

                                        <InputText
                                            value={values.email}
                                            onChange={handleInputChange}
                                            name="email"
                                            htmlId="swal-input2"
                                            placeholder="usuario@mides.gob.pa"
                                            htmlLabel="Correo"
                                            required={true}
                                        />

                                        <div className="mb-3">
                                            <label htmlFor="swal-input1" className="form-label font-weight-bold">Departamento</label>
                                            <select
                                                id='user_department'
                                                className="form-control form-control-sm"
                                                value={values.department}
                                                name="department"
                                                onChange={handleInputChange}
                                                required={true}
                                            >
                                                <option disabled value="">Seleccione un departamento</option>
                                                {
                                                    departments.map((item, index) => {

                                                        return item.id !== 0
                                                            ? <option key={index} value={item.id}>{item.name}</option>
                                                            : null;
                                                    })
                                                }
                                            </select>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className='float-left btn btn-sm btn-secondary' onClick={() => setPanel("admin")}>Administrar</button>
                                        <button type="submit" className="btn btn-sm btn-primary" >Guardar</button>
                                    </div>
                                </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalInitialUser;