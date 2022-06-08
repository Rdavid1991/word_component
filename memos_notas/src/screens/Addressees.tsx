import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { Space } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { deleteAddressees } from 'src/utils/SaveAndGet';
import { AlertConfirmQuestion } from '../utils/Alerts';
import { AddresseesCreate } from '../components/addressees/AddresseesCreate';
import { AddresseesList } from '../components/addressees/AddresseesList';
import { AddresseesSchema } from '../helpers/interface/index';

const initialState: AddresseesSchema = {
    archetype  : undefined,
    department : undefined,
    edit       : false,
    id         : undefined,
    jobTitle   : undefined,
    name       : undefined,
};

interface Props {
    addressee: Array<typeof initialState>;
    fetchAddresses: () => Promise<void>
}

export const Addressees = ({ addressee, fetchAddresses }: Props) => {


    const { departments } = useContext(context);

    const [form, setForm, handleInputChange, reset] = useForm<typeof initialState>(initialState);

    const handlerEdit = (idEdit : number) => {

        const found = addressee.find((a) => a.id == idEdit);

        setForm({
            archetype  : found.archetype,
            department : found.department,
            edit       : true,
            id         : found.id,
            jobTitle   : found.jobTitle,
            name       : found.name,
        });
        document.querySelector(".tab-content").scrollTo(0, 0);
    };

    const handlerDelete = async (idEdit) => {

        const { id, name } = addressee.find((a) => a.id == idEdit);

        const value = await AlertConfirmQuestion(
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
                <Space height={10} />
            </div>
        </>
    );
};
