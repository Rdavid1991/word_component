
import React, { useEffect, useState } from 'react';
import { MemoAndNotesForm } from './MemoAndNotesForm.jsx';
import { RejectMemoAndNotesNumber } from './RejectMemoAndNotesNumber.jsx';
import { SaveDoc } from './SaveDoc.jsx';
import { SelectMemoOrNotes } from './SelectMemoOrNotes.jsx';


export const App = () => {

	const insertDoc = async (memoOrNotes) => {

		let response = await fetch(`http://172.20.70.46:8080/api/?type=${memoOrNotes}`, {})

		const result = await response.json();

		console.log(result)

		Word.run(function (context) {

			// Create a proxy object for the document body.
			var body = context.document.body;

			body.clear();
			// Queue a command to insert HTML in to the beginning of the body.
			body.insertOoxml(result.doc, Word.InsertLocation.start);

			// Synchronize the document state by executing the queued commands,
			// and return a promise to indicate task completion.
			return context.sync().then(function () {
				console.log('HTML added to the beginning of the document body.');
			});
		})
	};

	return (
		<>
			<h1 className='text-center px-2 fw-bold'>Generar numero de memos y notas</h1>
			<SelectMemoOrNotes
				insertDoc={insertDoc}
			/>
			<div className="shadow p-3 m-3 bg-body radius-50" >
				<MemoAndNotesForm />
			</div>

			<div className="shadow p-3 m-3 bg-body radius-50" >
				<RejectMemoAndNotesNumber />
			</div>
			<div className="shadow p-3 m-3 bg-body radius-50" >
				<SaveDoc />
			</div>
		</>
	);

};