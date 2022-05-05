//@ts-check
/* global Word */
import { AlertConfirmQuestion } from "src/utils/Alerts";

export const readDocument = async () => {

    const result = await AlertConfirmQuestion("¿Desea guardar nueva plantilla?");

    if (result) {

        return Word.run(async (context) => {

            const docBody = context.document.body;
            const docFooter = context.document.sections.getFirst().getFooter("Primary");
            const docHeader = context.document.sections.getFirst().getHeader("Primary");

            const docBodyOoxml = docBody.getOoxml();
            const docFooterOoxml = docFooter.getOoxml();
            const docHeaderOoxml = docHeader.getOoxml();

            await context.sync();

            return JSON.stringify({
                "body"  : docBodyOoxml.value,
                "footer": docFooterOoxml.value,
                "header": docHeaderOoxml.value,
            });
        });
    }

    return false;
};

export const clearDocument = async () => {

    return Word.run(async (context) => {

        const docBody = context.document.body;
        const docFooter = context.document.sections.getFirst().getFooter("Primary");
        const docHeader = context.document.sections.getFirst().getHeader("Primary");

        docBody.clear();
        docFooter.clear();
        docHeader.clear();

        await context.sync();
    });
};

/**
     * Escribir documento
     * @param {Object}  template Template del documento 
     * @param {String}  template.body 
     * @param {String}  template.header 
     * @param {String}  template.footer 
     */
export const writeDocument = async (template) => {
    return await Word.run(async (context) => {

        const body = context.document.body;
        const headerContext = context.document.sections;
        const footerContext = context.document.sections;

        context.load(headerContext);
        context.load(footerContext);

        await context.sync();

        const header = headerContext.items[0].getHeader("Primary");
        const footer = footerContext.items[0].getFooter("Primary");
        
        body.clear();
        header.clear();
        footer.clear();

        body.insertOoxml(template.body.toString(), Word.InsertLocation.replace);
        header.insertOoxml(template.header.toString(), Word.InsertLocation.replace);
        footer.insertOoxml(template.footer.toString(), Word.InsertLocation.replace);

        return await context.sync();
    });
};