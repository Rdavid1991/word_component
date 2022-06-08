import { DepartmentSchema } from "../interface";

export const setInitialDocumentData = async (department: DepartmentSchema) => {
    return await Word.run(async (context) => {
        const department_name = context.document.contentControls.getByTag("department_name");
        const department_phone = context.document.contentControls.getByTag("department_phone");
        const department_initials = context.document.contentControls.getByTag("department_initials");
        const shift_name = context.document.contentControls.getByTag("shift_name");
        const shift_job_title = context.document.contentControls.getByTag("shift_job_title");


        context.load(department_name);
        context.load(department_phone);
        context.load(department_initials);
        context.load(shift_name);
        context.load(shift_job_title);

        await context.sync();
        
        if (department.name !== null && department.name!== undefined) {
            department_name.items[0]?.insertText(department.name, Word.InsertLocation.replace);
        }

        if (department.phone !== null && department.phone!== undefined) {
            department_phone.items[0]?.insertText(department.phone, Word.InsertLocation.replace);
        }

        if (department.initials !== null && department.initials!== undefined) {
            department_initials.items[0]?.insertText(department.initials, Word.InsertLocation.replace);
        }

        if (department.shift !== null && department.shift!== undefined) {
            shift_name.items[0]?.insertText(department.shift, Word.InsertLocation.replace);
        }

        if (department.jobTitle !== null && department.jobTitle!== undefined) {
            shift_job_title.items[0]?.insertText(department.jobTitle, Word.InsertLocation.replace);
        }

        await context.sync();
    });
};