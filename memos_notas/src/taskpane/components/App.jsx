
import React from 'react';
import { MemoAndNotesForm } from './MemoAndNotesForm.jsx';
import { RejectMemoAndNotesNumber } from './RejectMemoAndNotesNumber.jsx';


export const App = () => {


	const getDoc = () => {
		Word.run((context) => {

			const body = context.document.body

			const bodyHtml = body.getOoxml()

			console.log("fallo");
			return context.sync().then(() => {
				console.log("fallo");
				console.log(bodyHtml.value);

				localStorage.setItem("html", bodyHtml.value)
			})
		})
	};

	const insertDoc = () => {
		Word.run(function (context) {

			// Create a proxy object for the document body.
			var body = context.document.body;

			// Queue a command to insert HTML in to the beginning of the body.
			body.insertOoxml(
				localStorage.getItem("html"), Word.InsertLocation.start);

			// Synchronize the document state by executing the queued commands,
			// and return a promise to indicate task completion.
			return context.sync().then(function () {
				console.log('HTML added to the beginning of the document body.');
			});
		})
	};





	return (
		<>
			<button onClick={insertDoc}>Extraer documento</button>
			<button onClick={getDoc}>guardar documento</button>
			<div className="shadow p-3 m-3 bg-body radius-50" >
				<MemoAndNotesForm />
			</div>

			<div className="shadow p-3 m-3 bg-body radius-50" >
				<RejectMemoAndNotesNumber />
			</div>
		</>
	);

};