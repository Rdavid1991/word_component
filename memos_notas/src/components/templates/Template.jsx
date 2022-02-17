//@ts-check
import React, { useState } from 'react'
import { apiRequest } from 'src/utils/apiRequest'
import { TemplateCreate } from './TemplateCreate'
import { TemplateList } from './TemplateList'

const initialState = [];
export const Template = () => {

    const [documentsState, setDocumentsState] = useState(initialState);
    const fetchTemplate = () => {

        (async () => {
            const response = await apiRequest().get("get_template_doc", {})

            if (response.ok) {
                const json = await response.json()
                setDocumentsState(json.data)
            }
        })()
    }

    return (
        <>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateCreate fetchTemplate={fetchTemplate} />
            </div>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateList fetchTemplate={fetchTemplate} documentsState={documentsState} />
            </div>
        </>
    )
}
