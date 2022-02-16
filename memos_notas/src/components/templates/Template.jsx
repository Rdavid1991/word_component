import React, { useContext } from 'react'
import { TemplateContext } from 'src/context/context'
import { fetchTemplate } from './function'
import { TemplateCreate } from './TemplateCreate'
import { TemplateList } from './TemplateList'


export const Template = () => {

    return (
        <TemplateContext.Provider value={fetchTemplate}>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateCreate />
            </div>
            <div className="shadow p-3 m-3 bg-body radius-50">
                <TemplateList />
            </div>
        </TemplateContext.Provider>
    )
}
