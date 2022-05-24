//@ts-check
/* global Word */
import { DepartmentSchema } from "src/helpers/interface";
import { AlertConfirmQuestion } from "src/utils/Alerts";
import { DepartmentControls } from "./constants";

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
                "body": docBodyOoxml.value,
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

interface WriteDocumentTemplate {
    body: string,
    header: string,
    footer: string,
}
/**
 * Escribir documento
 */
export const writeDocument = async (template: WriteDocumentTemplate) => {

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

        body.insertOoxml(template.body, Word.InsertLocation.replace);
        header.insertOoxml(template.header, Word.InsertLocation.replace);
        footer.insertOoxml(template.footer, Word.InsertLocation.replace);

        return await context.sync();
    });
};

export const setInitialDocumentData = async (department: DepartmentSchema) => {
    return await Word.run(async (context) => {
        const department_name = context.document.contentControls.getByTag("department_name");
        const department_phone = context.document.contentControls.getByTag("department_phone");
        const shift_name = context.document.contentControls.getByTag("shift_name");
        const shift_job_title = context.document.contentControls.getByTag("shift_job_title");


        context.load(department_name)
        context.load(department_phone)
        context.load(shift_name)
        context.load(shift_job_title)

        await context.sync()
        
        

        department_name.items[0]?.insertText(department.name, Word.InsertLocation.replace)
        department_phone.items[0]?.insertText(department.phone, Word.InsertLocation.replace)
        shift_name.items[0]?.insertText(department.shift, Word.InsertLocation.replace)
        shift_job_title.items[0]?.insertText(department.jobTitle, Word.InsertLocation.replace)

        await context.sync();

    })
}