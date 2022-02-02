
import React from 'react';
import { MemoAndNotesForm } from './MemoAndNotesForm.jsx';
import { RejectMemoAndNotesNumber } from './RejectMemoAndNotesNumber.jsx';


export const App = () => {

	return (
		<>
			<div className="shadow p-3 m-3 bg-body radius-50" >
				<MemoAndNotesForm/>
			</div>

			<div className="shadow p-3 m-3 bg-body radius-50" >
				<RejectMemoAndNotesNumber/>
			</div>
		</>
	);

};