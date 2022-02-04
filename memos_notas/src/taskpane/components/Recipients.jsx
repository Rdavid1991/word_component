import React, { useState } from 'react';

const initialState = {
    name: "",
    jobTitle: ""
}
export const Recipients = () => {

    const [form, setForm] = useState(initialState);

    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.id]: target.value
        })
    }

    return (
        <>
            <div className="shadow p-3 m-3 bg-body radius-50" >
                <div className="px-2">
                <h3 className="fw-bold text-center mb-4">Agregar destinatarios</h3>
                    <form >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Nombre</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i class="fas fa-user"></i></span>
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
                                <span className="input-group-text"><i class="fas fa-wrench"></i></span>
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
                                <span className="input-group-text"><i class="fas fa-user-tie"></i></span>
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
                            <button className="btn btn-secondary">Guardar</button>
                        </div>

                    </form>
                </div>
            </div>
            <div className="shadow p-3 m-3 bg-body radius-50" >
                <div className="px-2">
                    <h3 className="fw-bold text-center mb-4">Lista de destinatarios</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Arquetipo</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
