import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { context } from "./context/context";
import { TabNav } from "./components/tabsNav/TabNav";
import { fetchTemplate } from "./utils/FetchTemplate";

const initialState = [];
export const App = () => {

	const [loader, setLoader] = useState(false);
	const [documents, setDocuments] = useState(initialState);
	const [controls, setControlsState] = useState([]);

	useEffect(() => {
		(async () => {
			showLoader(true);
			const template = await fetchTemplate();
			showLoader(false);
			loadDocuments(template.data);
		})();
	}, []);


	const showLoader = useCallback((show) => {
		setLoader(show);
	}, [loader]);

	const loadDocuments = useCallback((arrayDocuments) => {
		setDocuments(arrayDocuments);
	}, [documents]);

	const setControls = useCallback((controls) => {
		setControlsState(controls);
	}, [controls]);

	return (
		<context.Provider value={{
			showLoader,
			loadDocuments,
			documents,
			setControls,
			controls
		}}>

			<div id="container">
				<div className={`loader loader-default ${loader ? "is-active" : ""} `}></div>
				<TabNav />
			</div>
		</context.Provider>
	);
};
