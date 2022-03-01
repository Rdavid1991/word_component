import moment from 'moment';
import React from 'react';
import { useForm } from 'src/hooks/useForm';
import { AlertSuccess } from 'src/utils/Alerts';
import { DocumentPermissionRequestLoadVars } from './functions';

const initialState = {
	from: `${moment().format("YYYY-MM-DD")}T08:00`,
	to  : `${moment().format("YYYY-MM-DD")}T16:00`
};

const HomePermissionRequest = () => {

	// eslint-disable-next-line no-unused-vars
	const [values, setValues, handleInputChange, reset] = useForm(initialState);

	/**
	 * 
	 * @param {React.FormEvent<HTMLFormElement>} e 
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		await DocumentPermissionRequestLoadVars(values);
		AlertSuccess("Los datos se han enviado al documento");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label
					forHtml="#from"
					className="fw-bold form-label"
				>
					Desde
				</label>
				<input type="datetime-local"
					className="form-control form-control-sm"
					onChange={handleInputChange}
					value={values.from}
					id="from"
					placeholder="Nombre" />
			</div>
			<div className="mb-3">
				<label
					forHtml="#to"
					className="fw-bold form-label"
				>
					Hasta
				</label>
				<input type="datetime-local"
					className="form-control form-control-sm"
					onChange={handleInputChange}
					value={values.to}
					id="to"
					placeholder="Nombre"
				/>
			</div>
			<button className="btn btn-success">Enviar</button>
		</form>
	);
};


export default React.memo(HomePermissionRequest);