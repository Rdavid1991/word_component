import moment from "moment";
import "moment/locale/es-us";
import { DocumentRequestControls, FunctionaryControls } from "src/utils/constants";
import { getControlsByTag, insertTextControl, loadControls } from '../functions/processingWordControls';
import { FunctionarySchema, PermissionRequestSchema } from '../interface/index';
moment.locale("es-mx");

/**
 * Enviar datos a documento solicitud de permiso
 * @param values 
 * @param functionary 
 */
export const sendDataToPermissionRequest = async (values : PermissionRequestSchema, functionary : FunctionarySchema) => {

    await Word.run(async (context) => {

        const controls = getControlsByTag(context, DocumentRequestControls);
        loadControls(context, controls, DocumentRequestControls);

        await context.sync();

        Object.entries(controls).map((entry) => {
            const [key, control] = entry;

            switch (key) {
                // Insertar hora desde
                case Object.keys(DocumentRequestControls)[0]:
                    insertTextControl(control, moment(values.from).format("hh:mm a"));
                    break;

                // Insertar dia desde
                case Object.keys(DocumentRequestControls)[1]:
                    insertTextControl(control, moment(values.from).format("DD"));
                    break;

                // Insertar mes desde
                case Object.keys(DocumentRequestControls)[2]:
                    insertTextControl(control, moment(values.from).format("MMMM"));
                    break;

                // Insertar año desde
                case Object.keys(DocumentRequestControls)[3]:
                    insertTextControl(control, moment(values.from).format("YYYY"));
                    break;


                // Insertar hora hasta    
                case Object.keys(DocumentRequestControls)[4]:
                    insertTextControl(control, moment(values.to).format("hh:mm a"));
                    break;

                // Insertar dia hasta    
                case Object.keys(DocumentRequestControls)[5]:
                    insertTextControl(control, moment(values.to).format("DD"));
                    break;

                // Insertar mes hasta    
                case Object.keys(DocumentRequestControls)[6]:
                    insertTextControl(control, moment(values.to).format("MMMM"));
                    break;

                // Insertar año hasta    
                case Object.keys(DocumentRequestControls)[7]:
                    insertTextControl(control, moment(values.to).format("YYYY"));
                    break;
            
                default:
                    break;
            }
        });
    });

    //Cargar funcionario
    await Word.run(async (context) => { 
        const controls = getControlsByTag(context, FunctionaryControls);
        await loadControls(context, controls,FunctionaryControls)

        Object.entries(controls).map((entry) => {
            const [key, control] = entry;

            switch (key) {
            
                // Insertar cédula
                case Object.keys(FunctionaryControls)[0]:
                    insertTextControl(control, functionary?.id_card);
                    break;
                
                // Insertar Puesto de trabajo
                case Object.keys(FunctionaryControls)[1]:
                    insertTextControl(control, functionary?.job_title);
                    break;

                //Insertar nombre
                case Object.keys(FunctionaryControls)[2]:
                    insertTextControl(control, functionary?.name);
                    break;

                // Insertar numero de posición
                case Object.keys(FunctionaryControls)[3]:
                    insertTextControl(control, functionary?.position_number.toString());
                    break;
            
                default:
                    break;
                
            }
        })
    })

};



/**
 * 
 * @param {EventTarget & HTMLSelectElement} target 
 */
const selectedDocumentType = (target) => {

    let type = "";
    if (target.selectedOptions[0].dataset) {
        type = target.selectedOptions[0].dataset.type;
    } else {
        type = target.selectedOptions[0].getAttribute("data-type");
    }
    return type;

};

export {  selectedDocumentType };
