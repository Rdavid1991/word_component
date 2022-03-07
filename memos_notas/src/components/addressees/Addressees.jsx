//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
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
export const Addressees = ({ addresseeState, fetchAddresses }) => {

    const { showLoader, departmentOwnerState } = useContext(context);

    const [form, setForm, handleInputChange, reset] = useForm(initialState);

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
            <div className="w-100 px-3">
                <h3 className="fw-bold text-truncate">Destinatarios</h3>
                <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar destinatarios para memos o notas</p>
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
            </div>
        </>
    );
};
