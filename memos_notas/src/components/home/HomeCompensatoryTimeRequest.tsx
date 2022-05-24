import React, { useContext } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SelectOptions } from 'src/fragments';
import { useForm } from 'src/hooks/useForm';
import InputDate from 'src/fragments/InputDate';
import InputTime from 'src/fragments/InputTime';
import { SendDataToDocument } from './functions/SendDataToDocument';
import { AlertSuccess } from 'src/utils/Alerts';
import { FetchContext } from 'src/context/context';

const initialState = {
	functionary: "",
	from       : "08:00",
	to         : "16:00",
	date       : moment().format("YYYY-MM-DD")
};

const HomeCompensatoryTimeRequest = ({ setSelectedState }) => {

	const [values, setValues, handleInputChange, reset] : any = useForm(initialState);

	const { functionaries } = useContext(FetchContext).data
	/**
	 * 
	 * @param {React.FormEvent<HTMLFormElement>} e 
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		const selectedFunctionary = functionaries.find((functionary) => parseInt(functionary.id) == parseInt(values.functionary));

		await SendDataToDocument.sendToCompensatoryRequest(values, selectedFunctionary);
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
			<InputDate
				label="Fecha"
				id="date"
				value={values.date}
				onChange={handleInputChange}
				required={true}
			/>

			<InputTime
				label="Hora desde"
				id="from"
				value={values.from}
				onChange={handleInputChange}
				required={true}
			/>

			<InputTime
				label="Hora hasta"
				id="to"
				value={values.to}
				onChange={handleInputChange}
				required={true}
			/>
			<button className="btn btn-success">Enviar</button>
		</form>
	);
};

HomeCompensatoryTimeRequest.propTypes = {
	functionaries   : PropTypes.arrayOf(PropTypes.object).isRequired,
	setSelectedState: PropTypes.func.isRequired
};

export default HomeCompensatoryTimeRequest;