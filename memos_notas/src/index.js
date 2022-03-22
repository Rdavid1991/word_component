//@ts-check
/* global Office */
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AlertPlatform } from "./utils/Alerts";


const renderApp = (App) => {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById("root")
	);
};

Office.onReady(({host}) => {
	host === Office.HostType.Word? renderApp(App): AlertPlatform();
});