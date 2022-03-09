//@ts-check
import React, { useEffect, useState } from "react";
import { typeOfDocuments } from "src/utils/constants.js";
import HomePermissionRequest from "./HomePermissionRequest.jsx";
import HomeGenerateDocument from "./HomeGenerateDocument.jsx";
import HomeOtherDocument from "./HomeOtherDocument.jsx";
import HomeSelectDocument from "./HomeSelectDocument.jsx";
import RejectConsecutiveNumber from "./RejectConsecutiveNumber.jsx";
import { Space } from "src/fragments/index.js";

export const Home = ({ addresseeState, fetchNumbers, functionaries, documents }) => {
	const [memoOrNoteState, setMemoOrNoteState] = useState(-1);
	const [selectedState, setSelectedState] = useState("");

	useEffect(() => {
		if (selectedState.length <= 0) setMemoOrNoteState(-1);
	}, [selectedState]);


	const renderFormTypeDocument = () => {
		if (String(memoOrNoteState) == Object.keys(typeOfDocuments)[1] || String(memoOrNoteState) == Object.keys(typeOfDocuments)[2]) {
			return (
				<HomeGenerateDocument
					functionaries={functionaries}
					addresseeState={addresseeState}
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
					setSelectedState={setSelectedState}
				/>
			);
		} else if (String(memoOrNoteState) == Object.keys(typeOfDocuments)[0]) {
			return (
				<HomeOtherDocument />
			);
		} else if (String(memoOrNoteState) == Object.keys(typeOfDocuments)[3]) {
			return (
				<HomePermissionRequest
					functionaries={functionaries}
					setSelectedState={setSelectedState}
				/>
			);
		}
	};

	return (
		<>
			<div className="px-3 w-100">
				<div className="card my-2 radius-50 text-white" style={{ background: "linear-gradient(0deg, #f94747c7, #fd182abf)" }}>
					<div className="card-body">
						<h3 className="fw-bold text-truncate">
							Inicio
						</h3>
						<p>Crear documentos basados en plantillas</p>
					</div>
				</div>

				<HomeSelectDocument
					setMemoOrNoteState={setMemoOrNoteState}
					memoOrNoteState={memoOrNoteState}
					documents={documents}
					setSelectedState={setSelectedState}
					selectedState={selectedState}
				/>
				{
					renderFormTypeDocument()
				}
			</div>
			<div className="px-3"><hr /></div>
			<div className="px-3">
				<RejectConsecutiveNumber
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
				/>
			</div>
			<Space height={10}  />
		</>
	);
};
