/* globals Word */
import moment from "moment";
import { addZeroToLeft, getLocalStorageUserInitials } from "src/utils";
import { AddresseeControls, CompensatoryTime, MemorandumControls, FunctionaryControls } from "src/utils/constants";
moment.locale("es-mx");

//import { AddresseeControls, CompensatoryTime, DocumentMemoOrNotesControls, DocumentRequestControls, FunctionaryControls } from "src/utils/constants";
import { FunctionarySchema, AddresseesSchema, SelectedMemorandumOrNoteState } from '../helpers/interface/index';




export const SendDataToDocument = {

   

    /**
 * Cargar documento
 * @param addressee 
 * @param id 
 * @param form 
 * @param functionary 
 */
    /* SendDataToMemoOrNote: async (addressee : Array<AddresseesSchema>, id : number, form : SelectedMemorandumOrNoteState, functionary : FunctionarySchema) => {
        await Word.run(async (context) => {
    
            const memoAndNoteControls = {
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
                    insertTextControl(control, addressee[form.to].name);
                    break;
                case Object.keys(memoAndNoteControls)[8]:
                    insertTextControl(control, addressee[form.to].jobTitle);
                    break;
                case Object.keys(memoAndNoteControls)[9]:
                    insertTextControl(control, addressee[form.to].archetype);
                    break;
                case Object.keys(memoAndNoteControls)[10]:
                    insertTextControl(control, addressee[form.to].department);
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
    
        
    
    }, */

    /*  sendToCompensatoryRequest: async (values, functionary) => {

        return await Word.run(async (context) => {

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
                    insertTextControl(control, moment(values.from, "HH:mm").format("hh:mm a"));
                    break;
                case Object.keys(DPRC)[5]:
                    insertTextControl(control, moment(values.to, "HH:mm").format("hh:mm a"));
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
    }, */



};

