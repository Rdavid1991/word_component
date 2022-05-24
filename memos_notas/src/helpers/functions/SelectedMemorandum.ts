import moment from "moment";
import { FormEvent } from "react";
import { SendDataToDocument } from "src/utils/SendDataToDocument";
import { getLocalStorageUserDepartment, getLocalStorageUserEmail } from "src/utils";
import { AlertError, AlertSuccess, AlertWarning } from "src/utils/Alerts";
import { apiRequest } from "src/utils/apiRequest";
import { AddresseesSchema, SelectedMemorandumOrNoteState } from '../interface/index';


const fetchData = async (addressee: Array<AddresseesSchema>, memoOrNoteState, form: SelectedMemorandumOrNoteState) => {

    const params = {
        "dirigido": addressee[form.to].department,
        "asunto": form.subject,
        "solicitado": getLocalStorageUserEmail(),
        "date": moment().format("L"),
        "department_owner": getLocalStorageUserDepartment()
    };

    const response = await apiRequest().post(`set_number&type=${memoOrNoteState}`, params);
    if (response.ok) {
        return await response.json();
    }
    return false;
};

export const SelectedMemorandumSubmit = async (functionaries, addressee, memoOrNoteState, form, setSelectedState) => {

    if (parseInt(memoOrNoteState) > 0) {

        const { data } = await fetchData(addressee, memoOrNoteState, form);

        if (data.length > 0) {

            const functionaryFound = functionaries.find((f) => parseInt(f.id) === parseInt(form.functionary));

            SendDataToDocument.SendDataToMemoOrNote(addressee, data[0].consecutive, form, functionaryFound)
                .then(() => {
                    AlertSuccess('La información esta lista');
                    setSelectedState("");
                })
                .catch((err) => {
                    AlertError("No se puede editar el documento" + err,);
                });
        } else {
            await AlertError('Error al consultar base de datos o no existen registros');
        }
    } else {
        await AlertWarning("Es memo o nota?");
    }
};
