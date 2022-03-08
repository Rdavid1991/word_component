import React, { useState } from 'react';

const initialDropdownState = {
    addressees: false,
    employ    : false,
    template  : false,
    infoHelp  : false

};

const initialTabState = {
    dropdown: false,
    home    : false
};


const TabScreenButtons = () => {


    return (
        <nav>

            <div className="nav-item dropdown">
                <div className="nav nav-tabs"  >
                    <button
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        Menu
                    </button>
                    <div className="dropdown-menu">
                        <button
                            className="dropdown-item"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                        >
                            Inicio
                        </button>
                        <hr className="dropdown-divider" />
                        <button
                            className="dropdown-item"
                            id="addressees"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-addressees"
                            type="button"
                        >
                            Destinatarios
                        </button>
                        <button
                            className="dropdown-item"
                            id="employ"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-employ"
                            type="button"
                        >
                            Funcionarios
                        </button>
                        <button
                            className="dropdown-item"
                            id="template"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-template"
                            type="button"
                        >
                            Plantillas
                        </button>
                        <hr className="dropdown-divider" />
                        <button
                            className="dropdown-item"
                            id="infoHelp"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-info-help"
                            type="button"
                        >
                            Ayuda
                        </button>

                    </div>
                </div>

            </div>
        </nav >
    );
};

export default React.memo(TabScreenButtons);
