import { DepartmentSchema } from "src/helpers/interface";
import { AlertConfirmQuestion } from "src/utils/Alerts";

export const readDocument = async () => {

    const result = await AlertConfirmQuestion("¿Desea guardar nueva plantilla?");

    if (result) {

        return Word.run(async (context) => {

            const docBody = context.document.body;
            const docFooter = context.document.sections;
            const docHeader = context.document.sections;

            context.load(docFooter);
            context.load(docHeader);

            await context.sync();


            const docBodyOoxml = docBody.getOoxml();
            const docFooterOoxml = docFooter.items[0].getFooter("Primary").getOoxml();
            const docHeaderOoxml = docHeader.items[0].getHeader("Primary").getOoxml();


            await context.sync();


            return JSON.stringify({
                "body"   : docBodyOoxml.value,
                "footer" : docFooterOoxml.value,
                "header" : docHeaderOoxml.value,
            });
        });
    }

    return false;
};

export const clearDocument = async () => {

    return Word.run(async (context) => {

        const docBody = context.document.body;
        const docFooter = context.document.sections;
        const docHeader = context.document.sections;

        context.load(docFooter);
        context.load(docHeader);
        await context.sync();

        docBody.clear();
        docFooter.items[0].getFooter("Primary");
        docHeader.items[0].getHeader("Primary");

        await context.sync();
    });
};
