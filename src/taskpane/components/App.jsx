
import moment from 'moment';
import React, { useState } from 'react';

import 'moment/locale/es-us';
import Swal from 'sweetalert2';
moment.locale("es")

export const App = () => {

	const [form, setForm] = useState({
		to: "prueba",
		subject: "prueba",
		from: "prueba"
	});


	const handleInputChange = ({ target }) => {
		setForm({
			...form,
			[target.id]: target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		Word.run((context) => {
			const numControl = context.document.body.contentControls.getByTag("num");
			const yearControl = context.document.body.contentControls.getByTag("year");
			const subjectControl = context.document.body.contentControls.getByTag("subject");
			const dateControl = context.document.body.contentControls.getByTag("date");

			context.load(numControl)
			context.load(yearControl)
			context.load(subjectControl)
			context.load(dateControl)

			return context.sync().then(async () => {
				if (numControl.items.length > 0 &&
					yearControl.items.length > 0 &&
					subjectControl.items.length > 0 &&
					dateControl.items.length > 0
				) {
					fetchData();
					numControl.items[0].insertText("078", "Replace");
					yearControl.items[0].insertText("2022", "Replace");
					subjectControl.items[0].insertText(form.subject, "Replace");
					dateControl.items[0].insertText(moment().format('LL'), "Replace");
				} else {
					Swal.fire(
						'Hay un problema',
						'Las variables no están definidas, cargue la plantilla correcta o cree las variables',
						'error'
					)
				}
			})

		})
	}

	const fetchData = async () => {

		var requestOptions = {
			method: 'POST',
			redirect: 'follow',
			mode: "no-cors"
		};

		let response = await fetch(`http://localhost:8081/api_memo?dirigido=${form.to}&asunto=${form.subject}&solicitado=${form.from}`, requestOptions)
		console.log("respomnse", await response.json())
		//return await response.json();
	}


	return (
		<>
			<h1 className='text-center px-4'>Generar numero de memos y notas</h1>
			<form className='px-4' onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="to" className="form-label fw-bold">Dirigido a</label>
					<input
						type="text"
						className="form-control form-control-sm"
						id="to"
						onChange={handleInputChange}
						value={form.to}

					/>
				</div>
				<div className="mb-3">
					<label htmlFor="subject" className="form-label fw-bold">Asunto</label>
					<input
						type="text"
						className="form-control form-control-sm"
						id="subject"
						onChange={handleInputChange}
						value={form.subject}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="from" className="form-label fw-bold">Solicitado por</label>
					<input
						type="text"
						className="form-control form-control-sm"
						id="from"
						onChange={handleInputChange}
						value={form.from}
					/>
				</div>
				<button
					type="submit"
					className="btn btn-sm btn-secondary"
				>
					Guardar
				</button>
			</form>
			<hr />

			<h1 className='text-center'>Rechazar numero</h1>

			<form className='px-4' onSubmit={() => { }}>
				<div className="mb-3">
					<label htmlFor="to" className="form-label fw-bold">Numero a rechazar</label>
					<input
						type="text"
						className="form-control form-control-sm"
						id="to"
						onChange={handleInputChange}
						value={form.to}

					/>
				</div>

				<button
					type="submit"
					className="btn btn-sm btn-secondary"
				>
					buscar
				</button>
			</form>

			<form className="p-4">
				<p className="fw-bold">Dirigido a:
					<span className="fw-light">
						data
					</span>
				</p>
				<p className="fw-bold">Asunto:
					<span className="fw-light">
						data
					</span>
				</p>
				<p className="fw-bold">Solicitado por:
					<span className="fw-light">
						data
					</span>
				</p>
				<button
					type="submit"
					className="btn btn-sm btn-secondary"
				>
					Rechazar
				</button>
			</form>


		</>
	);
};
