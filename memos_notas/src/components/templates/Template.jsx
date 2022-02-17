//@ts-check
import React, { useContext } from 'react'
import { context } from 'src/context/context'
import { useForm } from 'src/hooks/useForm'
import { fetchTemplate } from 'src/utils/FetchTemplate'
import { TemplateCreate } from './TemplateCreate'
import { TemplateList } from './TemplateList'

const initialState = {
    name: "",
    type: ""
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
                    fetchTemplate={handlerFetchTemplate}
                    documents={documents}
                />
            </div>
        </>
    )
}
