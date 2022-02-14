import React from 'react'
import { TemplateDocs } from './TemplateDocs'
import { TemplateFields } from './TemplateFields'

export const Template = () => {
    return (
        <>
            <div className="shadow p-3 m-3 bg-body radius-50">

                <div className="px-3">
                    <h3 className="fw-bold text-center">Crear plantillas de documentos y campos</h3>
                </div>
                <ul className="nav nav-pills mb-3 mt-3 d-flex justify-content-around" id="pills-tab" >
                    <li className="nav-item">
                        <button className="nav-link active" id="pills-doc-tab" data-bs-toggle="pill" data-bs-target="#pills-docs" type="button">Documentos</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" id="pills-field-tab" data-bs-toggle="pill" data-bs-target="#pills-field" type="button">Campos</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active px-3" id="pills-docs">
                        <TemplateDocs />
                    </div>
                    <div className="tab-pane fade px-3" id="pills-field">
                        <TemplateFields />
                    </div>
                </div>
            </div>
        </>
    )
}
