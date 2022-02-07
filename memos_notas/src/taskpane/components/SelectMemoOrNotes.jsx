import React from 'react';
import { globals } from '../../globals';

export const SelectMemoOrNotes = () => {

    const insertDoc = async (memoOrNotes) => {

		const response = await fetch(`${globals.apiUrl}?action=get_type&type=${memoOrNotes}`, {})

		const result = await response.json();

		Word.run(function (context) {

			// Create a proxy object for the document body.
			const body = context.document.body;

			body.clear();
			//Queue a command to insert HTML in to the beginning of the body.
			body.insertOoxml(result.doc, Word.InsertLocation.start);

			// Synchronize the document state by executing the queued commands,
			// and return a promise to indicate task completion.
			return context.sync().then(function () {
				console.log('HTML added to the beginning of the document body.');
			});
		})
	};

    const handleSelectChange = ({ target }) => {
        insertDoc(target.value)
    }

    return (
        <form className="px-2">
            <div className="mb-3">
                <label htmlFor="to" className="form-label fw-bold">Memo o Notas?</label>
                <select
                    name="type"
                    className="form-select form-select-sm"
                    required={true}
                    onChange={handleSelectChange}
                >
                    <option defaultValue={0}>Seleccione ¿memo o nota?</option>
                    <option value="1">Memo</option>
                    <option value="2">Nota</option>
                </select>
            </div>
        </form>
    );
};
