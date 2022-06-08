import { ChangeEvent, FormEvent } from 'react';
import { ButtonReset, ButtonSubmit, InputText } from 'src/fragments';
import { DepartmentSchema } from '../../helpers/interface/index';
import { getLocalStorageUserDepartment } from 'src/utils';

interface Props {
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    department: DepartmentSchema;
    reset: () => void;
    handleSave: (e: FormEvent<HTMLFormElement>) => void;
}

const DepartmentForm = (props: Props) => {

    const { handleInputChange, department, reset, handleSave } = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleReset = (e: FormEvent<HTMLFormElement>) => {
        reset();
    };

    return (
        <form
            onSubmit={handleSave}
            onReset={handleReset}
        >
            <div className="px-3">
                <InputText
                    htmlId="name"
                    htmlLabel="Nombre"
                    onChange={handleInputChange}
                    placeholder="Nombre de la dirección o departamento"
                    value={department?.name}
                    required={true}
                    iconHelp={true}
                    descriptionHelp='Nombre del departamento que aparecerá en el documento'
                />
                <InputText
                    htmlId="initials"
                    htmlLabel="Iniciales de departamento"
                    onChange={handleInputChange}
                    placeholder="Iniciales de departamento"
                    value={department?.initials}
                    iconHelp={true}
                    descriptionHelp='Iniciales del departamento que aparecerán en el documento'

                />
                <InputText
                    htmlId="phone"
                    htmlLabel="Numero de teléfono (s)"
                    onChange={handleInputChange}
                    placeholder="500-0000/500-0000"
                    value={department?.phone}
                    iconHelp={true}
                    descriptionHelp='Numero de teléfono del departamento que aparecerá en el documento'
                />
                <InputText
                    htmlId="shift"
                    htmlLabel="Jefe o Director(a)"
                    onChange={handleInputChange}
                    placeholder="Nombre del jefe o director"
                    value={department?.shift}
                    iconHelp={true}
                    descriptionHelp='Nombre del jefe, director o firmante que aparecerán en el documento'
                />
                <InputText
                    htmlId="jobTitle"
                    htmlLabel="Puesto"
                    onChange={handleInputChange}
                    placeholder="Director de *****"
                    value={department?.jobTitle}
                    iconHelp={true}
                    descriptionHelp='Puesto del jefe, director o firmante del departamento que aparecerá en el documento'
                />
            </div>
            <div className="d-flex justify-content-around">
                <ButtonSubmit
                    title="Guardar"
                />

                {
                    /**
                     *  Validar usuarios: 
                     *  Este componente se reutiliza para los administradores y los usuarios 
                    */
                    getLocalStorageUserDepartment() === 0
                        ?
                            < ButtonReset
                                title="Limpiar campos"
                            />
                        : null
                }
            </div>
        </form>
    );
};

export default DepartmentForm;