//@ts-check
import React, { useState } from "react";
import { MemoAndNotesForm } from "../memoAndNotesForm/MemoAndNotesForm.jsx";
import { SelectMemoOrNotes } from "./HomeSelectDocument.jsx";
import { RejectMemoAndNotesNumber } from "../RejectMemoAndNotesNumber.jsx";

export const Home = ({ addresseeState, fetchNumbers }) => {
	const [memoOrNoteState, setMemoOrNoteState] = useState(0);

	return (
		<>
			<h3 className="text-center px-2 fw-bold">
				Generar numero de memos y notas
			</h3>
			<SelectMemoOrNotes setMemoOrNoteState={setMemoOrNoteState} />
			<div className="shadow p-3 m-3 bg-body radius-50">
				<MemoAndNotesForm
					addresseeState={addresseeState}
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
				/>
			</div>

			<div className="shadow p-3 m-3 bg-body radius-50">
				<RejectMemoAndNotesNumber
					memoOrNoteState={memoOrNoteState}
					fetchNumbers={fetchNumbers}
				/>
			</div>
		</>
	);
};
