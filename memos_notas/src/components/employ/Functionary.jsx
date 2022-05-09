import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { Space } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { AlertConfirmQuestion } from 'src/utils/Alerts';
import { deleteFunctionary } from 'src/utils/SaveAndGet';
import { FunctionaryCreate } from './FunctionaryCreate';
import { FunctionaryList } from './FunctionaryList';

const initialState = {
    id      : "",
    name    : "",
    idCard  : "",
    jobTitle: "",
    position: "",
    edit    : false
};

/**
 * 
 * @param {Object} props 
 * @param {Array} props.functionaries
 * @param {Function} props.fetchFunctionary
 * @returns 
 */
export const Functionary = ({ functionaries, fetchFunctionary }) => {

    const { showLoader } = useContext(context);

    const [values, setValues, handleInputChange, reset] = useForm(initialState);

    const handlerEdit = (idEdit) => {
        const { id, name, id_card, job_title, position_number } = functionaries.find((e) => e.id === idEdit);

        setValues({
            id      : id,
            name    : name,
            idCard  : id_card,
            jobTitle: job_title,
            position: position_number,
            edit    : true
        });

        document.querySelector(".tab-content").scrollTo(0, 0);
    };

    const handlerDelete = async (idDelete) => {

        const { id, name } = functionaries.find((e) => e.id === idDelete);
        const { isConfirmed } = await AlertConfirmQuestion(`¿Desea borrar a ${name}?`);

        if (isConfirmed) {
            showLoader(true);
            await deleteFunctionary(id);
            await fetchFunctionary();
            showLoader(false);
        }
    };


    return (
        <>
            <div className="w-100 px-3">
                <div className="card my-2 rounded text-white gradient">
                    <div className="card-body py-1">
                        <h3 className="font-weight-bold text-truncate">Funcionarios</h3>
                        <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar funcionarios para plantillas</p>
                    </div>
                </div>
            </div>
            <div className="functionary_pane h-100">
                <FunctionaryCreate
                    handleInputChange={handleInputChange}
                    fetchFunctionary={fetchFunctionary}
                    values={values}
                    reset={reset}
                />
                <div className="px-3 "><hr /></div>
                <FunctionaryList
                    functionaries={functionaries}
                    handlerEdit={handlerEdit}
                    handlerDelete={handlerDelete}
                />
                <Space height={10} />
            </div>
        </>
    );
};
