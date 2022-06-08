import React, { useState, useEffect } from 'react';

import { TabNavContent } from './TabNavContent';
import { getLocalStorageUserDepartment } from 'src/utils';
import { getDepartment } from 'src/utils/SaveAndGet';
import TabScreenButtons from './TabScreenButtons';


const initialState = {
    addressees : false,
    employ     : false,
    help       : false,
    home       : false,
    template   : false,
};

const sideNavInitial = {
    display : "none",
    left    : "-320px",

};

const TabNav = () => {

    const [sideNavToggle, setSideNavToggle] = useState(sideNavInitial);
    const [departmentName, setDepartmentName] = useState({
        name: ""
    });


    useEffect(() => {
        (async () => {
            const userDepartment = getLocalStorageUserDepartment();
            const { data } = await getDepartment(userDepartment);

            setDepartmentName({
                name: data[0].name
            });
        })();

        $('button[data-toggle="tab"]').on('shown.bs.tab', function () {
            setSideNavToggle(sideNavInitial);
        });

    }, []);

    const close = () => {
        setSideNavToggle(sideNavInitial);
    };

    const abrir = async () => {
        setSideNavToggle({
            display : "block",
            left    : "0",
        });
    };

    return (
        <>
            <div id="opacity" style={{ display: sideNavToggle.display }}></div>
            <div
                onClick={abrir}
                className="menu-bar m-3"
            >
                <div className="bar" ></div>
                <div className="bar" ></div>
                <div className="bar" ></div>
            </div>
            <div id="mySidenav" className="sidenav" style={{
                left: sideNavToggle.left,
            }}>
                <div className="side-nav-content" style={{ overflow: "auto" }}>
                    <div className="close">
                        <a id="closeNav" className="closebtn" onClick={close}>&times;</a>
                    </div>

                    <p className='font-weight-bold text-center'>Menu</p>
                    <img className="w-100" src="./assets/logo.png" alt="MIDES_LOGO" />
                    <p className='font-weight-bold text-center' style={{ fontSize: "16px" }}>{departmentName.name}</p>

                    <TabScreenButtons />
                </div>
            </div>
            <TabNavContent />
        </>
    );
};

export default React.memo(TabNav);
