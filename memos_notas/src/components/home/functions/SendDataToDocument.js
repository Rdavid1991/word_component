/* globals Word */
import moment from "moment";
moment.locale("es-mx");

import { CompensatoryTime, DocumentRequestControls, FunctionaryControls } from "src/utils/constants";

/**
   * Obtener controles del documento y agruparlos por sección: encabezado, cuerpo, pie de pagina
   * @param {Word.RequestContext} context
   * @param {Object<string, string>} variables
   * @returns {object} Retornar JSOn con nombre de la etiqueta como llave. 
   */
const getControlsByTag = (context, variables) => {
    let arrayControls = {};

    Object.keys(variables).forEach((tag) => {
        arrayControls = {
            ...arrayControls,
            [tag]: context.document.contentControls.getByTag(tag),
        };
    });
    return arrayControls;
};

/**
 * @param {Word.RequestContext} context
 * @param {Object<string,Word.ContentControl>} controls
 * @param {Object<string,string>} variables
 * @returns {object}
 */
const loadControls = (context, controls, variables) => {
    Object.keys(variables).forEach((tag) => {
        context.load(controls[tag]);
    });

    return controls;
};

/**
 * Insertar texto en el control
 * @param {Word.ContentControlCollection} control
 * @param {string} text
 */
const insertTextControl = (control, text) => {
    control.items[0]?.insertText(text, "Replace");
};


export const SendDataToDocument = {

    sendToCompensatoryRequest: (values, functionary) => {

        return Word.run(async (context) => {

            const DPRC = { ...FunctionaryControls, ...CompensatoryTime };

            const controls = loadControls(
                context,
                getControlsByTag(context, DPRC),
                DPRC
            );

            await context.sync();

            Object.entries(controls).map((entry) => {
                const [key, control] = entry;

                switch (key) {
                    case Object.keys(DPRC)[0]:
                        insertTextControl(control, functionary.name);
                        break;
                    case Object.keys(DPRC)[1]:
                        insertTextControl(control, functionary.id_card);
                        break;
                    case Object.keys(DPRC)[2]:
                        insertTextControl(control, functionary.job_title);
                        break;
                    case Object.keys(DPRC)[3]:
                        insertTextControl(control, functionary.position_number.toString());
                        break;
                    case Object.keys(DPRC)[4]:
                        insertTextControl(control, moment(values.from).format("hh:mm a"));
                        break;
                    case Object.keys(DPRC)[5]:
                        insertTextControl(control, moment(values.to).format("hh:mm a"));
                        break;
                    case Object.keys(DPRC)[6]:
                        insertTextControl(control, moment(values.date).format("DD"));
                        break;
                    case Object.keys(DPRC)[7]:
                        insertTextControl(control, moment(values.date).format("MMMM"));
                        break;
                    case Object.keys(DPRC)[8]:
                        insertTextControl(control, moment(values.date).format("YYYY"));
                        break;
                    default:
                        break;
                }
            });
        });
    }


};
