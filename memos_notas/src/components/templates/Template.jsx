//@ts-check
import React, { useCallback, useContext } from 'react'
import { context } from 'src/context/context'
import { useForm } from 'src/hooks/useForm'
import { writeDocument } from 'src/utils/documents'
import { fetchTemplate } from 'src/utils/FetchTemplate'
import TemplateCreate from './TemplateCreate'
import TemplateList from './TemplateList'

const initialState = {
    name: "",
    type: "",
    edit: false
}

export const Template = () => {

    const [values, setValues, handleInputChange, reset] = useForm(initialState);
    const { showLoader, loadDocuments, documents } = useContext(context)


    const handlerFetchTemplate = async () => {
        showLoader(true)
        const template = await fetchTemplate()
        showLoader(false)
        loadDocuments(template.data)
    }

    const handlerEdit = useCallback((id) => {

        /**
         * 
         * @param {Object} item 
         * @param {string } item.id 
         * @returns 
         */
        const filterDocument = (item) => parseInt(item.id) === parseInt(id);
        const documentObject = documents.find(filterDocument)

        const document = JSON.parse(documentObject.doc)

        setValues({
            name: documentObject.name
        })

        writeDocument(document)

    }, [documents])

    return (
        <>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateCreate
                    fetchTemplate={handlerFetchTemplate}
                    values={values}
                    reset={reset}
                    handleInputChange={handleInputChange}
                />
            </div>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateList
                    documents={documents}
                    handlerEdit={handlerEdit}
                />
            </div>
        </>
    )
}
