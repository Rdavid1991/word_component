import React from 'react';

export const InfoHelp = () => {
    return (
        <div className="p-3 m-3">
            <h2>Variables</h2>
            <h3 className="text-center px-2 fw-bold" >Generar numero de memos y notas</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td className="fw-bold">Asunto</td>
                        <td>subject</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Solicitado por</td>
                        <td>request</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Año</td>
                        <td>year</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Fecha</td>
                        <td>date</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Numero - memo</td>
                        <td>num_memo</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Numero - nota</td>
                        <td>num_note</td>
                    </tr>
                </tbody>
            </table>
            <h3 className="text-center px-2 fw-bold" >Destinatario</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td className="fw-bold">Nombre</td>
                        <td>addressee_name</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Cargo</td>
                        <td>addressee_job_title</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Arquetipo</td>
                        <td>addressee_archetype</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Departamento</td>
                        <td>addressee_department</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
