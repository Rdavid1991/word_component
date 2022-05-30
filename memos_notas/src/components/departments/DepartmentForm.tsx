import React, { ChangeEvent, FormEvent, useContext } from 'react'
import { ButtonReset, ButtonSubmit, InputText } from 'src/fragments';
import { DepartmentSchema, Result } from '../../helpers/interface/index';
import { getLocalStorageUserDepartment } from 'src/utils';
import { DepartmentInfoSave } from 'src/utils/SaveAndGet';
import { AlertSuccess } from 'src/utils/Alerts';
import { context } from 'src/context/context';

interface Props {
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    department: DepartmentSchema;
    reset: () => void;
}

const DepartmentForm = (props: Props) => {

    const { handleInputChange, department, reset } = props
    const { fetchDepartments } = useContext(context)

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result: Result = await DepartmentInfoSave(department)
        reset()
        fetchDepartments()
        AlertSuccess(result.message.text);
    }

    const handleReset = (e: FormEvent<HTMLFormElement>) => {
        reset();
    }

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

                />
                <InputText
                    htmlId="phone"
                    htmlLabel="Numero de teléfono (s)"
                    onChange={handleInputChange}
                    placeholder="500-0000/500-0000"
                    value={department?.phone}

                />
                <InputText
                    htmlId="shift"
                    htmlLabel="Jefe o Director(a)"
                    onChange={handleInputChange}
                    placeholder="Nombre del jefe o director"
                    value={department?.shift}

                />
                <InputText
                    htmlId="jobTitle"
                    htmlLabel="Puesto"
                    onChange={handleInputChange}
                    placeholder="Director de *****"
                    value={department?.jobTitle}
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
                    getLocalStorageUserDepartment()
                        ?
                            < ButtonReset
                                title="Limpiar campos"
                            />
                        : null
                }
            </div>
        </form>
    )
}

export default DepartmentForm