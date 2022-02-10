//@ts-check

import React from 'react'
import Swal from 'sweetalert2';
import { renderToString } from 'react-dom/server';
import { localStorageKeyUser } from '../../../utils';
import { ErrorAlert } from '../../../utils/ErrorAlert';


/**
 * @param {function} fetchAddresses 
 * @param {function} fetchNumbers 
 */
export const HomeInsertUser = async (fetchAddresses, fetchNumbers) => {

	let user = "";
	let email = "";

	if (localStorage.hasOwnProperty(localStorageKeyUser)) {
		fetchAddresses();
		fetchNumbers()
	} else {
		const alertHtml = () => {

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
				</>
			)
		}

		while (true) {
			try {

				const { value } = await Swal.fire({
					title: 'Ingrese su información',
					allowOutsideClick: false,
					html: renderToString(alertHtml()),
					focusConfirm: false,
					preConfirm: () => {
						return {
							// @ts-ignore
							user: document.getElementById('swal-input1').value,
							// @ts-ignore
							email: document.getElementById('swal-input2').value
						}
					}
				})

				user = value.user.toString();
				email = value.email.toString();

				const arrayUser = value.user.split(/\s/)

				if (arrayUser.length >= 2 && value.email.toString().length > 0 && new RegExp("@mides.gob.pa", "g").test(value.email.toString())) {

					localStorage.setItem(localStorageKeyUser, JSON.stringify({
						...value,
						initials: `${arrayUser[0].charAt(0)}${arrayUser[1].charAt(0)}`
					}))
					fetchAddresses();
					fetchNumbers()
					break;
				} else {
					await Swal.fire("Complete la información")
				}
			} catch (error) {
				await ErrorAlert(error)
			}
		}
	}
}