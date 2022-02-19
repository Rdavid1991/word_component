//@ts-check
/* global Word */
import moment from "moment";
import { globals } from "src/globals";
import {
  addZeroToLeft,
  getLocalStorageUserEmail,
  getLocalStorageUserInitials,
} from "src/utils";
import "moment/locale/es-us";
import { ControlsVariables } from "src/utils/constants";
moment.locale("es-mx");

/**
 * Obtener controles del documento y agruparlos por sección: encabezado, cuerpo, pie de pagina
 * @param {Word.RequestContext} context
 * @returns {object} Retornar JSOn con nombre de la etiqueta como llave. Ejemplo: [tag] :{body: [control], footer:[control],header:[control]}
 */
const getControlsByTag = (context) => {
  let arrayControls = {};

  Object.values(ControlsVariables).forEach((tag) => {
    arrayControls = {
      ...arrayControls,
      [tag]: {
        body: context.document.body.contentControls.getByTag(tag),
        footer: context.document.sections
          .getFirst()
          .getFooter("Primary")
          .contentControls.getByTag(tag),
        header: context.document.sections
          .getFirst()
          .getHeader("Primary")
          .contentControls.getByTag(tag),
      },
    };
  });
  return arrayControls;
};

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
    context.load(controls[tag].body);
    context.load(controls[tag].footer);
    context.load(controls[tag].header);
  });

  return controls;
};

/**
 * Insertar texto en el control
 * @param {Object} control
 * @param {Word.ContentControlCollection} control.body
 * @param {Word.ContentControlCollection} control.header
 * @param {Word.ContentControlCollection} control.footer
 * @param {string} text
 */
const insertTextControl = (control, text) => {
  control.body.items[0]?.insertText(text, "Replace");
  control.header.items[0]?.insertText(text, "Replace");
  control.footer.items[0]?.insertText(text, "Replace");
};

/**
 * Cargar documento
 * @param {Object[]} addresseeState
 * @param {string} addresseeState[].name
 * @param {string} addresseeState[].jobTitle
 * @param {string} addresseeState[].archetype
 * @param {string} addresseeState[].department
 * @param {Object} form
 * @param {string} form.from - Remitente de memo o nota
 * @param {string} form.subject - Asunto de memo o nota
 * @param {string} form.to - Posición en el array addresseeState
 */
const loadWordVars = async (addresseeState, id, form) => {
  await Word.run(async (context) => {
    const controls = loadControls(context, getControlsByTag(context));

    await context.sync();

    Object.entries(controls).map((entry) => {
      const [key, control] = entry;

      switch (key) {
        case ControlsVariables.num_memo:
          insertTextControl(control, addZeroToLeft(id.toString()));
          break;
        case ControlsVariables.num_note:
          insertTextControl(control, addZeroToLeft(id.toString()));
          break;
        case ControlsVariables.year:
          insertTextControl(control, moment().year().toString());
          break;
        case ControlsVariables.date:
          insertTextControl(control, moment().format("LL").toString());
          break;
        case ControlsVariables.request:
          insertTextControl(control, form.from);
          break;
        case ControlsVariables.subject:
          insertTextControl(control, form.subject);
          break;
        case ControlsVariables.addressee_name:
          insertTextControl(control, addresseeState[form.to].name);
          break;
        case ControlsVariables.addressee_job_title:
          insertTextControl(control, addresseeState[form.to].jobTitle);
          break;
        case ControlsVariables.addressee_archetype:
          insertTextControl(control, addresseeState[form.to].archetype);
          break;
        case ControlsVariables.addressee_department:
          insertTextControl(control, addresseeState[form.to].department);
          break;
        case ControlsVariables.initials:
          insertTextControl(control, getLocalStorageUserInitials());
          break;
        default:
          break;
      }
      return null;
    });
  });
};

/**
 *
 * @param {Array} addresseeState
 * @param {number} memoOrNoteState
 * @param {Object} form
 * @returns
 */
const fetchData = async (addresseeState, memoOrNoteState, form) => {
  /**
   * 1 = memo
   * 2 = note
   */

  const formData = new FormData();
  formData.append("dirigido", addresseeState[form.to].department);
  formData.append("asunto", form.subject);
  formData.append("solicitado", getLocalStorageUserEmail());
  formData.append("date", moment().format("L"));
  var requestOptions = {
    method: "POST",
    body: formData,
  };

  let response = await fetch(
    `${globals.apiUrl}?action=set_number&type=${memoOrNoteState}`,
    requestOptions
  );

  if (response.ok) {
    return await response.json();
  }
  return false;
};

export { loadWordVars, fetchData };
