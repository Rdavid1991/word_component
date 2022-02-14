/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* global Office */

const renderApp = (App) => {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById("root")
	);
}

Office.onReady(() => {
	renderApp(App)
})