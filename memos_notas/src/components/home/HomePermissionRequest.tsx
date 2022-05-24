import moment from 'moment';
import React, { useContext } from 'react';
import { FetchContext } from 'src/context/context';
import { SelectOptions } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import { AlertSuccess } from 'src/utils/Alerts';
import { DocumentPermissionRequestLoadVars } from './functions';

const initialState = {
	functionary: "",
	from: `${moment().format("YYYY-MM-DD")}T08:00`,
	to: `${moment().format("YYYY-MM-DD")}T16:00`
};

const HomePermissionRequest = ({ setSelectedState }) => {

	const { functionaries } = useContext(FetchContext).data
	
	
	const [values, setValues, handleInputChange, reset]: any = useForm(initialState);

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

			<SelectOptions
				id="functionary"
				handleInputChange={handleInputChange}
				label="Funcionario"
				value={values.functionary}
				options={functionaries}
				required={true}

			/>
			<div className="mb-3">
				<label
					htmlFor="#from"
					className="font-weight-bold form-label"
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
					htmlFor="#to"
					className="font-weight-bold form-label"
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