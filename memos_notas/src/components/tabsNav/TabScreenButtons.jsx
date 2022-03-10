import React from 'react';

/**
 * 
 * @param {Object} props
 * @param {Object} props.menuState
 * @param {Boolean} props.menuState.home 
 * @param {Boolean} props.menuState.addressees 
 * @param {Boolean} props.menuState.employ 
 * @param {Boolean} props.menuState.template 
 * @param {Boolean} props.menuState.help 
 * @returns 
 */
const TabScreenButtons = ({ menuState }) => {

    return (
        <nav>
            <div className="nav flex-column"  >
                <button
                    className={`btn btn-sm btn-primary fw-bold my-2 nav-item ${menuState.home? "active": ""}`}
                    id="home"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                >
                    Plantillas
                </button>
                <hr className="nav-divider" />
                <button
                    className={`btn btn-sm btn-primary fw-bold my-2 nav-item ${menuState.addressees? "active": ""}`}
                    id="addressees"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-addressees"
                    type="button"
                >
                    Crear o editar destinatarios
                </button>
                <button
                    className={`btn btn-sm btn-primary fw-bold my-2 nav-item ${menuState.employ? "active": ""}`}
                    id="employ"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-employ"
                    type="button"
                >
                    Crear o editar funcionarios
                </button>
                <button
                    className={`btn btn-sm btn-primary fw-bold my-2 nav-item ${menuState.template? "active": ""}`}
                    id="template"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-template"
                    type="button"
                >
                    Crear o editar plantillas
                </button>
                <hr className="nav-divider" />
                <button
                    className={`btn btn-sm btn-primary fw-bold my-2 nav-item ${menuState.help? "active": ""}`}
                    id="help"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-info-help"
                    type="button"
                >
                    Ayuda
                </button>
            </div>
        </nav >
    );
};

export default React.memo(TabScreenButtons);
