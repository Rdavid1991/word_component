import moment from "moment";
import {

	getLocalStorageUserDepartment,
	getLocalStorageUserEmail,

} from "src/utils";
import "moment/locale/es-us";
import { DocumentRequestControls, FunctionaryControls } from "src/utils/constants";
import { apiRequest } from "src/utils/apiRequest";
import { AddresseesSchema, SelectedMemorandumOrNoteState } from '../../../helpers/interface/index';
moment.locale("es-mx");

/**
 * Obtener controles del documento y agruparlos por sección: encabezado, cuerpo, pie de pagina
 * @param {Word.RequestContext} context
 * @param {Object<string, string>} variables
 * @returns {object} Retornar JSOn con nombre de la etiqueta como llave. 
 */
const getControlsByTag = (context, variables) => {
	let arrayControls = {};

	Object.keys(variables).forEach((tag) => {
		arrayControls = {
			...arrayControls,
			[tag]: context.document.contentControls.getByTag(tag),
		};
	});
	return arrayControls;
};

/**
 * @param {Word.RequestContext} context
 * @param {Object<string,Word.ContentControl>} controls
 * @param {Object<string,string>} variables
 * @returns {object}
 */
const loadControls = (context, controls, variables) => {
	Object.keys(variables).forEach((tag) => {
		context.load(controls[tag]);
	});

	return controls;
};

/**
 * Insertar texto en el control
 * @param {Word.ContentControlCollection} control
 * @param {string} text
 */
const insertTextControl = (control, text) => {
	control.items[0]?.insertText(text, "Replace");
};



/**
 * 
 * @param {*} values 
 * @param {Object} functionary
 * @param {String} functionary.id
 * @param {String} functionary.name
 * @param {String} functionary.id_card
 * @param {String} functionary.job_title
 * @param {String} functionary.position_number
 * @returns 
 */
export const DocumentPermissionRequestLoadVars = async (values, functionary) => {

	return Word.run(async (context) => {

		const DPRC = { ...DocumentRequestControls, ...FunctionaryControls };

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
				case Object.keys(DPRC)[8]:
					insertTextControl(control, functionary.name);
					break;
				case Object.keys(DPRC)[9]:
					insertTextControl(control, functionary.id_card);
					break;
				case Object.keys(DPRC)[10]:
					insertTextControl(control, functionary.job_title);
					break;
				case Object.keys(DPRC)[11]:
					insertTextControl(control, functionary.position_number.toString());
					break;
				default:
					break;
			}
		});
	});
};



/**
 * 
 * @param {EventTarget & HTMLSelectElement} target 
 */
const selectedDocumentType = (target) => {

	let type = "";
	if (target.selectedOptions[0].dataset) {
		type = target.selectedOptions[0].dataset.type;
	} else {
		type = target.selectedOptions[0].getAttribute("data-type");
	}
	return type;

};

export {  selectedDocumentType };
