
import { Home } from "./components/home/Home.jsx";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import * as React from "react";
import * as ReactDOM from "react-dom";
/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>

      <Component />

    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(Home);
});


/* Initial render showing a progress bar */
render(Home);

// if (module.hot) {
//   module.hot.accept("./components/App", () => {
//     const NextApp = require("./components/App").default;
//     render(NextApp);
//   });
// }
