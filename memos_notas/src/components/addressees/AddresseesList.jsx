//@ts-check
import React, { useState, useEffect } from 'react';
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

            <div className="card my-2 radius-50 text-white gradient">
                <div className="card-body">
                    <h3 className="fw-bold mb-2">Lista de destinatarios</h3>
                    <InputText
                        htmlId="department"
                        onChange={handleSearchChange}
                        icon="fas fa-search"
                        placeholder="Buscar destinatario"
                        value={searchState}
                    />
                </div >
            </div >
            <div className="card radius-50 h-100">
                <div className="card-body p-2 bg-light scroll radius-50 overflow-auto h-100">
                    {
                        filtered.map((item, index) => (
                            <div key={index} className="card mb-2 radius-50 bg-body">
                                <div className="card-body">
                                    <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                                    <p className="fw-bold m-0 text-muted">Arquetipo: <span className="fw-light">{item.archetype}</span></p>
                                    <p className="fw-bold m-0 text-muted">Cargo: <span className="fw-light">{item.jobTitle}</span></p>
                                    <p className="fw-bold m-0 text-muted">Departamento: <span className="fw-light">{item.department}</span></p>
                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerEdit(item.id)}><i className="far fa-edit"></i></button>
                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerDelete(item.id)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
};
