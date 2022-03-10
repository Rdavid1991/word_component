import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { context } from "./context/context";
import TabNav from "./components/tabsNav/TabNav";
import { getDepartmentOwner, getLocalStorageUserDepartment } from "./utils";


export const App = () => {

	const [loader, setLoader] = useState(false);
	const [controls, setControlsState] = useState([]);
	const [departmentOwnerState, setDepartmentOwnerState] = useState([]);

	useEffect(() => {

		(async () => {
			if (getLocalStorageUserDepartment() == "0") {
				const { data } = await getDepartmentOwner();
				setDepartmentOwnerState(data);
			}
		})();
	}, []);

	const showLoader = useCallback((show) => {
		setLoader(show);
	}, [loader]);

	const setControls = useCallback((controls) => {
		setControlsState(controls);
	}, [controls]);

	return (
		<context.Provider value={{
			showLoader,
			setControls,
			controls,
			departmentOwnerState
		}}>

			<div id="container">
				<div className={`loader loader-default ${loader ? "is-active" : ""} `} style={{ zIndex: 1 }}></div>
				<TabNav />
			</div>
		</context.Provider>
	);
};
