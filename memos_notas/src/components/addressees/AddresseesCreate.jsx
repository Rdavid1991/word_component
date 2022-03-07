//@ts-check
import React from 'react';
import { InputText, renderSelectDepartment } from 'src/fragments';
import { saveAddressees } from 'src/utils/SaveAndGet';

export const AddresseesCreate = ({ departmentOwnerState, fetchAddresses, handleInputChange, form, reset }) => {

    const handleSaveAddressees = async (e) => {
        e.preventDefault();
        const { isSaved } = await saveAddressees(form);
        if (isSaved) reset();
        fetchAddresses();
    };

    return (
        <div className="px-3" >
            <form onSubmit={handleSaveAddressees} onReset={() => reset()}>
                <InputText
                    htmlId="name"
                    htmlLabel="Nombre"
                    onChange={handleInputChange}
                    placeholder="Nombre del destinatario"
                    value={form.name}
                />
                <InputText
                    htmlId="jobTitle"
                    htmlLabel="Cargo"
                    onChange={handleInputChange}
                    placeholder="Cargo del destinatario"
                    value={form.jobTitle}
                />
                <InputText
                    htmlId="archetype"
                    htmlLabel="Arquetipo"
                    onChange={handleInputChange}
                    placeholder="Ejemplo: Sr, Sra, Lic"
                    value={form.archetype}
                />
                <InputText
                    htmlId="department"
                    htmlLabel="Dirección / Departamento"
                    onChange={handleInputChange}
                    placeholder="Dirección o departamento del destinatario"
                    value={form.department}
                />
                {renderSelectDepartment(form, handleInputChange, departmentOwnerState)}

                <div className="mb-3">
                    <button className="btn btn-sm btn-secondary">Guardar</button>
                    <button className="btn btn-sm btn-secondary mx-1" type="reset">Limpiar campos</button>
                </div>
            </form>
        </div>
    );
};
