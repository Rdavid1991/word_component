import { useContext, useEffect, useState } from "react";
import { typeOfDocuments } from "src/utils/constants";
import { FetchContext } from "src/context/context";
import SelectedPermissionRequest from "../components/home/HomePermissionRequest";
import SelectedOtherDocument from "../components/home/SelectedOtherDocument";
import HomeSelectDocument from "../components/home/HomeSelectDocument";
import HomeCompensatoryTimeRequest from "../components/home/HomeCompensatoryTimeRequest";
import SelectedNote from "../components/home/SelectedNote";
import SelectedMemorandum from "src/components/home/SelectedMemorandum";

export const Home = () => {
    const { documents } = useContext(FetchContext).data;
    const [typeOfDocumentState, setTypeOfDocumentState] = useState(-1);
    const [selectedState, setSelectedState] = useState("");

    useEffect(() => {
        if (selectedState.length <= 0) setTypeOfDocumentState(-1);
    }, [selectedState]);

    return (
        <>
            <div className="px-3 w-100">
                <div className="card my-2 rounded text-white gradient">
                    <div className="card-body py-1">
                        <h3 className="font-weight-bold text-truncate">
                            Inicio
                        </h3>
                        <p>Crear documentos basados en plantillas</p>
                    </div>
                </div>

                <HomeSelectDocument
                    setTypeOfDocumentState={setTypeOfDocumentState}
                    documents={documents}
                    setSelectedState={setSelectedState}
                    selectedState={selectedState}
                />
                {
                    {
                        [Object.keys(typeOfDocuments)[0]]: <SelectedOtherDocument />,

                        [Object.keys(typeOfDocuments)[1]]: <SelectedMemorandum {...{ setSelectedState }} />,

                        [Object.keys(typeOfDocuments)[2]]: <SelectedNote {...{ setSelectedState }} />,

                        [Object.keys(typeOfDocuments)[3]]: <SelectedPermissionRequest {...{ setSelectedState }} />,

                        [Object.keys(typeOfDocuments)[4]]: <HomeCompensatoryTimeRequest {...{setSelectedState}}/>

                    }[String(typeOfDocumentState)]
                }

            </div>
            <div className="px-3"><hr /></div>
        </>
    );
};
