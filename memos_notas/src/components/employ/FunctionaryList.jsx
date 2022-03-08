//@ts-check
import React, { useEffect, useState } from 'react';
import { InputText } from 'src/fragments';

/**
 * 
 * @param {Object} props 
 * @param {Object[]} props.functionaries
 * @param {String} props[].functionaries.name
 * @param {String} props[].functionaries.id_card
 * @param {String} props[].functionaries.job_title
 * @param {String} props[].functionaries.position_number
 * @param {Function} props.handlerEdit
 * @param {Function} props.handlerDelete
 * @returns 
 */
export const FunctionaryList = ({ functionaries, handlerEdit, handlerDelete }) => {

	const [filtered, setFiltered] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		handlerFilterSearch();
	}, [search, functionaries]);

	/**
	 * 
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const handlerInputChange = ({ target }) => setSearch(target.value);

	const handlerFilterSearch = () => {

		let searching = functionaries.filter((functionary) => {
			return new RegExp(search, "i").test(functionary.id_card) ||
				new RegExp(search, "i").test(functionary.name) ||
				new RegExp(search, "i").test(functionary.job_title) ? true : false;
		});

		setFiltered(searching);
	};

	handlerEdit;

	return (
		<div className="px-3" >
			<div className="card my-2 radius-50 text-white" style={{ background: "linear-gradient(0deg, #f94747c7, #fd182abf)" }}>
				<div className="card-body">
					<h3 className="fw-bold mb-2">Lista de funcionarios</h3>
					<InputText
						htmlId="search"
						onChange={handlerInputChange}
						icon="fas fa-search"
						placeholder="Buscar destinatario"
						value={search || ""}
					/>
				</div>
			</div>

			<div className="card radius-50 h-100">
				<div className="card-body p-2 bg-light scroll radius-50 overflow-auto h-100">
					{
						filtered.map((item, index) => (
							<div key={index} className="card radius-50 mb-2 bg-body">
								<div className="card-body ">
									<h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
									<p className="fw-bold m-0 text-muted">Cedula: <span className="fw-light">{item.id_card}</span></p>
									<p className="fw-bold m-0 text-muted">Puesto: <span className="fw-light">{item.job_title}</span></p>
									<p className="fw-bold m-0 text-muted">Posición: <span className="fw-light">{item.position_number}</span></p>
									<button className="btn btn-sm btn-secondary m-1" onClick={() => { handlerEdit(item.id); }}><i className="far fa-edit"></i></button>
									<button className="btn btn-sm btn-secondary m-1" onClick={() => { handlerDelete(item.id); }}><i className="fas fa-trash-alt"></i></button>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</div >
	);
};
