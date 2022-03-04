import React, { useContext } from 'react';
import { context } from 'src/context/context';
import { InputText, renderSelectDepartment } from 'src/fragments';

export const EmployCreate = ({ handleInputChange, values, reset }) => {

	const { showLoader, departmentOwnerState } = useContext(context);

	/**
	 * 
	 * @param {React.FormEvent<HTMLFormElement>} e 
	 */
	const handleSaveFunctionary= (e) => {
		e.preventDefault();
	};


	return (
		<div className="px-3" >
			<div className="px-2">
				<h3 className="fw-bold mb-3">Agregar funcionario</h3>
				<form onSubmit={handleSaveFunctionary} onReset={() => reset()}>
					<InputText
						htmlId="name"
						htmlLabel="Nombre"
						onChange={handleInputChange}
						placeholder="Nombre del funcionario"
						value={values.name}
					/>
					<InputText
						htmlId="idCard"
						htmlLabel="Cedula"
						onChange={handleInputChange}
						placeholder="Cédula del funcionario"
						value={values.idCard}
					/>
					<InputText
						htmlId="jobTitle"
						htmlLabel="Puesto"
						onChange={handleInputChange}
						placeholder="Puesto del funcionario"
						value={values.jobTitle}
					/>
					<InputText
						htmlId="position"
						htmlLabel="N° de Posición"
						onChange={handleInputChange}
						placeholder="Numero de posición del funcionario"
						value={values.position}
					/>
					{renderSelectDepartment(values, handleInputChange, departmentOwnerState)}

					<div className="mb-3">
						<button className="btn btn-sm btn-secondary">Guardar</button>
						<button className="btn btn-sm btn-secondary mx-1" type="reset">Limpiar campos</button>
					</div>
				</form>
			</div>
		</div>
	);
};
