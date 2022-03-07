import moment from 'moment';
import React from 'react';
import { useForm } from 'src/hooks/useForm';
import { AlertSuccess } from 'src/utils/Alerts';
import { DocumentPermissionRequestLoadVars } from './functions';

const initialState = {
	functionary: "",
	from       : `${moment().format("YYYY-MM-DD")}T08:00`,
	to         : `${moment().format("YYYY-MM-DD")}T16:00`
};

/**
 * 
 * @param {Object} props
 * @param {Object[]} props.functionaries
 * @param {String} props[].functionaries.id
 * @param {String} props[].functionaries.name
 * @param {String} props[].functionaries.id_card
 * @param {String} props[].functionaries.job_title
 * @param {String} props[].functionaries.position_number
 * @param {Function} props[].setSelectedState
 * @returns 
 */
const HomePermissionRequest = ({ functionaries, setSelectedState }) => {

	// eslint-disable-next-line no-unused-vars
	const [values, setValues, handleInputChange, reset] = useForm(initialState);

	/**
	 * 
	 * @param {React.FormEvent<HTMLFormElement>} e 
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		const selectedFunctionary = functionaries.find((functionary) => parseInt(functionary.id) == parseInt(values.functionary));

		await DocumentPermissionRequestLoadVars(values, selectedFunctionary);
		AlertSuccess("Los datos se han enviado al documento");
		setSelectedState("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label
					forHtml="#functionary"
					className="fw-bold form-label"
				>
					Funcionario
				</label>
				<select
					id="functionary"
					value={values.functionary}
					onChange={handleInputChange}
					className="form-select form-select-sm"
				>
					{
						functionaries.map((item) => (
							<option key={item.id} value={item.id}>{item.name}</option>
						))
					}
				</select>
			</div>
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