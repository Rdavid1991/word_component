import React, { useEffect, useState } from 'react';
import { getDepartmentOwner, getLocalStorageUserDepartment } from 'src/utils';
import { typeOfDocuments } from "src/utils/constants";


const TemplateList = ({ documents, handlerEdit, handlerDelete }) => {


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

	const searchElements = (item, index, departmentName) => {
		return (
			<div key={index} className="card p-1 mb-2 bg-body">
				<div className="card-body">
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
	};

	return (
		<>
			<h3 className="fw-bold">Lista de plantillas</h3>
			<div className="input-group mb-3">
				<input
					placeholder="Buscar plantilla"
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
			<div className="overflow-auto h-100">
				{
					documents.map((item, index) => {

						const departmentName = departmentOwnerState.filter((e) => e.id == item.department_owner_id)[0]?.name;

						if (searchState.length > 0 &&
							new RegExp(searchState, "i").test(item.name) ||
							new RegExp(searchState, "i").test(typeOfDocuments[item.type]) ||
							new RegExp(searchState, "i").test(departmentName)

						) {
							return searchElements(item, index, departmentName);
						} else if (searchState.length <= 0) {
							return searchElements(item, index, departmentName);
						}
					})
				}
			</div>
		</>
	);
};

export default React.memo(TemplateList);
