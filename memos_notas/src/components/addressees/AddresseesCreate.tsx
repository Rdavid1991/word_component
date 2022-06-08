//@ts-check
import React from 'react';
import { InputText, SelectDepartment } from 'src/fragments';
import { saveAddressees } from 'src/utils/SaveAndGet';

export const AddresseesCreate = ({ departments, fetchAddresses, handleInputChange, form, reset } : any) => {

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
                    required={true}
                    iconHelp={true}
                    descriptionHelp="Nombre de director o jefe del departamento a quien va dirigido"
                />
                <InputText
                    htmlId="jobTitle"
                    htmlLabel="Cargo"
                    onChange={handleInputChange}
                    placeholder="Cargo del destinatario"
                    value={form.jobTitle}
                    required={true}
                    iconHelp={true}
                    descriptionHelp="cargo de director o jefe del departamento a quien va dirigido"
                />
                <InputText
                    htmlId="archetype"
                    htmlLabel="Arquetipo"
                    onChange={handleInputChange}
                    placeholder="Ejemplo: Sr, Sra, Lic"
                    value={form.archetype}
                    required={true}
                    iconHelp={true}
                    descriptionHelp="EL arquetipo es el prefijo que usado para referirse a alguien de manera cortes. Ejemplo: Sr, Sra, Licdo, Ing, etc."
                />
                <InputText
                    htmlId="department"
                    htmlLabel="Dirección / Departamento"
                    onChange={handleInputChange}
                    placeholder="Dirección o departamento del destinatario"
                    value={form.department}
                    required={true}
                    iconHelp={true}
                    descriptionHelp="Nombre del departamento a quien va dirigido"
                />
                <SelectDepartment {...{ values: form, handleInputChange, departments }} />

                <div className="mb-3">
                    <button className="btn btn-sm btn-secondary">Guardar</button>
                    <button className="btn btn-sm btn-secondary mx-1" type="reset">Limpiar campos</button>
                </div>
            </form>
        </div>
    );
};
