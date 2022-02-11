//@ts-check
import moment from 'moment';
import { globals } from '../../../../globals';
import { addZeroToLeft, getLocalStorageUserEmail, getLocalStorageUserInitials, isMemo } from '../../../utils';
import 'moment/locale/es-us';
import Swal from 'sweetalert2';
import { ControlsVariables } from '../../../utils/controlsVariables';
moment.locale("es-mx")

/**
 * 
 * @param {Word.RequestContext} context 
 * @returns {object}
 */
const getControlsByTag = (context) => {

    let arrayControls = {}

    Object.values(ControlsVariables).forEach((tag) => {

        arrayControls = {
            ...arrayControls,
            [tag]: {
                body: context.document.body.contentControls.getByTag(tag),
                footer: context.document.sections.getFirst().getFooter("Primary").contentControls.getByTag(tag),
                header: context.document.sections.getFirst().getHeader("Primary").contentControls.getByTag(tag)
            }
        }
    });
    return arrayControls;
}

/**
 * @param {Word.RequestContext} context 
 * @param {Object[]} controls
 * @param {Word.ContentControl} controls[].body
 * @param {Word.ContentControl} controls[].footer
 * @param {Word.ContentControl} controls[].header
 * @returns {object}
 */
const loadControls = (context, controls) => {

    Object.values(ControlsVariables).forEach((tag) => {
        context.load(controls[tag].body)
        context.load(controls[tag].footer)
        context.load(controls[tag].header)

    });

    return controls;
}


/**
 * @param {Object} control
 * @param {Word.ContentControlCollection} control.body 
 * @param {Word.ContentControlCollection} control.header 
 * @param {Word.ContentControlCollection} control.footer
 * @param {string} text
 */
const insertTextControl = (control, text) => {
    control.body.items[0]?.insertText(text, "Replace")
    control.header.items[0]?.insertText(text, "Replace")
    control.footer.items[0]?.insertText(text, "Replace")
}

const loadWordVars = async (addresseeState, memoOrNoteState, form) => {
    try {
        await Word.run(async (context) => {

            const controls = loadControls(context, getControlsByTag(context))

            await context.sync();
            const response = await fetchData(addresseeState, memoOrNoteState, form);
            if (response) {

                Object.entries(controls).map((entry) => {

                    const [key, control] = entry

                    switch (key) {

                        case ControlsVariables.num_memo:
                            insertTextControl(control, addZeroToLeft(response.id.toString()))
                            break;
                        case ControlsVariables.num_note:
                            insertTextControl(control, addZeroToLeft(response.id.toString()))
                            break;
                        case ControlsVariables.year:
                            insertTextControl(control, moment().year().toString())
                            break;
                        case ControlsVariables.date:
                            insertTextControl(control, moment().format('LL').toString())
                            break;
                        case ControlsVariables.request:
                            insertTextControl(control, form.from)
                            break;
                        case ControlsVariables.subject:
                            insertTextControl(control, form.subject)
                            break;
                        case ControlsVariables.addressee_name:
                            insertTextControl(control, addresseeState[form.to].name)
                            break;
                        case ControlsVariables.addressee_job_title:
                            insertTextControl(control, addresseeState[form.to].jobTitle)
                            break;
                        case ControlsVariables.addressee_archetype:
                            insertTextControl(control, addresseeState[form.to].archetype)
                            break;
                        case ControlsVariables.addressee_department:
                            insertTextControl(control, addresseeState[form.to].department)
                            break;
                        case ControlsVariables.initials:
                            insertTextControl(control, getLocalStorageUserInitials())
                            break;

                        default:
                            break;
                    }

                })


                // /**
                //  * insertar texto variables memos o notas
                //  */
                // subjectControl.items[0]?.insertText(form.subject, "Replace");
                // requestControl.items[0]?.insertText(form.from, "Replace");

                // /**
                //  * insertar texto variables destinatario
                //  */
                // addresseeNameControl.items[0]?.insertText(addresseeState[form.to].name, "Replace");
                // addresseeJobTitleControl.items[0]?.insertText(addresseeState[form.to].jobTitle, "Replace");
                // addresseeArchetypeControl.items[0]?.insertText(addresseeState[form.to].archetype, "Replace");
                // addresseeDepartmentControl.items[0]?.insertText(addresseeState[form.to].department, "Replace");

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