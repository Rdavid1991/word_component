import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import TabScreenButtons from './TabScreenButtons';
import { TabNavContent } from './TabNavContent';
import Swal from 'sweetalert2';

const initialState = {
    home      : false,
    addressees: false,
    employ    : false,
    template  : false,
    help      : false
};

const TabNav = () => {

    const [menuState, setMenuState] = useState({ ...initialState, home: true });

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const showTabEvent = ({ target }) => {
        document.querySelector(".tab-content").scrollTo(0, 0);
        setMenuState({
            ...initialState,
            [target.id]: target.classList.contains("active")
        });

        setTimeout(() => Swal.close(), 100);
    };

    const abrir = async () => {
        await Swal.fire({
            title    : '<p>Menu</p><img class="w-100" src="/assets/logo.png" alt="" />',
            html     : renderToString(<TabScreenButtons menuState={menuState} />),
            position : 'top-start',
            showClass: {
                popup: `
                animate__animated
                animate__backInLeft
                animate__faster
              `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__backOutLeft
                animate__faster
              `
            },
            grow             : 'column',
            heightAuto       : true,
            width            : 300,
            showConfirmButton: false,
            showCloseButton  : true,
            didOpen          : () => {
                const buttons = document.querySelectorAll('button[data-bs-toggle="tab"]');
                buttons.forEach((button) => {
                    button.addEventListener('shown.bs.tab', showTabEvent);
                });
            },
        });

    };

    return (
        <>
            <div
                onClick={abrir}
                className="menu-bar m-3"
            >
                <div className="bar" ></div>
                <div className="bar" ></div>
                <div className="bar" ></div></div>
            <TabNavContent />
        </>
    );
};

export default React.memo(TabNav);
