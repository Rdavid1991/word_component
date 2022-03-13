import React, { useState, useEffect, useContext } from 'react';
import { renderToString } from 'react-dom/server';
import TabScreenButtons from './TabScreenButtons';
import { TabNavContent } from './TabNavContent';
import Swal from 'sweetalert2';
import { getLocalStorageUserDepartment } from 'src/utils';
import { context } from 'src/context/context';
import { getDepartment } from 'src/utils/SaveAndGet';

const initialState = {
    home      : false,
    addressees: false,
    employ    : false,
    template  : false,
    help      : false
};

const TabNav = () => {

    const { showLoader } = useContext(context);

    const [menuState, setMenuState] = useState({ ...initialState, home: true });
    const [departmentName, setDepartmentName] = useState({
        name: ""
    });

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

    useEffect(() => {
        (async () => {
            const userDepartment = getLocalStorageUserDepartment();
            const { data } = await getDepartment(userDepartment);
            setDepartmentName({
                name: data[0].name
            });
        })();
    }, []);

    const abrir = async () => {
        await Swal.fire({
            title: renderToString(
                <>
                    <p>Menu</p>
                    <img className="w-100" src="./assets/logo.png" alt="" />
                    <p style={{ fontSize: "16px" }}>{departmentName.name}</p>
                </>
            ),
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
            customClass      : {
                closeButton: "close-color",
                title      : "swa-custom-title"
            },
            showCloseButton: true,
            didOpen        : () => {
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
                <div className="bar" ></div>
            </div>
            <TabNavContent />
        </>
    );
};

export default React.memo(TabNav);
