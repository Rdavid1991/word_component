import { AlertError, AlertSuccess } from "src/utils/Alerts";
import { sendDataToNote } from "../documents/sendDataToNote";

export const selectedNoteSubmit = async (functionaries, addressee, form, setSelectedState) => {

    sendDataToNote ( form , addressee  )
        .then(() => {
            AlertSuccess('La información esta lista');
            setSelectedState("");
        })
        .catch((err) => {
            AlertError("No se puede editar el documento" + err,);
        });
};
