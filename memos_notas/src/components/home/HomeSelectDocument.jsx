//@ts-check
import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { AlertError, AlertSuccess } from 'src/utils/Alerts';
import { typeOfDocuments } from 'src/utils/constants';
import { writeDocument } from 'src/utils/documents';
import { getDocumentTemplate } from 'src/utils/SaveAndGet';
import swal from 'sweetalert';
import { selectedDocumentType } from './functions';
import { parametersOfDocuments } from './functions/parametersOfDocuments';

const HomeSelectDocument = ({ setMemoOrNoteState, memoOrNoteState, documents, setSelectedState, selectedState }) => {
    const { setControls, showLoader } = useContext(context);

    const handleSelectChange = async ({ target }) => {
        //showLoader(true);
        setSelectedState(target.value);
        const template = await getDocumentTemplate(target.value);

        setMemoOrNoteState(selectedDocumentType(target));

        await writeDocument(JSON.parse(template.data[0].doc))
            .then(async () => {
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
                        Object.entries(typeOfDocuments).map((entry, index) => {

                            const [type, value] = entry;

                            if (documents.find((element) => parseInt(element.type) === parseInt(type))) {

                                return (
                                    <optgroup key={index} label={value}>
                                        {
                                            documents.map((item, index) => {

                                                if (parseInt(item.type) === parseInt(type)) {

                                                    return (
                                                        <option
                                                            key={index}
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