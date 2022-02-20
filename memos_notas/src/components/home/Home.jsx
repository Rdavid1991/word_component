//@ts-check
import React, { useState } from "react";
import { typeOfDocuments } from "src/utils/constants.js";
import HomeGenerateDocument from "./HomeGenerateDocument.jsx";
import HomeSelectDocument from "./HomeSelectDocument.jsx";
import RejectConsecutiveNumber from "./RejectConsecutiveNumber.jsx";

export const Home = ({ addresseeState, fetchNumbers }) => {
	const [memoOrNoteState, setMemoOrNoteState] = useState(0);

	const renderFormTypeDocument = () => {
		if (String(memoOrNoteState) == Object.keys(typeOfDocuments)[0] || String(memoOrNoteState) == Object.keys(typeOfDocuments)[1]) {
			return (
				<HomeGenerateDocument
					addresseeState={addresseeState}
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
				/>
			);
		}
	};

	return (
		<>
			<h3 className="text-center px-2 fw-bold">
				Generar numero de memos y notas
			</h3>
			<HomeSelectDocument setMemoOrNoteState={setMemoOrNoteState} />
			<div className="shadow p-3 m-3 bg-body radius-50">

				{
					renderFormTypeDocument()
				}
			</div>

			<div className="shadow p-3 m-3 bg-body radius-50">
				<RejectConsecutiveNumber
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
				/>
			</div>
		</>
	);
};
