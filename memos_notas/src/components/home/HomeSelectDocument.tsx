import React, { Dispatch, useContext } from 'react';
import { context } from 'src/context/context';
import { TemplateInfoSchema } from 'src/helpers/interface';
import { AlertError, AlertSuccess } from 'src/utils/Alerts';
import { typeOfDocuments } from 'src/utils/constants';
import { setInitialDocumentData, writeDocument } from 'src/utils/documents';
import { getDocumentTemplate } from 'src/utils/SaveAndGet';
import { selectedDocumentType } from '../../helpers/documents/sendDataToPermissionRequest';
import { parametersOfDocuments } from '../../utils/parametersOfDocuments';
import { FetchContext } from '../../context/context';

interface Props {
    setTypeOfDocumentState: Dispatch<React.SetStateAction<number>>,
    documents: Array<TemplateInfoSchema>,
    setSelectedState: Dispatch<React.SetStateAction<string>>,
    selectedState: string,
}

const HomeSelectDocument = ({ setTypeOfDocumentState, documents, setSelectedState, selectedState }: Props) => {


    const { setControls, showLoader } = useContext(context);
    const { data } = useContext(FetchContext);

    const handleSelectChange = async ({ target }) => {
        //showLoader(true);
        setSelectedState(target.value);
        const template = await getDocumentTemplate(target.value);

        setTypeOfDocumentState(Number(selectedDocumentType(target)));

        await writeDocument(JSON.parse(template.data[0].doc))
            .then(async () => {
                await setInitialDocumentData(data.department)
                await AlertSuccess("Documento cargado satisfactoriamente");
                setControls(await parametersOfDocuments());
            })
            .catch(async (error) => {
                await AlertError("No se puede cargar documento, revise si el documento actual no tiene controles bloqueados. " + error);
            });

        showLoader(false);
    };

    return (
        <form>
            <div className="mb-3">
                <label className="form-label font-weight-bold">Seleccionar una plantilla</label>
                <select
                    name="type"
                    className="form-control form-control-sm"
                    required={true}
                    onChange={handleSelectChange}
                    value={selectedState}
                >
                    <option disabled value="">Seleccione una plantilla</option>
                    {
                        Object.entries(typeOfDocuments).map((entry, i) => {

                            const [type, value] = entry;

                            if (documents.find((element) => element.type === parseInt(type))) {

                                return (
                                    <optgroup key={i} label={value}>
                                        {
                                            documents.map((item, j) => {

                                                if (item.type === parseInt(type)) {

                                                    return (
                                                        <option
                                                            key={j}
                                                            data-type={item.type}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>

                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                    </optgroup>

                                );

                            }
                            return null;
                        })
                    }
                </select>
            </div>
        </form >
    );
};

export default React.memo(HomeSelectDocument);