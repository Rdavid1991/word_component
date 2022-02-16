import "./App.css";
import React, { useState } from "react";
import { context } from "./context/context";
import { TabNav } from "./components/tabsNav/TabNav";

const initialState = [];
export const App = () => {

  const [loader, setLoader] = useState(false);
  const [documentsState, setDocumentsState] = useState(initialState);

  return (
    <context.Provider value={{
      setLoader,
      setDocumentsState,
      documentsState
    }}>

      <div id="container">
        <div className={`loader loader-default ${loader ? "is-active" : ""} `}></div>
        <TabNav />
      </div>
    </context.Provider>
  );
}
