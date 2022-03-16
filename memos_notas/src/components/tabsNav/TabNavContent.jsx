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
    getDocumentInfoTemplate,
    getFunctionaries,
    saveConsecutiveNumber,
} from 'src/utils/SaveAndGet';
import { Functionary } from '../employ/Functionary';
import { existUser } from 'src/utils';

const initialNumber = {
    note: "1",
    memo: "1",
};
const initialDocument = [];
const initialAddressee = [];
const initialFunctionary = [];
export const TabNavContent = () => {

    const { showLoader, departments } = useContext(context);
    const [addresseeState, setStateAddressee] = useState(initialAddressee);
    const [documents, setDocuments] = useState(initialDocument);
    const [numberState, setNumberState] = useState(initialNumber);
    const [functionaries, setFunctionary] = useState(initialFunctionary);


    useEffect(() => {
        HomeInsertUser(departments).then(async () => {
            if (existUser() && departments.length > 0) {
                showLoader(true);
                fetchNumbers();
                fetchTemplate();
                fetchAddresses();
                await fetchFunctionary();
                showLoader(false);
            }
        });

    }, [departments]);

    const fetchFunctionary = async () => {
        let functionary = await getFunctionaries();
        if (functionary) {
            const { data } = functionary;
            if (data.length > 0) {
                setFunctionary(data);
            } else {
                setFunctionary(initialFunctionary);
            }
        }
    };


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
        const addresses = await getAddresses();
        if (addresses) {
            const { data } = addresses;
            if (data.length >= 0) {
                setStateAddressee(data);
            } else {
                setStateAddressee(initialAddressee);
            }
        }
    };

    const fetchTemplate = async () => {
        const templates = await getDocumentInfoTemplate();
        if (templates) {
            const { data } = templates;

            if (data.length >= 0) {
                setDocuments(data.sort((first, second) => first.type - second.type));
            } else {
                setDocuments(initialDocument);
            }
        }
    };


    return (
        <div className="tab-content scroll" id="nav-tabContent">
            <div className="tab-pane fade active show" id="nav-home">
                <Home
                    addresseeState={addresseeState}
                    fetchNumbers={fetchNumbers}
                    functionaries={functionaries}
                    documents={documents}
                />
            </div>
            <div className="tab-pane fade h-100" id="nav-addressees">
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
            <div className="tab-pane fade h-100 after" id="nav-template">
                <Template
                    documents={documents}
                    fetchTemplate={fetchTemplate}
                />
            </div>
            <div className="tab-pane fade h-100 after" id="nav-employ">
                <Functionary
                    functionaries={functionaries}
                    fetchFunctionary={fetchFunctionary}
                />
            </div>
        </div>
    );
};
