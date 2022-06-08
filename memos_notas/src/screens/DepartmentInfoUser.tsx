import { useContext } from 'react';
import { Space } from '../fragments/index';
import { DepartmentSchema, Result } from '../helpers/interface/index';
import { FetchContext } from '../context/context';
import { useEffect } from 'react';
import { DepartmentInfoSave } from 'src/utils/SaveAndGet';
import { FormEvent } from 'react';
import { useForm } from 'src/hooks/useForm';
import { AlertSuccess } from 'src/utils/Alerts';
import DepartmentForm from 'src/components/departments/DepartmentForm';

interface Props {
    fetchDepartment: () => Promise<void>
}

const DepartmentInfoUser = ({ fetchDepartment }: Props) => {

    const { data } = useContext(FetchContext);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [department, setDepartment, handleInputChange, reset] = useForm<DepartmentSchema>({});

    useEffect(() => {
        setDepartment(data.department);
    }, [data.department]);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result: Result = await DepartmentInfoSave(department);
        fetchDepartment();
        AlertSuccess(result.message.text);
    };

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

            <div className="px-3">
                <DepartmentForm {...{ department, handleInputChange, handleSave, reset }} />
            </div>
            <div className="d-flex justify-content-around">
                <button className='btn btn-sm btn-primary' type="submit">Guardar</button>
            </div>

            <Space height={5} />
        </>
    );
};

export default DepartmentInfoUser;