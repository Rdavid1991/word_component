//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { Space } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { deleteAddressees } from 'src/utils/SaveAndGet';
import { AlertConfirmQuestion } from '../../utils/Alerts';
import { AddresseesCreate } from './AddresseesCreate';
import { AddresseesList } from './AddresseesList';

const initialState = {
    id        : "",
    name      : "",
    jobTitle  : "",
    archetype : "",
    department: "",
    edit      : false
};

/**
 * 
 * @param {Object} props
 * @param {Array} props.addresseeState
 * @param {Function} props.fetchAddresses
 * @returns 
 */
export const Addressees = ({ addresseeState, fetchAddresses }) => {

    const { showLoader, departmentOwnerState } = useContext(context);

    const [form, setForm, handleInputChange, reset] = useForm(initialState);

    const handlerEdit = (idEdit) => {

        const found = addresseeState.find((a) => a.id == idEdit);

        setForm({
            id        : found.id,
            name      : found.name,
            jobTitle  : found.jobTitle,
            archetype : found.archetype,
            department: found.department,
            edit      : true
        });
        document.querySelector(".tab-content").scrollTo(0, 0);
    };

    const handlerDelete = async (idEdit) => {

        const { id, name } = addresseeState.find((a) => a.id == idEdit);

        const { isConfirmed } = await AlertConfirmQuestion(
            `Desea borrar a <span class="fw-bold">${name}</span>`
        );
        if (isConfirmed) {
            await deleteAddressees(id, showLoader);
            fetchAddresses();
        }
    };

    return (
        <>
            <div className="w-100 px-3">
                <div className="card my-2 radius-50 text-white" style={{ background: "linear-gradient(0deg, #f94747c7, #fd182abf)" }}>
                    <div className="card-body">
                        <h3 className="fw-bold text-truncate">Destinatarios</h3>
                        <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar destinatarios para memos o notas</p>
                    </div>
                </div>
            </div>
            <div className="addressees_pane h-100">
                <AddresseesCreate
                    departmentOwnerState={departmentOwnerState}
                    fetchAddresses={fetchAddresses}
                    reset={reset}
                    handleInputChange={handleInputChange}
                    form={form}
                />
                <div className="px-3"><hr /></div>
                <AddresseesList
                    addresseeState={addresseeState}
                    handlerEdit={handlerEdit}
                    handlerDelete={handlerDelete}
                />
                <Space height={10}/>
            </div>
        </>
    );
};
