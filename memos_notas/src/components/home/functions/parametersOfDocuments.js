
/* global Word */

export const parametersOfDocuments = () => {

    Word.run(async (context) => {
        const control = context.document.body.contentControls;
        context.load(control);

        await context.sync();

        console.log(control.items[0]);
    });

    return;
};
