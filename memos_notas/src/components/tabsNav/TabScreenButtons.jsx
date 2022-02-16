import React from 'react'

const TabScreenButtons = () => {
    return (
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                >
                    Inicio
                </button>
                <button
                    className="nav-link"
                    id="nav-addressees-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-addressees"
                    type="button"
                >
                    Destinatarios
                </button>
                <button
                    className="nav-link"
                    id="nav-template-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-template"
                    type="button"
                >
                    Plantillas
                </button>
                <button
                    className="nav-link"
                    id="nav-info-help-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-info-help"
                    type="button"
                >
                    Ayuda
                </button>
            </div>
        </nav>
    )
}

export default React.memo(TabScreenButtons)
