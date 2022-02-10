//@ts-check
import moment from 'moment';
import { globals } from '../../../../globals';
import { addZeroToLeft, getLocalStorageUserEmail, getLocalStorageUserInitials, isMemo } from '../../../utils';
import 'moment/locale/es-us';
import Swal from 'sweetalert2';
moment.locale("es-mx")

const loadWordVars = async (addresseeState, memoOrNoteState, form) => {
    try {
        await Word.run(async (context) => {
            /**
             * Obtener variables dinámicas
             */
            const numMemoOrNoteControl = context.document.body.contentControls.getByTag(
                isMemo(memoOrNoteState)
                    ? "num_memo"
                    : "num_note"
            );
            const yearControl = context.document.body.contentControls.getByTag("year");
            const dateControl = context.document.body.contentControls.getByTag("date");

            /**
             * Obtener variables del memo o nota
             */
            const requestControl = context.document.body.contentControls.getByTag("request");
            const subjectControl = context.document.body.contentControls.getByTag("subject");

            /**
             * Obtener variables de destinatario
             */
            const addresseeNameControl = context.document.body.contentControls.getByTag("addressee_name");
            const addresseeJobTitleControl = context.document.body.contentControls.getByTag("addressee_job_title");
            const addresseeArchetypeControl = context.document.body.contentControls.getByTag("addressee_archetype");
            const addresseeDepartmentControl = context.document.body.contentControls.getByTag("addressee_department");
            const initialsControl = context.document.body.contentControls.getByTag("initials");

        
            /**
             * Cargar variables dinamicas
             */
            context.load(numMemoOrNoteControl)
            context.load(yearControl)
            context.load(dateControl)
            context.load(initialsControl)

            /**
             * Cargar variables de memo o notas
             */
            context.load(requestControl)
            context.load(subjectControl)

            /**
             * Cargar variables destinatario
             */
            context.load(addresseeNameControl)
            context.load(addresseeJobTitleControl)
            context.load(addresseeArchetypeControl)
            context.load(addresseeDepartmentControl)


            await context.sync();
            const response = await fetchData(addresseeState, memoOrNoteState, form);
            if (response) {
                /**
                 * insertar texto variables dinámicas
                 */
                numMemoOrNoteControl.items[0]?.insertText(addZeroToLeft(response.id.toString()), "Replace");
                yearControl.items[0]?.insertText(moment().year().toString(), "Replace");
                dateControl.items[0]?.insertText(moment().format('LL').toString(), "Replace");
                initialsControl.items[0]?.insertText(getLocalStorageUserInitials(), "Replace");

                console.log("control",initialsControl.items.length)

                /**
                 * insertar texto variables memos o notas
                 */
                subjectControl.items[0]?.insertText(form.subject, "Replace");
                requestControl.items[0]?.insertText(form.from, "Replace");

                /**
                 * insertar texto variables destinatario
                 */
                addresseeNameControl.items[0]?.insertText(addresseeState[form.to].name, "Replace");
                addresseeJobTitleControl.items[0]?.insertText(addresseeState[form.to].jobTitle, "Replace");
                addresseeArchetypeControl.items[0]?.insertText(addresseeState[form.to].archetype, "Replace");
                addresseeDepartmentControl.items[0]?.insertText(addresseeState[form.to].department, "Replace");

                Swal.fire(
                    'Hecho',
                    'La información esta lista',
                    'success'
                );

            } else {
                Swal.fire(
                    'Hay un problema',
                    'Error al consultar base de datos',
                    'error'
                );
            }
        })
    } catch (e) {
        Swal.fire(
            "Hecho",
            "No se puede editar el documento, revise si el documento actual no tiene controles bloqueados." + e,
            "error"
        )
    }
};

const fetchData = async (addresseeState, memoOrNoteState, form) => {

    /**
     * 1 = memo
     * 2 = note
     */

    const formdata = new FormData()
    formdata.append("dirigido", addresseeState[form.to].department)
    formdata.append("asunto", form.subject)
    formdata.append("solicitado", getLocalStorageUserEmail())
    formdata.append("date", moment().format('L'))
    var requestOptions = {
        method: 'POST',
        body: formdata
    };

    let response = await fetch(`${globals.apiUrl}?action=set_number&type=${memoOrNoteState}`, requestOptions)

    if (response.ok) {
        return await response.json();
    }
    return false
}

export {
    loadWordVars
}