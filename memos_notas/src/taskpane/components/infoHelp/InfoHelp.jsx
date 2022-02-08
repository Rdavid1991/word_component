import React from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

export const InfoHelp = ({ numberState, setNumberState, saveNumber }) => {

    const handleInputChange = ({ target }) => {
        setNumberState({
            ...numberState,
            [target.id]: parseInt(target.value)
        })
    };

    const handleSaveNumber = async (e) => {
        e.preventDefault();
        const saveNumberResult = await saveNumber(numberState);
        Swal.fire(saveNumberResult)
    }

    return (
        <div className="p-3 m-3">
            <h3 className="text-center px-2 fw-bold" >Números de memos y notas</h3>
            <form onSubmit={handleSaveNumber}>
                <div className="mb-3">
                    <label htmlFor="memo" className="form-label fw-bold">Número de memorandum</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="memo"
                            placeholder="Número de memorandum"
                            required={true}
                            onChange={handleInputChange}
                            value={numberState.memo}
                        />
                    </div>
                    <div className="form-text">
                        Siguiente numero de memo
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="note" className="form-label fw-bold">Número de notas</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="note"
                            placeholder="Número de notas"
                            required={true}
                            onChange={handleInputChange}
                            value={numberState.note}
                        />
                    </div>
                    <div className="form-text">
                        Siguiente numero de nota
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-sm btn-secondary">Guardar</button>
                </div>
            </form>
            <hr />
            <h2>Variables</h2>
            <h3 className="text-center px-2 fw-bold" >Generar numero de memos y notas</h3>
            <table className="table">
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
            <table className="table">
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


InfoHelp.propTypes = {
    numberState: PropTypes.shape({
        note: PropTypes.number,
        memo: PropTypes.number
    }).isRequired,
    setNumberState: PropTypes.func.isRequired,
    saveNumber: PropTypes.func.isRequired
};