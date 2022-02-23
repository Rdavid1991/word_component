//@ts-check

import React from 'react';
import Swal from 'sweetalert2';
import { renderToString } from 'react-dom/server';
import {
	getLocalStorageUserDepartment,
	getLocalStorageUserEmail,
	getLocalStorageUserInitials,
	getLocalStorageUserName,
	localStorageKeyUser,
	notExistUser
} from '.';
import { AlertError } from './Alerts';
import { apiRequest } from './apiRequest';

export const HomeInsertUser = async () => {

	let user = "";
	let email = "";
	let department = "";

	if (notExistUser()) {
		if (!getLocalStorageUserName() &&
			!getLocalStorageUserEmail() &&
			!getLocalStorageUserInitials() &&
			!getLocalStorageUserDepartment()) {

			const alertHtml = async () => {
				let json;
				const result = await apiRequest().get("get_options_department_owner", {});
				if (result.ok) {
					json = await result.json();
				}

				return (
					<>
						<p>Para continuar ingrese la información solicitada</p>
						<div className="mb-3 px-3">
							<label htmlFor="swal-input1" className="form-label fw-bold">Nombre y apellido</label>
							<input
								type="text"
								defaultValue={user}
								id="swal-input1"
								className="form-control form-control-sm"
								placeholder="Nombre Apellido" />
						</div>
						<div className="mb-3 px-3">
							<label htmlFor="swal-input1" className="form-label fw-bold">Correo</label>
							<input
								type="text"
								defaultValue={email}
								id="swal-input2"
								className="form-control form-control-sm"
								placeholder="usuario@mides.gob.pa" />
						</div>
						<div className="mb-3 px-3">
							<label htmlFor="swal-input1" className="form-label fw-bold">Departamento</label>
							<select
								id='user_department'
								className="form-select form-select-sm"
								value={department}
							>
								<option disabled value="">Seleccione un departamento</option>
								{
									json.data.map((item, index) => (
										<option key={index} value={item.id}>{item.name}</option>
									))
								}
							</select>
						</div>

					</>
				);
			};

			let loop = true;
			while (loop) {
				try {

					const { value } = await Swal.fire({
						title: 'Ingrese su información',
						allowOutsideClick: false,
						html: renderToString(await alertHtml()),
						focusConfirm: false,
						preConfirm: () => {
							return {
								// @ts-ignore
								user: document.getElementById('swal-input1').value,
								// @ts-ignore
								email: document.getElementById('swal-input2').value,
								//@ts-ignore
								department: document.getElementById('user_department').value
							};
						}
					});

					user = value.user.toString();
					email = value.email.toString();
					department = value.department.toString();

					const arrayUser = value.user.split(/\s/);

					if (value.department.toString().length > 0 && arrayUser.length >= 2 && value.email.toString().length > 0 && new RegExp("@mides.gob.pa", "g").test(value.email.toString())) {

						localStorage.setItem(localStorageKeyUser, JSON.stringify({
							...value,
							initials: `${arrayUser[0].charAt(0)}${arrayUser[1].charAt(0)}`,
						}));
						break;
					} else {
						await Swal.fire("Complete la información");
					}
				} catch (error) {
					await AlertError(error);
				}
			}
		} else {
			localStorage.clear();
			location.reload();
		}
	}
};