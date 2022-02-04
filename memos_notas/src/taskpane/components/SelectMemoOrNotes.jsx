import React from 'react';

export const SelectMemoOrNotes = ({ insertDoc }) => {

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
