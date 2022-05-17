//@ts-check
import React, { useState, useEffect } from 'react';
import { InputText } from 'src/fragments';

export const AddresseesList = ({ addressee, handlerEdit, handlerDelete }) => {

    const [filtered, setFiltered] = useState([]);
    const [searchState, setSearchState] = useState("");

    useEffect(() => {
        handlerFilterSearch();
    }, [searchState, addressee]);

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleSearchChange = (e) => {
        setSearchState(e.target.value);
    };

    const handlerFilterSearch = () => {

        let searching = addressee.filter((addressee) => {
            return new RegExp(searchState, "i").test(addressee.name) ||
                new RegExp(searchState, "i").test(addressee.archetype) ||
                new RegExp(searchState, "i").test(addressee.jobTitle) ||
                new RegExp(searchState, "i").test(addressee.department) ? true : false;
        });

        setFiltered(searching);
    };

    return (
        <div className="px-3" style={{position: "relative"}}>

            <div className="card my-2 rounded text-white gradient">
                <div className="card-body py-1">
                    <h3 className="font-weight-bold mb-2">Lista de destinatarios</h3>
                    <InputText
                        htmlId="department"
                        onChange={handleSearchChange}
                        icon="fas fa-search"
                        placeholder="Buscar destinatario"
                        value={searchState}
                    />
                </div >
            </div >
            <div className="card rounded list__height">
                <div className="card-body p-2 bg-light scroll rounded overflow-auto h-100">
                    {
                        filtered.map((item, index) => (
                            <div key={index} className="card mb-2 rounded bg-body">
                                <div className="card-body py-1">
                                    <h6 className="font-weight-bold card-title">Nombre: <span className="font-weight-light">{item.name}</span></h6>
                                    <p className="font-weight-bold m-0 text-muted">Arquetipo: <span className="font-weight-light">{item.archetype}</span></p>
                                    <p className="font-weight-bold m-0 text-muted">Cargo: <span className="font-weight-light">{item.jobTitle}</span></p>
                                    <p className="font-weight-bold m-0 text-muted">Departamento: <span className="font-weight-light">{item.department}</span></p>
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
