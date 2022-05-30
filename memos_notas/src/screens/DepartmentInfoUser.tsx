import React, { useState, useContext } from 'react'
import { InputText } from '../fragments/index';
import { DepartmentSchema } from '../helpers/interface/index';
import { FetchContext } from '../context/context';
import { useEffect } from 'react';
import { DepartmentInfoSave } from 'src/utils/SaveAndGet';
import { FormEvent } from 'react';
import { useForm } from 'src/hooks/useForm';

interface Props {
    fetchDepartment: () => void
}

const DepartmentInfo = ({ fetchDepartment }: Props) => {

    const { data } = useContext(FetchContext)

    const [department, setDepartment, handleInputChange, reset] = useForm<DepartmentSchema>({})

    useEffect(() => {
        setDepartment(data.department)
    }, [data.department])

    const saveTemplateInfo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await DepartmentInfoSave(department)
        //fetchDepartment()
    }

    return (
        <>
            <div className="w-100 px-3">
                <div className="card my-2 rounded text-white gradient">
                    <div className="card-body py-1">
                        <h3 className="font-weight-bold text-truncate">Información del departamento o dirección</h3>
                        <p className="text-truncate" style={{ fontSize: "14px" }}>Información del departamento que se plasmara en la plantilla</p>
                    </div>
                </div>
            </div>

            <form onSubmit={saveTemplateInfo}>
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
                    <button className='btn btn-sm btn-primary' type="submit">Guardar</button>
                </div>
            </form>
        </>
    )
}

export default DepartmentInfo