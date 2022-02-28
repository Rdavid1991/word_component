//@ts-check
import React, { useContext, useEffect, useState } from 'react';
import { HomeInsertUser } from 'src/utils/HomeInsertUser';
import { Addressees } from '../addressees/Addressees';
import { Home } from '../home/Home';
import { Template } from '../templates/Template';
import InfoHelp from '../infoHelp/InfoHelp';

import { context } from 'src/context/context';
import {
    getAddresses,
    getConsecutiveNumber,
    getDocumentTemplate,
    saveConsecutiveNumber,
} from 'src/utils/SaveAndGet';


const initialNumber = {
    note: "1",
    memo: "1",
};
const initialDocument = [];
const initialAddressee = [];
export const TabNavContent = () => {

    const { showLoader } = useContext(context);
    const [addresseeState, setStateAddressee] = useState(initialAddressee);
    const [documents, setDocuments] = useState(initialDocument);
    const [numberState, setNumberState] = useState(initialNumber);

    useEffect(() => {
        (async () => {
            await HomeInsertUser();
            showLoader(true);
            await fetchAddresses();
            await fetchNumbers();
            await fetchTemplate();
            showLoader(false);
        })();
    }, []);

    const fetchNumbers = async () => {
        let consecutive = await getConsecutiveNumber();
        if (consecutive) {
            const { data } = consecutive;
            if (data.length > 0) {
                setNumberState({
                    note: data[0].notes,
                    memo: data[0].memorandum,
                });
            } else {
                await saveConsecutiveNumber(numberState);
            }
        }
    };

    const fetchAddresses = async () => {
        const result = await getAddresses();
        if (result) {
            const array = Array.isArray(result) ? result : [result];
            setStateAddressee(array);
        }
    };

    const fetchTemplate = async () => {
        const templates = await getDocumentTemplate();
        if (templates) {
            const { data } = templates;
            if (data.length > 0) {
                setDocuments(data);
            }
        }
    };


    return (
        <div className="tab-content" id="nav-tabContent">

            <div className="tab-pane fade active show" id="nav-home">
                <Home
                    addresseeState={addresseeState}
                    fetchNumbers={fetchNumbers}
                    documents={documents}
                />
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
                />
            </div>
            <div className="tab-pane fade" id="nav-template">
                <Template
                    documents={documents}
                    fetchTemplate={fetchTemplate}
                />
            </div>
        </div>
    );
};
