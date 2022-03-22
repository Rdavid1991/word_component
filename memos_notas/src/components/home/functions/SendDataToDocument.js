/* globals Word */
import moment from "moment";
import { addZeroToLeft, getLocalStorageUserInitials } from "src/utils";
moment.locale("es-mx");

import { AddresseeControls, CompensatoryTime, DocumentMemoOrNotesControls, DocumentRequestControls, FunctionaryControls } from "src/utils/constants";

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
    },

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
 * @param {Array} form.cc - Posición en el array addresseeState
 * @param {Object} functionary 
 * @param {String} functionary.id 
 * @param {String} functionary.name 
 * @param {String} functionary.id_card 
 * @param {String} functionary.job_title 
 * @param {String} functionary.position_number 
 */
    SendDataToMemoOrNote: async (addresseeState, id, form, functionary) => {
        await Word.run(async (context) => {

            const memoAndNoteControls = {
                ...DocumentMemoOrNotesControls,
                ...AddresseeControls,
                ...FunctionaryControls
            };

            const controls = loadControls(
                context,
                getControlsByTag(context, memoAndNoteControls),
                memoAndNoteControls
            );

            await context.sync();

            Object.entries(controls).map((entry) => {
                const [key, control] = entry;

                switch (key) {
                    case Object.keys(memoAndNoteControls)[0]:
                        insertTextControl(control, addZeroToLeft(id.toString()));
                        break;
                    case Object.keys(memoAndNoteControls)[1]:
                        insertTextControl(control, addZeroToLeft(id.toString()));
                        break;
                    case Object.keys(memoAndNoteControls)[2]:
                        insertTextControl(control, moment().year().toString());
                        break;
                    case Object.keys(memoAndNoteControls)[3]:
                        insertTextControl(control, moment().format("LL").toString());
                        break;
                    case Object.keys(memoAndNoteControls)[4]:
                        insertTextControl(control, form.from);
                        break;
                    case Object.keys(memoAndNoteControls)[5]:
                        insertTextControl(control, form.subject);
                        break;
                    case Object.keys(memoAndNoteControls)[6]:
                        insertTextControl(control, getLocalStorageUserInitials().toLowerCase());
                        break;
                    case Object.keys(memoAndNoteControls)[7]:
                        insertTextControl(control, addresseeState[form.to].name);
                        break;
                    case Object.keys(memoAndNoteControls)[8]:
                        insertTextControl(control, addresseeState[form.to].jobTitle);
                        break;
                    case Object.keys(memoAndNoteControls)[9]:
                        insertTextControl(control, addresseeState[form.to].archetype);
                        break;
                    case Object.keys(memoAndNoteControls)[10]:
                        insertTextControl(control, addresseeState[form.to].department);
                        break;
                    case Object.keys(memoAndNoteControls)[11]:
                        insertTextControl(control, functionary?.name);
                        break;
                    case Object.keys(memoAndNoteControls)[12]:
                        insertTextControl(control, functionary?.id_card);
                        break;
                    case Object.keys(memoAndNoteControls)[13]:
                        insertTextControl(control, functionary?.job_title);
                        break;
                    case Object.keys(memoAndNoteControls)[14]:
                        insertTextControl(control, functionary?.position_number.toString());
                        break;
                    default:
                        break;
                }
                return null;
            });
        });

        await Word.run(async (context) => {
            const table = context.document.body.tables.getFirst().rows;
            context.load(table);

            await context.sync();

            table.items[0].insertRows(Word.InsertLocation.after, form.cc.length, [""][""]);

            
        });

        await Word.run(async (context) => {
            const table = context.document.body.tables.getFirst().rows;
            context.load(table);

            await context.sync();

            const cells = [];
            //form.cc.map((item, index) => {
                //console.log(index +1);
                cells.push(table.items[1].cells);
                cells.push(table.items[2].cells);
            //});

            //cells.map((item) => {
                context.load(cells[0]);
                context.load(cells[1]);
            //});

            await context.sync();

            //cells.map((item, index) => {
                //console.log(item);
                cells[0].items[0].body.insertText("CC:", Word.InsertLocation.replace);
                cells[0].items[1].body.insertText(`${addresseeState[form.cc[0]].archetype} ${addresseeState[form.cc[0]].name}` +"\n" + addresseeState[form.cc[0]].jobTitle, Word.InsertLocation.replace);
                cells[1].items[0].body.insertText("CC:", Word.InsertLocation.replace);
                cells[1].items[1].body.insertText(addresseeState[form.cc[1]].name, Word.InsertLocation.replace);
            //});

            
        });

    }

};

