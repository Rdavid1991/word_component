import "./App.css";
import React, { useCallback, useState, useEffect } from "react";
import { context } from "./context/context";

import { getDepartment } from "./utils/SaveAndGet";
import TabNav from "./navigation/TabNav";



const App = () => {

    const [loader, setLoader] = useState(false);
    const [controls, setControlsState] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments()
    }, []);

    const fetchDepartments = async () => {
        const { data } = await getDepartment();
        setDepartments(data);
    }

    const showLoader = useCallback((show: any) => {
        setLoader(show);
    }, [loader]);

    const setControls = useCallback((controls: any) => {
        setControlsState(controls);
    }, [controls]);

    return (
        <context.Provider value={{
            controls,
            departments,
            fetchDepartments,
            setControls,
            showLoader,
        }}>

            <div id="container">
                {/* <div className={`loader loader-default ${loader ? "is-active" : ""} `} style={{ zIndex: 1 }}></div> */}
                <TabNav />
            </div>
        </context.Provider>
    );
};

export default App
