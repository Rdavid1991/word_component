//@ts-check
import React, { useCallback, useContext } from 'react';
import { context } from 'src/context/context';
import { useForm } from 'src/hooks/useForm';
import { AlertConfirmQuestion, AlertError, AlertSuccess } from 'src/utils/Alerts';
import { apiRequest } from 'src/utils/apiRequest';
import { writeDocument } from 'src/utils/documents';
import { fetchTemplate } from 'src/utils/FetchTemplate';
import Swal from 'sweetalert2';
import TemplateCreate from './TemplateCreate';
import TemplateList from './TemplateList';

const initialState = {
    name: "",
    type: "",
    id: "",
    edit: false
};

export const Template = () => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);
    const { showLoader, loadDocuments, documents } = useContext(context);


    const handlerFetchTemplate = async () => {
        showLoader(true);
        const template = await fetchTemplate();
        showLoader(false);
        loadDocuments(template.data);
    };

    const handlerEdit = useCallback(async (id) => {

        /**
         * 
         * @param {Object} item 
         * @param {string } item.id 
         * @returns 
         */
        const filterDocument = (item) => parseInt(item.id) === parseInt(id);
        const documentObject = documents.find(filterDocument);

        const documentTemplate = JSON.parse(documentObject.doc);

        setValues({
            ...values,
            name: documentObject.name,
            type: documentObject.type,
            owner: documentObject.department_owner_id,
            edit: true
        });

        writeDocument(documentTemplate);
        document.querySelector(".tab-content").scrollTo(0, 0);

    }, [documents]);

    const handlerDelete = useCallback(async (id) => {

        const { isConfirmed } = await AlertConfirmQuestion("Va a borrar un elemento ¿desea continuar?");

        if (isConfirmed) {
            try {
                showLoader(true);
                const response = await apiRequest().post("delete_template_doc", { id });
                if (response.ok) {
                    await handlerFetchTemplate();
                    await Swal.fire(await response.json());
                } else {
                    AlertError(`No de pudo borrar la plantilla: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                AlertError(error);
            }
        } else {
            AlertSuccess("La acción a sido cancelada");
        }
    }, [documents]);

    return (
        <>
            <div className="px-3 pt-3">
                <TemplateCreate
                    handlerFetchTemplate={handlerFetchTemplate}
                    values={values}
                    reset={reset}
                    handleInputChange={handleInputChange}
                />
            </div>
            <div className="px-3"><hr /></div>
            <div className="px-3">
                <TemplateList
                    documents={documents}
                    handlerEdit={handlerEdit}
                    handlerDelete={handlerDelete}
                />
            </div>
        </>
    );
};
