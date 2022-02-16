//@ts-check
/* global Word */
import { AlertError, AlertSuccess } from "src/utils/Alerts";


/**
     * Escribir documento
     * @param {object}  template Template del documento 
     * @param {string}  template.body 
     * @param {string}  template.header 
     * @param {string}  template.footer 
     */
export const writeDocument = async (template) => {
    Word.run(async (context) => {
        try {

            const body = context.document.body;
            const header = context.document.sections.getFirst().getHeader("Primary");
            const footer = context.document.sections.getFirst().getFooter("Primary");

            body.clear();
            header.clear();
            footer.clear();

            body.insertOoxml(template.body.toString(), Word.InsertLocation.start);
            header.insertOoxml(template.header.toString(), Word.InsertLocation.start);
            footer.insertOoxml(template.footer.toString(), Word.InsertLocation.start);

            await context.sync()
            AlertSuccess("Documento cargado satisfactoriamente")
        } catch (error) {
            AlertError("No se puede cargar documento, revise si el documento actual no tiene controles bloqueados. " + error)
        }
    })
};