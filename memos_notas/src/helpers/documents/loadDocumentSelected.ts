interface LoadDocumentSelected {
    body: string,
    header: string,
    footer: string,
}

/**
 * Escribir documento
 */
export const loadDocumentSelected = async (template: LoadDocumentSelected) => {

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