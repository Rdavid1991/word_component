//@ts-check
import React, { useState } from 'react';
import { InputText } from 'src/fragments';

export const AddresseesList = ({ addresseeState, handlerEdit, handlerDelete }) => {

    const [searchState, setSearchState] = useState("");

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleSearchChange = (e) => {
        setSearchState(e.target.value);
    };

    return (
        <div className="px-3">
            <h3 className="fw-bold mb-4">Lista de destinatarios</h3>
            <div className="input-group mb-3">
                <InputText
                    htmlId="department"
                    onChange={handleSearchChange}
                    icon="fas fa-search"
                    placeholder="Buscar destinatario"
                    value={searchState}
                />
            </div>
            {

                addresseeState.map((item, index) => {

                    if (searchState.length > 0 &&
                        new RegExp(searchState, "i").test(item.name) ||
                        new RegExp(searchState, "i").test(item.archetype) ||
                        new RegExp(searchState, "i").test(item.jobTitle) ||
                        new RegExp(searchState, "i").test(item.department)
                    ) {
                        return (
                            <div key={index} className="card p-3 mb-2 bg-body">
                                <div className="card-body">
                                    <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                                    <p className="fw-bold m-0 text-muted">Arquetipo: <span className="fw-light">{item.archetype}</span></p>
                                    <p className="fw-bold m-0 text-muted">Cargo: <span className="fw-light">{item.jobTitle}</span></p>
                                    <p className="fw-bold m-0 text-muted">Departamento: <span className="fw-light">{item.department}</span></p>
                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerEdit(index)}><i className="far fa-edit"></i></button>
                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerDelete(index)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </div>

                        );
                    } else if (searchState.length <= 0) {
                        return (
                            <div key={index} className="card p-3 mb-2 bg-body">
                                <div className="card-body">
                                    <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                                    <p className="fw-bold m-0 text-muted">Arquetipo: <span className="fw-light">{item.archetype}</span></p>
                                    <p className="fw-bold m-0 text-muted">Cargo: <span className="fw-light">{item.jobTitle}</span></p>
                                    <p className="fw-bold m-0 text-muted">Departamento: <span className="fw-light">{item.department}</span></p>
                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerEdit(index)}><i className="far fa-edit"></i></button>
                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerDelete(index)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                        );
                    }
                })
            }
        </div>
    );
};
