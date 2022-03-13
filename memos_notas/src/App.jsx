import "./App.css";
import React, { useCallback, useState, useEffect } from "react";
import { context } from "./context/context";
import TabNav from "./components/tabsNav/TabNav";
import { getDepartment } from "./utils/SaveAndGet";


export const App = () => {

	const [loader, setLoader] = useState(false);
	const [controls, setControlsState] = useState([]);
	const [departments, setDepartments] = useState([]);


	useEffect(() => {
		(async () => {
			let { data } = await getDepartment();
			setDepartments(data);
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
			departments
		}}>

			<div id="container">
				<div className={`loader loader-default ${loader ? "is-active" : ""} `} style={{ zIndex: 1 }}></div>
				<TabNav />
			</div>
		</context.Provider>
	);
};
