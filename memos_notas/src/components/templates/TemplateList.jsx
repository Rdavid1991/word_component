import React, { useState } from 'react';


const TemplateList = ({ documents, handlerEdit, handlerDelete }) => {


	const [searchState, setSearchState] = useState("");
	//doc: "{\"body\":\"<?xml version=\\\"1.0\\\" standalone=
	//id: 1
	//name:

	/**
	 * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e
	 */
	const onClickEdit = ({ target }) => {
		handlerEdit(target.dataset.id);
		target.focus({ preventScroll: true });
	};

	/**
	 * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e
	 */
	const onClickDelete = ({ target }) => {
		handlerDelete(target.dataset.id);
		target.focus({ preventScroll: true });
	};

	return (
		<>
			<h3 className="fw-bold text-center mb-4">Lista de plantillas</h3>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control form-control-sm"
					required={true}
					onChange={({ target }) => setSearchState(target.value)}
					value={searchState}
				/>
				<span
					className="input-group-text"
				>
					<i className="fas fa-search"></i>
				</span>
			</div>
			{
				documents.map((item, index) => {

					if (searchState.length > 0 &&
						new RegExp(searchState, "i").test(item.name)
					) {
						return (
							<div key={index} className="card shadow-sm p-3 mb-2 bg-body">
								<div className="card-body">
									<h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
									<p className="fw-bold m-0 text-muted">Tipo: <span className="fw-light">{item.id}</span></p>
								</div>
							</div>
						);
					} else if (searchState.length <= 0) {
						return (
							<div key={index} className="card shadow-sm p-3 mb-2 bg-body">
								<div className="card-body">
									<h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
									<p className="fw-bold m-0 text-muted">Tipo: <span className="fw-light">{item.id}</span></p>
									<button className="btn btn-sm btn-secondary m-1" data-id={item.id} onClick={onClickEdit}><i className="far fa-edit"></i></button>
									<button className="btn btn-sm btn-secondary m-1" data-id={item.id} onClick={onClickDelete}><i className="fas fa-trash-alt"></i></button>
								</div>
							</div>
						);
					}
				})
			}
		</>
	);
};

export default React.memo(TemplateList);
