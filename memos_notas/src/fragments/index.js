import React from 'react';
import { getLocalStorageUserDepartment } from 'src/utils';

/**
     * Solo se muestra si tiene acceso para crear plantillas para otros
     * @returns 
     */
export const renderSelectDepartment = (values, handleInputChange, departmentOwnerState) => {
    if (getLocalStorageUserDepartment() == "0") {

        return (
            <div className="mb-3">
                <label htmlFor="owner" className="form-label fw-bold">Pertenece a</label>
                <select id="owner"
                    className="form-select form-select-sm"
                    value={values?.owner || ""}
                    onChange={handleInputChange}
                    required
                >
                    <option disabled value="">Seleccione un departamento</option>
                    {
                        departmentOwnerState.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        );
    } else {
        return null;
    }
};