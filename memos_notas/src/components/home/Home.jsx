//@ts-check
import React, { useState } from "react";
import { typeOfDocuments } from "src/utils/constants.js";
import HomeGenerateDocument from "./HomeGenerateDocument.jsx";
import HomeOtherDocument from "./HomeOtherDocument.jsx";
import HomeSelectDocument from "./HomeSelectDocument.jsx";
import RejectConsecutiveNumber from "./RejectConsecutiveNumber.jsx";

export const Home = ({ addresseeState, fetchNumbers }) => {
	const [memoOrNoteState, setMemoOrNoteState] = useState(-1);

	const renderFormTypeDocument = () => {
		if (String(memoOrNoteState) == Object.keys(typeOfDocuments)[1] || String(memoOrNoteState) == Object.keys(typeOfDocuments)[2]) {
			return (
				<HomeGenerateDocument
					addresseeState={addresseeState}
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
				/>
			);
		} else if (String(memoOrNoteState) == Object.keys(typeOfDocuments)[0]) {
			return (
				<HomeOtherDocument />
			);
		}
	};

	return (
		<>
			<div className="px-3">
				<h3 className="fw-bold">
					Generar numero de memos y notas
				</h3>
				<HomeSelectDocument
					setMemoOrNoteState={setMemoOrNoteState}
					memoOrNoteState={memoOrNoteState}
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
		</>
	);
};
