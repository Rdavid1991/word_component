
/* global Word */

export const parametersOfDocuments = async () => {

    return await Word.run(async (context) => {
        let fields = [];
        const control = context.document.body.contentControls;

        context.load(control);
        await context.sync();

        let a = 0;
        let b = 0;
        for (const item of control.items) {
            a++;
            if (item.tag && item.title) {
                b++;
                fields.push({
                    "tag": item.tag,
                    "title": item.title
                });
            }
        }

        console.table({a,b, fields});

        console.log(control.items.length);
       
        return fields;
    });
};
