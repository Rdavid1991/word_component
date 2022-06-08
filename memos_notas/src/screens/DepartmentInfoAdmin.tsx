import { FormEvent, useContext } from 'react';
import DepartmentForm from 'src/components/departments/DepartmentForm';
import { context } from 'src/context/context';
import { DepartmentSchema, Result } from 'src/helpers/interface';
import { DepartmentInfoDelete, DepartmentInfoSave } from 'src/utils/SaveAndGet';
import { DepartmentList } from '../components/departments/DepartmentsList';
import { useForm } from '../hooks/useForm';
import { AlertConfirmQuestion, AlertSuccess } from 'src/utils/Alerts';
import { Space } from '../fragments/index';

const DepartmentInfoAdmin = () => {

    const { departments, fetchDepartments } = useContext(context);

    const [department, setDepartment, handleInputChange, reset] = useForm<DepartmentSchema>({
        id       : undefined,
        initials : undefined,
        jobTitle : undefined,
        name     : undefined,
        phone    : undefined,
        shift    : undefined
    });

    const handlerEdit = (id: number) => {

        const found = departments.find((item) => item.id === id);
        setDepartment({ ...found });

        document.querySelector(".tab-content").scrollTo(0, 0);
    };

    const handlerDelete = async (id: number) => {

        const confirm = await AlertConfirmQuestion("¿Desea borrar departamento? se borrarán todas sus plantillas");

        if (confirm) {
            const result: Result = await DepartmentInfoDelete(id);
            fetchDepartments();
            AlertSuccess(result.message.text);
        }
    };

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result: Result = await DepartmentInfoSave(department);
        reset();
        fetchDepartments();
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

                <DepartmentList {...{ departments, handlerDelete, handlerEdit }} />

            </div>

            <Space height={5} />
        </>
    );
};

export default DepartmentInfoAdmin;