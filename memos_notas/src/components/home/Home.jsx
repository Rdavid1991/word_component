//@ts-check
import React, { useEffect, useState } from "react";
import { MemoAndNotesForm } from "../memoAndNotesForm/MemoAndNotesForm.jsx";
import { Addressees } from "../addressees/Addressees.jsx";
import { SaveDoc } from "../SaveDoc.jsx";
import { SelectMemoOrNotes } from "../SelectMemoOrNotes.jsx";
import { getNumber, saveNumber } from "./functions/index.js";
import { HomeInsertUser } from "./functions/HomeInsertUser.js";
import { LoaderContext } from "src/context/context.js";
import { RejectMemoAndNotesNumber } from "../RejectMemoAndNotesNumber.jsx";
import { InfoHelp } from "../infoHelp/InfoHelp.jsx";
import { globals } from "src/globals.js";
import { Template } from "../templates/Template.jsx";


const initialNumber = {
  note: 1,
  memo: 1,
};

export const Home = () => {
  const [addresseeState, setStateAddressee] = useState([]);
  const [memoOrNoteState, setMemoOrNoteState] = useState(0);
  const [numberState, setNumberState] = useState(initialNumber);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      await HomeInsertUser(fetchAddresses, fetchNumbers);
    })();
  }, []);

  const fetchNumbers = async () => {
    let result = await getNumber();
    if (result) {
      setNumberState({
        note: parseInt(result.notes),
        memo: parseInt(result.memorandum),
      });
    } else {
      result = await saveNumber(numberState);
    }
  };

  const fetchAddresses = async () => {
    const result = await getAddressesOfDB();
    console.log({ result });
    if (result) {
      const array = Array.isArray(result) ? result : [result];
      setStateAddressee(array);
    } else {
      setStateAddressee([]);
    }
  };

  const getAddressesOfDB = async () => {
    let response = await fetch(`${globals.apiUrl}?action=get_addressee`, {});
    if (response.ok) {
      return await response.json();
    }
    return false;
  };

  return (
    <LoaderContext.Provider value={setLoader}>
      <div
        className={`loader loader-default ${loader ? "is-active" : ""} `}
      ></div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
          >
            Inicio
          </button>
          <button
            className="nav-link"
            id="nav-addressees-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-addressees"
            type="button"
          >
            Destinatarios
          </button>
          <button
            className="nav-link"
            id="nav-template-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-template"
            type="button"
          >
            Plantillas
          </button>
          <button
            className="nav-link"
            id="nav-info-help-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-info-help"
            type="button"
          >
            Ayuda
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <h3 className="text-center px-2 fw-bold">
            Generar numero de memos y notas
          </h3>
          <SelectMemoOrNotes setMemoOrNoteState={setMemoOrNoteState} />
          <div className="shadow p-3 m-3 bg-body radius-50">
            <MemoAndNotesForm
              addresseeState={addresseeState}
              memoOrNoteState={memoOrNoteState}
              fetchNumbers={fetchNumbers}
            />
          </div>

          <div className="shadow p-3 m-3 bg-body radius-50">
            <RejectMemoAndNotesNumber
              memoOrNoteState={memoOrNoteState}
              fetchNumbers={fetchNumbers}
            />
          </div>
          <div className="shadow p-3 m-3 bg-body radius-50">
            <SaveDoc />
          </div>
        </div>
        <div className="tab-pane fade" id="nav-addressees">
          <Addressees
            addresseeState={addresseeState}
            fetchAddresses={fetchAddresses}
          />
        </div>
        <div className="tab-pane fade" id="nav-info-help">
          <InfoHelp
            numberState={numberState}
            setNumberState={setNumberState}
            saveNumber={saveNumber}
          />
        </div>
        <div className="tab-pane fade" id="nav-template">
          <Template />
        </div>
      </div>
    </LoaderContext.Provider>
  );
};
