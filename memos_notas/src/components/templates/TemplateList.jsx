import React, { useEffect, useState } from 'react';
import { InputText } from 'src/fragments';
import { getDepartmentOwner, getLocalStorageUserDepartment } from 'src/utils';
import { typeOfDocuments } from "src/utils/constants";


const TemplateList = ({ documents, handlerEdit, handlerDelete }) => {

	const [filtered, setFiltered] = useState([]);
	const [searchState, setSearchState] = useState("");
	const [departmentOwnerState, setDepartmentOwnerState] = useState([]);

	useEffect(() => {
		(async () => {
			if (getLocalStorageUserDepartment() == "0") {
				const data = await getDepartmentOwner();
				setDepartmentOwnerState(data);
			}
		})();
	}, []);

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
			const departmentName = departmentOwnerState.filter((e) => e.id == item.department_owner_id)[0]?.name;

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
					<h3 className="fw-bold">Lista de plantillas</h3>
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

							const departmentName = departmentOwnerState.filter((e) => e.id == item.department_owner_id)[0]?.name;

							return (
								<div key={index} className="card mb-2 bg-body rounded">
									<div className="card-body py-1">
										<h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
										<p className="fw-bold text-muted mb-0">Tipo: <span className="fw-light">{typeOfDocuments[item.type]}</span></p>
										{
											getLocalStorageUserDepartment() == 0 ?
												<p className="fw-bold text-muted">Pertenece a:&nbsp;
													<span
														className="fw-light"
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
