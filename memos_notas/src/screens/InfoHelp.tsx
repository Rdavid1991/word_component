import React, { useContext, useState } from 'react';
//import Swal from 'sweetalert2';
import { globals } from 'src/globals';
import { context } from 'src/context/context';
import { AddresseeControls, CompensatoryTime, DocumentMemoOrNotesControls, DocumentRequestControls, FunctionaryControls } from 'src/utils/constants';
import { saveConsecutiveNumber } from 'src/utils/SaveAndGet';

const InfoHelp = ({ initialNumber }) => {

    const [numberState, setNumberState] = useState(initialNumber)

    const { showLoader } = useContext(context);
    const handleInputChange = ({ target }) => {
        setNumberState({
            ...numberState,
            [target.id]: target.value
        });
    };

    const handleSaveNumber = async (e) => {
        e.preventDefault();
        /* const { isConfirmed } = await Swal.fire({
            title             : "Cuidado",
            text              : "va a cambiar el numero inicial de los memos o notas, verifique que sea el numero correcto antes de continuar",
            icon              : "question",
            showCancelButton  : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor : '#d33',
            confirmButtonText : 'Continuar'
        }); */

        /* if (isConfirmed) {
            showLoader(true);
            const saveNumberResult = await saveConsecutiveNumber(numberState);
            showLoader(false);

            if (saveNumberResult) {
                //await Swal.fire(saveNumberResult);
            }
        } */
    };

    /**
     * 
     * @param {React.MouseEvent<HTMLButtonElement>} e 
     */
    const HandleCopyToCLipBoard = (e) => {

        const { value } = e.target.dataset;

        /*  Swal.fire({
             title            : "Hecho",
             html             : `<p>Se copio <b>${value}</b></p>`,
             toast            : true,
             timer            : 1500,
             icon             : "success",
             showConfirmButton: false,
             position         : 'bottom',
             color            : "#fff",
             background       : "#8B8C89"
         }); */
        navigator.clipboard.writeText(value);
    };

    const renderVariables = (entry, index) => {
        const [key, value] = entry;
        return (
            <tr key={index}>
                <td className="font-weight-bold">{value}</td>
                <td>{key}</td>
                <td
                    className="btn"
                    data-value={key}
                    onClick={HandleCopyToCLipBoard}
                >
                    <i className="far fa-copy"></i>
                </td>
            </tr>
        );
    };

    return (
        <div className="p-3">
            <h3 className="text-center px-2 font-weight-bold" >Números de memos y notas</h3>
            <form onSubmit={handleSaveNumber}>
                <div className="mb-3">
                    <label htmlFor="memo" className="form-label font-weight-bold">Número de memorandum</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        <input
                            type="number"
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
                    <label htmlFor="note" className="form-label font-weight-bold">Número de notas</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        <input
                            type="number"
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
            <h3 className="font-weight-bold" >Generar numero de memos y notas</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(DocumentMemoOrNotesControls).map(renderVariables)}
                </tbody>
            </table>
            <h3 className="text-center px-2 font-weight-bold" >Destinatario</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(AddresseeControls).map(renderVariables)}
                </tbody>
            </table>
            <h3 className="text-center px-2 font-weight-bold" >Funcionarios</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(FunctionaryControls).map(renderVariables)
                    }
                </tbody>
            </table>
            <h3 className="text-center px-2 font-weight-bold" >Solicitud de permiso</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(DocumentRequestControls).map(renderVariables)
                    }
                </tbody>
            </table>
            <h3 className="text-center px-2 font-weight-bold" >Uso de tiempo compensatorio</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(CompensatoryTime).map(renderVariables)
                    }
                </tbody>
            </table>

            <button
                type='button'
                onClick={() => {
                    localStorage.removeItem("infoUser")
                    window.location.reload()
                }}
            >
                Borrar datos de usuario
            </button>

        </div>
    );
};

export default React.memo(InfoHelp);