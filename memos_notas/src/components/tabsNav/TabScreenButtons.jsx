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
                    className={`btn btn-sm btn-primary font-weight-bold mt-2 mb-2 nav-item active`}
                    id="home"
                    data-toggle="tab"
                    data-target="#nav-home"
                    type="button"
                >
                    Plantillas
                </button>
                <hr className="nav-divider" />
                <button
                    className={`btn btn-sm btn-primary font-weight-bold mt-2 mb-2 nav-item `}
                    id="addressees"
                    data-toggle="tab"
                    data-target="#nav-addressees"
                    type="button"
                >
                    Crear o editar destinatarios
                </button>
                <button
                    className={`btn btn-sm btn-primary font-weight-bold mt-2 mb-2 nav-item `}
                    id="employ"
                    data-toggle="tab"
                    data-target="#nav-employ"
                    type="button"
                >
                    Crear o editar funcionarios
                </button>
                <button
                    className={`btn btn-sm btn-primary font-weight-bold mt-2 mb-2 nav-item `}
                    id="template"
                    data-toggle="tab"
                    data-target="#nav-template"
                    type="button"
                >
                    Crear o editar plantillas
                </button>
                <hr className="nav-divider" />
                <button
                    className={`btn btn-sm btn-primary font-weight-bold mt-2 mb-2 nav-item `}
                    id="help"
                    data-toggle="tab"
                    data-target="#nav-info-help"
                    type="button"
                >
                    Ayuda
                </button>
            </div>
        </nav >
    );
};

export default React.memo(TabScreenButtons);
