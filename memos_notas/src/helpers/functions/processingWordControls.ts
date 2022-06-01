/**
 * Obtener controles del documento y agruparlos por sección: encabezado, cuerpo, pie de pagina
 * @param context 
 * @param variables 
 * @returns 
 */
export const getControlsByTag = (
    context: Word.RequestContext, 
    variables: { [s: string]: string; }
) : { [s: string]: Word.ContentControlCollection; } => {

    let arrayControls = {};

    Object.keys(variables).forEach((tag) => {
        arrayControls = {
            ...arrayControls,
            [tag]: context.document.contentControls.getByTag(tag),
        };
    });
    return arrayControls;
};

/**
 * Cargar controles a contexto
 * @param context 
 * @param controls 
 * @param variables 
 * @returns 
 */
export const loadControls = async (context: Word.RequestContext, controls: { [s: string]: Word.ContentControlCollection; }, variables: { [s: string]: string; }) => {
    Object.keys(variables).forEach((tag) => {
        context.load(controls[tag]);
    });

    await context.sync()
};

/**
 * Insertar texto en el control
 * @param control 
 * @param text 
 */
export const insertTextControl = (control: Word.ContentControlCollection, text: string) => {
    control.items[0]?.insertText(text, "Replace");
};