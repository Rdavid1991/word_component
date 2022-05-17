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
 * @param {Array} props.addressee
 * @param {Function} props.fetchAddresses
 * @returns 
 */
export const Addressees = ({ addressee, fetchAddresses }) => {
    

    const { showLoader, departments } = useContext(context);

    const [form, setForm, handleInputChange, reset]: any = useForm(initialState);

    const handlerEdit = (idEdit) => {

        const found = addressee.find((a) => a.id == idEdit);

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

        const { id, name } = addressee.find((a) => a.id == idEdit);

        const value= await AlertConfirmQuestion(
            `Desea borrar a ${name}`
        );
        if (value) {
            //showLoader(true);
            await deleteAddressees(id);
            await fetchAddresses();
            //showLoader(false);
        }
    };

    return (
        <>
            <div className="w-100 px-3">
                <div className="card my-2 rounded text-white gradient">
                    <div className="card-body py-1">
                        <h3 className="font-weight-bold text-truncate">Destinatarios</h3>
                        <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar destinatarios para memos o notas</p>
                    </div>
                </div>
            </div>
            <div className="addressees_pane h-100">
                <AddresseesCreate
                    departments={departments}
                    fetchAddresses={fetchAddresses}
                    reset={reset}
                    handleInputChange={handleInputChange}
                    form={form}
                />
                <div className="px-3"><hr /></div>
                <AddresseesList
                    addressee={addressee}
                    handlerEdit={handlerEdit}
                    handlerDelete={handlerDelete}
                />
        
            </div>
        </>
    );
};
