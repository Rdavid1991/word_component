//@ts-check
/* global Word */
import { AlertConfirmQuestion } from "src/utils/Alerts";

export const readDocument = async () => {

    const result = await AlertConfirmQuestion("¿Desea guardar nueva plantilla?");

    if (result.isConfirmed) {

        return Word.run(async (context) => {

            const docBody = context.document.body.getOoxml();
            const docFooter = context.document.sections.getFirst().getFooter("Primary").getOoxml();
            const docHeader = context.document.sections.getFirst().getHeader("Primary").getOoxml();
            await context.sync();

            return JSON.stringify({
                "body"  : docBody.value,
                "footer": docFooter.value,
                "header": docHeader.value,
            });
        });
    }

    return false;
};

/**
     * Escribir documento
     * @param {object}  template Template del documento 
     * @param {string}  template.body 
     * @param {string}  template.header 
     * @param {string}  template.footer 
     */
export const writeDocument = async (template) => {
    return await Word.run(async (context) => {

        const body = context.document.body;
        const header = context.document.sections.getFirst().getHeader("Primary");
        const footer = context.document.sections.getFirst().getFooter("Primary");

        body.clear();
        header.clear();
        footer.clear();

        body.insertOoxml(template.body.toString(), Word.InsertLocation.start);
        header.insertOoxml(template.header.toString(), Word.InsertLocation.start);
        footer.insertOoxml(template.footer.toString(), Word.InsertLocation.start);

        return await context.sync();
    });
};