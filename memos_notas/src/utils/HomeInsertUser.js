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
} from '.';
import { AlertError } from './Alerts';
import RequestInitialUserInfo from 'src/fragments/RequestInitialUserInfo';

export const HomeInsertUser = async (data) => {

	if (!getLocalStorageUserName() &&
		!getLocalStorageUserEmail() &&
		!getLocalStorageUserInitials() &&
		!getLocalStorageUserDepartment()) {


		localStorage.clear();

		const initialState = {
			user      : "",
			email     : "",
			department: ""
		};

		let loop = true;
		while (loop) {
			try {

				const { value } = await Swal.fire({
					title            : 'Ingrese su información',
					allowOutsideClick: false,
					html             : renderToString(<RequestInitialUserInfo department={data} initialState={initialState} />),
					focusConfirm     : false,
					preConfirm       : () => {
						return {
							// @ts-ignore
							user      : document.getElementById('swal-input1').value,
							// @ts-ignore
							email     : document.getElementById('swal-input2').value,
							//@ts-ignore
							department: document.getElementById('user_department').value
						};
					}
				});

				const user = value.user.toString();
				const email = value.email.toString();
				const department = value.department.toString();

				initialState.user = user;
				initialState.email = email;
				initialState.department = department;

				const arrayUser = user.split(/\s/);

				if (department.length > 0 && arrayUser.length >= 2 && email.length > 0 && new RegExp("@mides.gob.pa", "g").test(email)) {

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
	}
};