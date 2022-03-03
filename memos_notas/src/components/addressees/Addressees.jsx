//@ts-check
import React, { useContext, useState } from 'react';
import { context } from 'src/context/context';
import { useForm } from 'src/hooks/useForm';
import { deleteAddressees } from 'src/utils/SaveAndGet';
import { AlertConfirmQuestion } from '../../utils/Alerts';
import { AddresseesCreate } from './AddresseesCreate';

const initialState = {
    id        : "",
    name      : "",
    jobTitle  : "",
    archetype : "",
    department: "",
    edit      : false
};
export const Addressees = ({ addresseeState, fetchAddresses }) => {

    const { showLoader, departmentOwnerState } = useContext(context);

    const [form, setForm, handleInputChange, reset] = useForm(initialState);
    const [searchState, setSearchState] = useState("");

   

    const handlerEdit = (index) => {
        setForm({
            id        : addresseeState[index].id,
            name      : addresseeState[index].name,
            jobTitle  : addresseeState[index].jobTitle,
            archetype : addresseeState[index].archetype,
            department: addresseeState[index].department,
            edit      : true
        });
        document.querySelector(".tab-content").scrollTo(0, 0);
    };

    const handlerDelete = async (index) => {
        const { isConfirmed } = await AlertConfirmQuestion(
            `Desea borrar a <span class="fw-bold">${addresseeState[index].name}</span>`
        );
        if (isConfirmed) {
            await deleteAddressees(addresseeState[index].id, showLoader);
            fetchAddresses();
        }
    };

    return (
        <>
            <AddresseesCreate
                 departmentOwnerState={departmentOwnerState}
                 fetchAddresses={fetchAddresses}
                 reset={reset}
                 handleInputChange={handleInputChange}
                 form={form}
            />
            <div className="px-3"><hr /></div>
            <div className="px-3" >
                <div className="px-2">
                    <h3 className="fw-bold mb-4">Lista de destinatarios</h3>
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
            </div>
        </>
    );
};
