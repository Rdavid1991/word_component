//@ts-check
import React, { useState,useEffect } from 'react';
import { InputText } from 'src/fragments';

export const AddresseesList = ({ addresseeState, handlerEdit, handlerDelete }) => {

    const [filtered, setFiltered] = useState([]);
    const [searchState, setSearchState] = useState("");

    useEffect(() => {
        handlerFilterSearch();
    }, [searchState, addresseeState]);

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleSearchChange = (e) => {
        setSearchState(e.target.value);
    };

    const handlerFilterSearch = () => {

        let searching = addresseeState.filter((addressee) => {
            return new RegExp(searchState, "i").test(addressee.name) ||
                new RegExp(searchState, "i").test(addressee.archetype) ||
                new RegExp(searchState, "i").test(addressee.jobTitle) ||
                new RegExp(searchState, "i").test(addressee.department) ? true : false;
        });

        setFiltered(searching);
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
                filtered.map((item, index) => (
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
                ))
            }
        </div>
    );
};
