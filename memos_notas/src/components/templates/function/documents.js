import { AlertConfirmQuestion } from "src/utils/Alerts"

export const getDocument = async () => {

    const result = await AlertConfirmQuestion("¿Desea guardar nueva plantilla?")

    if (result.isConfirmed) {

        return Word.run(async (context) => {

            const body = context.document.body
            const docBody = body.getOoxml()
            const docFooter = context.document.sections.getFirst().getFooter("Primary").getOoxml()
            const docHeader = context.document.sections.getFirst().getHeader("Primary").getOoxml()
            await context.sync()

            return JSON.stringify({
                "body": docBody.value,
                "footer": docFooter.value,
                "header": docHeader.value,
            })
        })
    }

    return false;
}
