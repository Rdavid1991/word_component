
import React from "react";
import ReactDOM from "react-dom";

//import { AlertPlatform } from "../old/src/utils/Alerts";
import App from './App';



const renderApp = (Component : ()=> JSX.Element) => {
	ReactDOM.render(
		// <React.StrictMode>
			<Component />,
		//</React.StrictMode>,
		document.getElementById("root")
	);
};

Office.onReady(({host}) => {
	//host === Office.HostType.Word? renderApp(App): AlertPlatform();
	renderApp(App);
});