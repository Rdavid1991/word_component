
/* global Word */

export const parametersOfDocuments = async() => {

    return await Word.run(async (context) => {
        const fields = [];
        const control = context.document.body.contentControls;

        context.load(control);

        await context.sync();

        console.log(control.items[0].title);

        for (const item of control.items) {
            if (item.tag && item.title) {
                fields.push({
                    "tag": item.tag,
                    "title": item.title
                });
            }
        }

        return fields;
    });
};
