//@ts-check
/* global Word */
import moment from "moment";
import {
	addZeroToLeft,
	getLocalStorageUserDepartment,
	getLocalStorageUserEmail,
	getLocalStorageUserInitials,
} from "src/utils";
import "moment/locale/es-us";
import { AddresseeControls, DocumentMemoOrNotesControls, DocumentPermissionRequestControls } from "src/utils/constants";
import { apiRequest } from "src/utils/apiRequest";
moment.locale("es-mx");

/**
 * Obtener controles del documento y agruparlos por sección: encabezado, cuerpo, pie de pagina
 * @param {Word.RequestContext} context
 * @param {Object<string, string>} variables
 * @returns {object} Retornar JSOn con nombre de la etiqueta como llave. Ejemplo: [tag] :{body: [control], footer:[control],header:[control]}
 */
const getControlsByTag = (context, variables) => {
	let arrayControls = {};

	Object.keys(variables).forEach((tag) => {
		arrayControls = {
			...arrayControls,
			[tag]: {
				body  : context.document.body.contentControls.getByTag(tag),
				footer: context.document.sections
					.getFirst()
					.getFooter("Primary")
					.contentControls.getByTag(tag),
				header: context.document.sections
					.getFirst()
					.getHeader("Primary")
					.contentControls.getByTag(tag),
			},
		};
	});
	return arrayControls;
};

/**
 * @param {Word.RequestContext} context
 * @param {Object[]} controls
 * @param {Word.ContentControl} controls[].body
 * @param {Word.ContentControl} controls[].footer
 * @param {Word.ContentControl} controls[].header
 * @param {Object<string,string>} variables
 * @returns {object}
 */
const loadControls = (context, controls, variables) => {
	Object.keys(variables).forEach((tag) => {
		context.load(controls[tag].body);
		context.load(controls[tag].footer);
		context.load(controls[tag].header);
	});

	return controls;
};

/**
 * Insertar texto en el control
 * @param {Object} control
 * @param {Word.ContentControlCollection} control.body
 * @param {Word.ContentControlCollection} control.header
 * @param {Word.ContentControlCollection} control.footer
 * @param {string} text
 */
const insertTextControl = (control, text) => {
	control.body.items[0]?.insertText(text, "Replace");
	control.header.items[0]?.insertText(text, "Replace");
	control.footer.items[0]?.insertText(text, "Replace");
};

/**
 * Cargar documento
 * @param {Object[]} addresseeState
 * @param {string} addresseeState[].name
 * @param {string} addresseeState[].jobTitle
 * @param {string} addresseeState[].archetype
 * @param {string} addresseeState[].department
 * @param {Object} form
 * @param {string} form.from - Remitente de memo o nota
 * @param {string} form.subject - Asunto de memo o nota
 * @param {string} form.to - Posición en el array addresseeState
 */
const loadWordVars = async (addresseeState, id, form) => {
	await Word.run(async (context) => {

		const memoAndNoteControls = { ...AddresseeControls, ...DocumentMemoOrNotesControls };

		const controls = loadControls(
			context,
			getControlsByTag(context, memoAndNoteControls),
			memoAndNoteControls
		);

		await context.sync();

		Object.entries(controls).map((entry) => {
			const [key, control] = entry;

			switch (key) {
				case Object.keys(memoAndNoteControls)[0]:
					insertTextControl(control, addZeroToLeft(id.toString()));
					break;
				case Object.keys(memoAndNoteControls)[1]:
					insertTextControl(control, addZeroToLeft(id.toString()));
					break;
				case Object.keys(memoAndNoteControls)[2]:
					insertTextControl(control, moment().year().toString());
					break;
				case Object.keys(memoAndNoteControls)[3]:
					insertTextControl(control, moment().format("LL").toString());
					break;
				case Object.keys(memoAndNoteControls)[4]:
					insertTextControl(control, form.from);
					break;
				case Object.keys(memoAndNoteControls)[5]:
					insertTextControl(control, form.subject);
					break;
				case Object.keys(memoAndNoteControls)[6]:
					insertTextControl(control, getLocalStorageUserInitials());
					break;
				case Object.keys(memoAndNoteControls)[7]:
					insertTextControl(control, addresseeState[form.to].name);
					break;
				case Object.keys(memoAndNoteControls)[8]:
					insertTextControl(control, addresseeState[form.to].jobTitle);
					break;
				case Object.keys(memoAndNoteControls)[9]:
					insertTextControl(control, addresseeState[form.to].archetype);
					break;
				case Object.keys(memoAndNoteControls)[10]:
					insertTextControl(control, addresseeState[form.to].department);
					break;
				default:
					break;
			}
			return null;
		});
	});
};

export const DocumentPermissionRequestLoadVars = async (values) => {
	return Word.run(async (context) => {

		const DPRC = DocumentPermissionRequestControls;

		const controls = loadControls(
			context,
			getControlsByTag(context, DPRC),
			DPRC
		);

		await context.sync();

		Object.entries(controls).map((entry) => {
			const [key, control] = entry;

			switch (key) {
				case Object.keys(DPRC)[0]:
					insertTextControl(control, moment(values.from).format("hh:mm a"));
					break;
				case Object.keys(DPRC)[1]:
					insertTextControl(control, moment(values.from).format("DD"));
					break;
				case Object.keys(DPRC)[2]:
					insertTextControl(control, moment(values.from).format("MMMM"));
					break;
				case Object.keys(DPRC)[3]:
					insertTextControl(control, moment(values.from).format("YYYY"));
					break;
				case Object.keys(DPRC)[4]:
					insertTextControl(control, moment(values.to).format("hh:mm a"));
					break;
				case Object.keys(DPRC)[5]:
					insertTextControl(control, moment(values.to).format("DD"));
					break;
				case Object.keys(DPRC)[6]:
					insertTextControl(control, moment(values.to).format("MMMM"));
					break;
				case Object.keys(DPRC)[7]:
					insertTextControl(control, moment(values.to).format("YYYY"));
					break;
				default:
					break;
			}
		});
	});
};

/**
 *
 * @param {Array} addresseeState
 * @param {number} memoOrNoteState
 * @param {Object} form
 * @returns
 */
const fetchData = async (addresseeState, memoOrNoteState, form) => {
	/**
	 * 1 = memo
	 * 2 = note
	 */

	const params = {
		"dirigido"        : addresseeState[form.to].department,
		"asunto"          : form.subject,
		"solicitado"      : getLocalStorageUserEmail(),
		"date"            : moment().format("L"),
		"department_owner": getLocalStorageUserDepartment()
	};

	const response = await apiRequest().post(`set_number&type=${memoOrNoteState}`, params);
	if (response.ok) {
		return await response.json();
	}
	return false;
};


/**
 * 
 * @param {EventTarget & HTMLSelectElement} target 
 */
const selectedDocumentType = (target) => {

	const children = target.children[target.selectedIndex];
	// @ts-ignore
	return children.dataset.type;
};

export { loadWordVars, fetchData, selectedDocumentType };
