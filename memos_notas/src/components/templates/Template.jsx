//@ts-check
import React, { useContext, useState } from 'react'
import { context } from 'src/context/context'
import { apiRequest } from 'src/utils/apiRequest'
import { fetchTemplate } from 'src/utils/FetchTemplate'
import { TemplateCreate } from './TemplateCreate'
import { TemplateList } from './TemplateList'


export const Template = () => {

    const { setLoader, setDocumentsState, documentsState } = useContext(context)


    const handlerFetchTemplate = async () => {
        setLoader(true)
        const template = await fetchTemplate()
        setLoader(false)
        setDocumentsState(template.data)
    }

    return (
        <>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateCreate fetchTemplate={handlerFetchTemplate} />
            </div>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateList fetchTemplate={handlerFetchTemplate} documentsState={documentsState} />
            </div>
        </>
    )
}
