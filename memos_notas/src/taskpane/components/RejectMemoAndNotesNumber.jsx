import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const initialState = {
    id: "",
    to: "",
    subject: "",
    from: ""
}

export const RejectMemoAndNotesNumber = () => {

    const [searchNumber, setSearchNumber] = useState("");
    const [rejectInfo, setRejectInfo] = useState(initialState);

    const handleSearchData = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://172.20.70.46:8080/api/index.php?element=${searchNumber}`, {})
        if (response.ok) {
            const result = await response.json();
            if (result) {
                console.log(result);
                //{ "id": 154, "asunto": "Bueno funciona", "solicitado_por": "test", "dirigido_a": "esteban", "last": 1 }
                setRejectInfo({
                    id: result.id,
                    to: result.dirigido_a,
                    subject: result.asunto,
                    from: result.solicitado_por
                })
            } else {
                Swal.fire(
                    'Hay un problema',
                    'No existe el registro que busca o ya no se puede rechazar',
                    'warning'
                ).then(() => {
                    setRejectInfo(initialState)
                })
            }
        }
    }

    const handleRejectInfo = (params) => {
        // let response = await fetch(`http://172.20.70.46:8080/api/index.php?element=${searchNumber}`, {})
        // if (response.ok) {
        //     const result = await response.json();
        //     if (result) {
        //         console.log(result);
        //         //{ "id": 154, "asunto": "Bueno funciona", "solicitado_por": "test", "dirigido_a": "esteban", "last": 1 }
        //         setRejectInfo({
        //             id: result.id,
        //             to: result.dirigido_a,
        //             subject: result.asunto,
        //             from: result.solicitado_por
        //         })
        //     } else {

        //     }
        // }
    }

    return (
        <>
            <h3 className='text-center fw-bold'>Rechazar numero</h3>

            <form className='px-2' onSubmit={handleSearchData}>
                <div className="mb-3">
                    <label htmlFor="to" className="form-label fw-bold">Numero a rechazar</label>
                    <div className="input-group mb-3">

                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="to"
                            onChange={({ target }) => setSearchNumber(target.value)}
                            value={searchNumber}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-sm btn-secondary"
                >
                    buscar
                </button>
            </form>

            {
                rejectInfo.subject.length > 0 ?
                    <form className="px-2 mt-4"
                        onSubmit={handleRejectInfo}
                    >
                        <p className="fw-bold">Dirigido a:&nbsp;
                            <span className="fw-light">
                                {rejectInfo.to}
                            </span>
                        </p>
                        <p className="fw-bold">Asunto:&nbsp;
                            <span className="fw-light">
                                {rejectInfo.subject}
                            </span>
                        </p>
                        <p className="fw-bold">Solicitado por:&nbsp;
                            <span className="fw-light">
                                {rejectInfo.from}
                            </span>
                        </p>
                        <button
                            type="submit"
                            className="btn btn-sm btn-secondary"
                        >
                            Rechazar
                        </button>
                    </form>
                    : null
            }

        </>
    );
};
