import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { LoaderContext } from '../../context/context';
import { AlertConfirmQuestion } from '../../utils/Alerts';
import { deleteAddressees, saveAddressees } from './functions';

const initialState = {
    id: "",
    name: "",
    jobTitle: "",
    archetype: "",
    department: "",
    edit: false
}
export const Addressees = ({ addresseeState, fetchAddresses }) => {

    const setLoader = useContext(LoaderContext)

    const [form, setForm] = useState(initialState);
    const [searchState, setSearchState] = useState("");

    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.id]: target.value
        })
    }

    const handleSaveAddressees = async (e) => {
        e.preventDefault();
        setLoader(true)
        const json = await saveAddressees(form)
        setLoader(false)
        Swal.fire(json).then(async () => {
            setForm(initialState)
            fetchAddresses()
        });
    };

    const handlerEdit = (index) => {
        setForm({
            id: addresseeState[index].id,
            name: addresseeState[index].name,
            jobTitle: addresseeState[index].jobTitle,
            archetype: addresseeState[index].archetype,
            department: addresseeState[index].department,
            edit: true
        })
        scrollTo(0, 0)
    }

    const handlerDelete = (index) => {
        AlertConfirmQuestion(
            `Desea borrar a <span class="fw-bold">${addresseeState[index].name}</span>`
        ).then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true)
                const json = await deleteAddressees(addresseeState[index].id)
                if (json) {
                    setLoader(false)
                    Swal.fire(json).then(() => {
                        fetchAddresses()
                    })
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="shadow p-3 m-3 bg-body radius-50" >
                <div className="px-2">
                    <h3 className="fw-bold text-center mb-4">Agregar destinatarios</h3>
                    <form onSubmit={handleSaveAddressees} onReset={() => setForm(initialState)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Nombre</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    placeholder="Nombre"
                                    required={true}
                                    onChange={handleInputChange}
                                    value={form.name}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="jobTitle" className="form-label fw-bold">Cargo</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-wrench"></i></span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="jobTitle"
                                    placeholder="Cargo"
                                    required={true}
                                    onChange={handleInputChange}
                                    value={form.jobTitle}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="archetype" className="form-label fw-bold">Arquetipo</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="archetype"
                                    placeholder="Ejm: Licenciado, Ingeniero, Señor(a), etc"
                                    required={true}
                                    onChange={handleInputChange}
                                    value={form.archetype}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="archetype" className="form-label fw-bold">Departamento</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="department"
                                    placeholder="Departamento"
                                    required={true}
                                    onChange={handleInputChange}
                                    value={form.department}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <button className="btn btn-sm btn-secondary">Guardar</button>
                            <button className="btn btn-sm btn-secondary mx-1" type="reset">Limpiar campos</button>
                        </div>

                    </form>
                </div>
            </div>
            <div className="shadow p-1 m-3 bg-body radius-50" >
                <div className="px-2">
                    <h3 className="fw-bold text-center mb-4">Lista de destinatarios</h3>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="department"
                            placeholder="Departamento"
                            required={true}
                            onChange={({ target }) => setSearchState(target.value)}
                            value={searchState}
                        />
                        <span
                            className="input-group-text"
                        >
                            <i className="fas fa-search"></i>
                        </span>
                    </div>

                    { /**
                        * addresseeState structure
                        *  {
                        *      "id": int,
                        *      "name": "string",
                        *      "jobTitle": "string",
                        *      "archetype": "string",
                        *      "department": "string"
                        *  }
                        */
                    }

                    {

                        addresseeState.map((item, index) => {

                            if (searchState.length > 0 &&
                                new RegExp(searchState, "i").test(item.name) ||
                                new RegExp(searchState, "i").test(item.archetype) ||
                                new RegExp(searchState, "i").test(item.jobTitle) ||
                                new RegExp(searchState, "i").test(item.department)
                            ) {
                                return (
                                    <div key={index} className="card shadow-sm p-3 mb-2 bg-body">
                                        <div className="card-body">
                                            <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                                            <p className="fw-bold m-0 text-muted">Arquetipo: <span className="fw-light">{item.archetype}</span></p>
                                            <p className="fw-bold m-0 text-muted">Cargo: <span className="fw-light">{item.jobTitle}</span></p>
                                            <p className="fw-bold m-0 text-muted">Departamento: <span className="fw-light">{item.department}</span></p>
                                            <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerEdit(index)}><i className="far fa-edit"></i></button>
                                            <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerDelete(index)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>

                                )
                            } else if (searchState.length <= 0) {
                                return (
                                    <div key={index} className="card shadow-sm p-3 mb-2 bg-body">
                                        <div className="card-body">
                                            <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                                            <p className="fw-bold m-0 text-muted">Arquetipo: <span className="fw-light">{item.archetype}</span></p>
                                            <p className="fw-bold m-0 text-muted">Cargo: <span className="fw-light">{item.jobTitle}</span></p>
                                            <p className="fw-bold m-0 text-muted">Departamento: <span className="fw-light">{item.department}</span></p>
                                            <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerEdit(index)}><i className="far fa-edit"></i></button>
                                            <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerDelete(index)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </>
    );
};
