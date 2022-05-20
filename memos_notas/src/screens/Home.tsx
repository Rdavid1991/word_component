//@ts-check
import { useEffect, useState } from "react";
import { typeOfDocuments } from "src/utils/constants";
import HomePermissionRequest from "../components/home/HomePermissionRequest";
import HomeGenerateDocument from "../components/home/SelectedMemorandumOrNote";
import HomeOtherDocument from "../components/home/HomeOtherDocument";
import HomeSelectDocument from "../components/home/HomeSelectDocument";
import HomeCompensatoryTimeRequest from "../components/home/HomeCompensatoryTimeRequest";

export const Home = ({ addressee, fetchNumbers, functionaries, documents }) => {
	const [typeOfDocumentState, setTypeOfDocumentState] = useState(-1);
	const [selectedState, setSelectedState] = useState("");

	useEffect(() => {
		if (selectedState.length <= 0) setTypeOfDocumentState(-1);
	}, [selectedState]);

	const renderFormTypeDocument = () => {

		switch (String(typeOfDocumentState)) {

			case Object.keys(typeOfDocuments)[0]:
				return (
					<HomeOtherDocument />
				);
				
			case Object.keys(typeOfDocuments)[1]:
			case Object.keys(typeOfDocuments)[2]:
				return (
					<HomeGenerateDocument
						functionaries={functionaries}
						addressee={addressee}
						memoOrNoteState={typeOfDocumentState}
						fetchNumbers={fetchNumbers}
						setSelectedState={setSelectedState}
					/>
				);

			case Object.keys(typeOfDocuments)[3]:
				return (
					<HomePermissionRequest
						functionaries={functionaries}
						setSelectedState={setSelectedState}
					/>
				);

			case Object.keys(typeOfDocuments)[4]:
				return (
					<HomeCompensatoryTimeRequest
						functionaries={functionaries}
						setSelectedState={setSelectedState}
					/>
				);

			default:
				break;
		}
	};

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
					renderFormTypeDocument()
				}
			</div>
			<div className="px-3"><hr /></div>
		</>
	);
};
