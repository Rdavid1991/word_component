
import React, { useEffect, useState } from 'react';
import { globals } from '../../globals.js';
import { MemoAndNotesForm } from './MemoAndNotesForm.jsx';
import { Addressees } from './Addressees.jsx';
import { RejectMemoAndNotesNumber } from './RejectMemoAndNotesNumber.jsx';
import { SaveDoc } from './SaveDoc.jsx';
import { SelectMemoOrNotes } from './SelectMemoOrNotes.jsx';


export const App = () => {

	const [addresseeState, setStateAddressee] = useState([]);

	useEffect(async () => {

		const result = await getAddressesOfDB()
		setStateAddressee(result)

	}, []);

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
				</div>
			</nav>
			<div className="tab-content" id="nav-tabContent">
				<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
					<h3 className='text-center px-2 fw-bold'>Generar numero de memos y notas</h3>
					<SelectMemoOrNotes />
					<div className="shadow p-3 m-3 bg-body radius-50" >
						<MemoAndNotesForm
							addresseeState={addresseeState}
						/>
					</div>

					<div className="shadow p-3 m-3 bg-body radius-50" >
						<RejectMemoAndNotesNumber />
					</div>
					<div className="shadow p-3 m-3 bg-body radius-50" >
						<SaveDoc />
					</div>
				</div>
				<div className="tab-pane fade" id="nav-addressees">

					<Addressees
						addresseeState={addresseeState}
						getAddressesOfDB={getAddressesOfDB}
						setStateAddressee={setStateAddressee}

					/>
				</div>
			</div>
		</>
	);

};