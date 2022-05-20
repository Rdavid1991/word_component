import React, { useEffect, useState,useContext } from 'react';
import { context } from 'src/context/context';
import { InputText } from 'src/fragments';

import { getLocalStorageUserDepartment } from 'src/utils';
import { typeOfDocuments } from "src/utils/constants";



const TemplateList = ({ documents, handlerEdit, handlerDelete }) => {

	const {departments} = useContext(context);

	const [filtered, setFiltered] = useState([]);
	const [searchState, setSearchState] = useState("");
	

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

		console.log(target.dataset.id);
		
		target.focus({ preventScroll: true });
	};

	useEffect(() => {
		handlerFilterSearch();
	}, [searchState, documents]);

	/**
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const handleSearchChange = (e) => {
		setSearchState(e.target.value);
	};

	const handlerFilterSearch = () => {
		let searching = documents.filter((item) => {
			const departmentName = departments.filter((e) => e.id == item.department_owner_id)[0]?.name;

			return new RegExp(searchState, "i").test(item.name) ||
				new RegExp(searchState, "i").test(typeOfDocuments[item.type]) ||
				new RegExp(searchState, "i").test(departmentName) ? true : false;
		});

		setFiltered(searching);
	};


	return (
		<>
			<div className="card my-2 rounded text-white gradient">
				<div className="card-body py-1">
					<h3 className="font-weight-bold">Lista de plantillas</h3>
					<InputText
						placeholder="Buscar plantilla"
						icon="fas fa-search"
						onChange={handleSearchChange}
						value={searchState}
					/>
				</div>
			</div>

			<div className="card rounded h-100">
				<div className="card-body p-2 bg-light scroll rounded overflow-auto h-100">

					{
						filtered.map((item, index) => {

							const departmentName = departments.filter((e) => e.id == item.department_owner_id)[0]?.name;

							return (
								<div key={index} className="card mb-2 bg-body rounded">
									<div className="card-body py-1">
										<h6 className="font-weight-bold card-title">Nombre: <span className="font-weight-light">{item.name}</span></h6>
										<p className="font-weight-bold text-muted mb-0">Tipo: <span className="font-weight-light">{typeOfDocuments[item.type]}</span></p>
										{
											getLocalStorageUserDepartment() == 0 ?
												<p className="font-weight-bold text-muted">Pertenece a:&nbsp;
													<span
														className="font-weight-light"
													>
														{departmentName}
													</span>
												</p>
												: null
										}
										<button className="btn btn-sm btn-secondary m-1" data-id={item.id} onClick={onClickEdit}><i className="far fa-edit"></i></button>
										<button className="btn btn-sm btn-secondary m-1" data-id={item.id} onClick={onClickDelete}><i className="fas fa-trash-alt"></i></button>
									</div>
								</div>
							);
						})
					}

				</div>
			</div>
		</>
	);
};

export default React.memo(TemplateList);