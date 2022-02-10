
import React, { useEffect, useState } from 'react';
import { renderToString } from "react-dom/server"
import { globals } from '../../../globals.js';
import { MemoAndNotesForm } from '../memoAndNotesForm/MemoAndNotesForm.jsx';
import { Addressees } from '../Addressees.jsx';
import { RejectMemoAndNotesNumber } from '../RejectMemoAndNotesNumber.jsx';
import { SaveDoc } from '../SaveDoc.jsx';
import { SelectMemoOrNotes } from '../SelectMemoOrNotes.jsx';
import { InfoHelp } from '../infoHelp/InfoHelp.jsx';
import { getNumber, saveNumber } from './functions/index.js';
import Swal from 'sweetalert2';
import { localStorageKeyUser } from '../../utils/index.js';

const initialNumber = {
	note: 1,
	memo: 1
}
export const App = () => {

	const [addresseeState, setStateAddressee] = useState([]);
	const [memoOrNoteState, setMemoOrNoteState] = useState(0);
	const [numberState, setNumberState] = useState(initialNumber);

	useEffect(() => {

		(async () => {

			let user = "";
			let email = "";

			if (localStorage.hasOwnProperty(localStorageKeyUser)) {
				fetchAddresses();
				fetchNumbers()
			} else {
				const alertHtml = () => {

					return (
						<>
							<p>Para continuar ingrese la información solicitada</p>
							<div className="mb-3 px-3">
								<label for="swal-input1" className="form-label fw-bold">Nombre</label>
								<input type="text" value={user} id="swal-input1" className="form-control form-control-sm" />
							</div>
							<div className="mb-3 px-3">
								<label for="swal-input1" className="form-label fw-bold">Correo</label>
								<input type="text" value={email} id="swal-input2" className="form-control form-control-sm" />
							</div>
						</>
					)
				}

				while (true) {
					const { value } = await Swal.fire({
						title: 'Ingrese su información',
						allowOutsideClick: false,
						html: renderToString(alertHtml()),
						focusConfirm: false,
						preConfirm: () => {
							return {
								user: document.getElementById('swal-input1').value,
								email: document.getElementById('swal-input2').value
							}
						}
					})

					user = value.user.toString();
					email = value.email.toString();

					if (value.user.toString().length > 0 && value.email.toString().length > 0 && new RegExp("@mides.gob.pa", "g").test(value.email.toString())) {
						localStorage.setItem(localStorageKeyUser, JSON.stringify(value))
						fetchAddresses();
						fetchNumbers()
						break;
					} else {
						await Swal.fire("Complete la información")
					}
				}

			}

		})().catch((err) => {
			console.log(err);
		})
	}, []);

	const fetchNumbers = async () => {
		let result = await getNumber();
		if (result) {
			setNumberState({
				note: parseInt(result.notes),
				memo: parseInt(result.memorandum)
			})
		} else {
			result = await saveNumber(numberState);
			console.log(result);
		}
	}

	const fetchAddresses = async () => {
		const result = await getAddressesOfDB()
		if (result) {
			const array = Array.isArray(result) ? result : [result];
			setStateAddressee(array)
		}
	}

	const getAddressesOfDB = async () => {
		let response = await fetch(`${globals.apiUrl}?action=get_addressee`, {})
		if (response.ok) {
			return await response.json();
		}
		return false
	}

	return (
		<>

			<nav>
				<div className="nav nav-tabs" id="nav-tab" role="tablist">
					<button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button">Inicio</button>
					<button className="nav-link" id="nav-addressees-tab" data-bs-toggle="tab" data-bs-target="#nav-addressees" type="button">Destinatarios</button>
					<button className="nav-link" id="nav-info-help-tab" data-bs-toggle="tab" data-bs-target="#nav-info-help" type="button">Ayuda</button>
				</div>
			</nav>
			<div className="tab-content" id="nav-tabContent">
				<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
					<h3 className='text-center px-2 fw-bold'>Generar numero de memos y notas</h3>
					<SelectMemoOrNotes
						setMemoOrNoteState={setMemoOrNoteState}
					/>
					<div className="shadow p-3 m-3 bg-body radius-50" >
						<MemoAndNotesForm
							addresseeState={addresseeState}
							memoOrNoteState={memoOrNoteState}
							fetchNumbers={fetchNumbers}
						/>
					</div>

					<div className="shadow p-3 m-3 bg-body radius-50" >
						<RejectMemoAndNotesNumber
							memoOrNoteState={memoOrNoteState}
							fetchNumbers={fetchNumbers}
						/>
					</div>
					<div className="shadow p-3 m-3 bg-body radius-50" >
						<SaveDoc />
					</div>
				</div>
				<div className="tab-pane fade" id="nav-addressees">

					<Addressees
						addresseeState={addresseeState}
						fetchAddresses={fetchAddresses}
					/>
				</div>
				<div className="tab-pane fade" id="nav-info-help">

					<InfoHelp
						numberState={numberState}
						setNumberState={setNumberState}
						saveNumber={saveNumber}
					/>
				</div>
			</div>
		</>
	);

};