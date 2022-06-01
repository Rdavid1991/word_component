import React from 'react';
import { AddresseeControls, CompensatoryTime, DepartmentControls, DocumentRequestControls, FunctionaryControls } from 'src/utils/constants';
import { localStorageAdminKey, localStorageKeyUser } from 'src/utils';
import { apiRequest } from '../utils/apiRequest';
import { MemorandumControls } from '../utils/constants';

const InfoHelp = () => {


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
            <h4>Variables</h4>
            <h5 className="font-weight-bold" >Generar numero de memos y notas</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(MemorandumControls).map(renderVariables)}
                </tbody>
            </table>
            <h5 className="text-center px-2 font-weight-bold" >Destinatario</h5>
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
            <h5 className="text-center px-2 font-weight-bold" >Funcionarios</h5>
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
            <h5 className="text-center px-2 font-weight-bold" >Solicitud de permiso</h5>
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
            <h5 className="text-center px-2 font-weight-bold" >Uso de tiempo compensatorio</h5>
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
            <h5 className="text-center px-2 font-weight-bold" >Variable Departamentos</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Campo</th>
                        <th scope="col">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(DepartmentControls).map(renderVariables)
                    }
                </tbody>
            </table>

            <div className="d-flex justify-content-around">
                <button
                    className='btn btn-secondary btn-sm'
                    type='button'
                    onClick={() => {
                        localStorage.removeItem(localStorageKeyUser)
                        localStorage.removeItem(localStorageAdminKey)
                        window.location.reload()
                    }}
                >
                    Borrar datos de usuario
                </button>
                <button
                    className='btn btn-secondary btn-sm'
                    onClick={async () => {
                        await apiRequest().get("clear_cache", {})
                        window.location.reload()
                    }}
                >
                    Borra cache
                </button>

            </div>

        </div>
    );
};

export default React.memo(InfoHelp);