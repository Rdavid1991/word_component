import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { ButtonReset, ButtonSubmit, InputText, SelectDepartment } from 'src/fragments';
import { saveFunctionary } from 'src/utils/SaveAndGet';

export const FunctionaryCreate = ({ handleInputChange, fetchFunctionary, values, reset } : any) => {

    const { showLoader, departments } = useContext(context);

    /**
	 * 
	 * @param {React.FormEvent<HTMLFormElement>} e 
	 */
    const handleSaveFunctionary = async (e) => {
        e.preventDefault();
        //showLoader(true);
        const { isSaved } = await saveFunctionary(values);
        if (isSaved) {
            reset();
            await fetchFunctionary();
        }
        //showLoader(false);
    };


    return (
        <div className="px-3" >
            <form onSubmit={handleSaveFunctionary} onReset={() => reset()}>
                <InputText
                    htmlId="name"
                    htmlLabel="Nombre"
                    onChange={handleInputChange}
                    placeholder="Nombre del funcionario"
                    value={values.name}
                    required={true}
                    iconHelp={true}
                    descriptionHelp="Nombre del funcionario"
                />
                <InputText
                    htmlId="idCard"
                    htmlLabel="Cédula"
                    onChange={handleInputChange}
                    placeholder="Cédula del funcionario"
                    value={values.idCard}
                    required={true}
                    iconHelp={true}
                    descriptionHelp="Cédula de identidad personal del funcionario"
                />
                <InputText
                    htmlId="jobTitle"
                    htmlLabel="Puesto"
                    onChange={handleInputChange}
                    placeholder="Puesto del funcionario"
                    value={values.jobTitle}
                    required={true}
                    iconHelp={true}
                    descriptionHelp="Puesto al que esta asignado el funcionario"
                />
                <InputText
                    htmlId="position"
                    htmlLabel="N° de Posición"
                    onChange={handleInputChange}
                    placeholder="Numero de posición del funcionario"
                    value={values.position}
                    required={true}
                    pattern="[0-9]{3,}"
                    title="Solo acepta números"
                    iconHelp={true}
                    descriptionHelp="Numero de posición al cual esta asignado el funcionario"
                />
                <SelectDepartment {...{ values, handleInputChange, departments }} />

                <div className="mb-3">
                    <ButtonSubmit
                        title="Guardar"
                    />
                    <ButtonReset
                        title="Limpiar campos"
                    />
                </div>
            </form>
        </div>
    );
};
