//@ts-check
import React, { useCallback, useContext } from 'react';
import { context } from 'src/context/context';
import { Space } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { writeDocument } from 'src/utils/documents';
import { deleteDocumentTemplate, getDocumentTemplate } from 'src/utils/SaveAndGet';
import TemplateCreate from './TemplateCreate';
import TemplateList from './TemplateList';

const initialState = {
    name: "",
    type: "",
    id  : "",
    edit: false
};

export const Template = ({ documents, fetchTemplate }) => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);
    const { showLoader } = useContext(context);


    const handlerFetchTemplate = async () => {
        showLoader(true);
        await fetchTemplate();
        showLoader(false);
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

        const template = await getDocumentTemplate(id);

        setValues({
            ...values,
            id   : documentObject.id,
            name : documentObject.name,
            type : documentObject.type,
            owner: documentObject.department_owner_id,
            edit : true
        });

        writeDocument(JSON.parse(template.data[0].doc));
        document.querySelector(".tab-content").scrollTo(0, 0);

    }, [documents]);

    const handlerDelete = useCallback(async (id) => {
        deleteDocumentTemplate(handlerFetchTemplate, id);
    }, [documents]);

    return (
        <>
            <div className="w-100 px-3">
                <div className="card my-2 rounded  text-white gradient">
                    <div className="card-body py-1">
                        <h3 className="fw-bold text-truncate">Plantillas</h3>
                        <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar plantillas de documentos</p>
                    </div>
                </div>
            </div>
            <div className="template_pane h-100">
                <div className="px-3">
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
                <Space height={10}/>
            </div>
        </>
    );
};