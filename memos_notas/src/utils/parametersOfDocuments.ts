
/* global Word */

export const parametersOfDocuments = async () => {

    return await Word.run(async (context) => {
        let fields = [];
        const control = context.document.body.contentControls;

        context.load(control);
        await context.sync();

        for (const item of control.items) {
            if (item.tag && item.title) {
                fields.push({
                    "tag"  : item.tag,
                    "title": item.title
                });
            }
        }

        return fields;
    });
};
