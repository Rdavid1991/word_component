//@ts-check
import React, { useEffect, useState } from 'react';
import { globals } from 'src/globals';
import { HomeInsertUser } from 'src/utils/HomeInsertUser';
import { getNumber, saveNumber } from 'src/utils/numberConsecutive';
import { Addressees } from '../addressees/Addressees';
import { Home } from '../home/Home';
import { Template } from '../templates/Template';
import InfoHelp from '../infoHelp/InfoHelp';


const initialNumber = {
    note: "1",
    memo: "1",
};
export const TabNavContent = () => {

    const [addresseeState, setStateAddressee] = useState([]);
    const [numberState, setNumberState] = useState(initialNumber);

    useEffect(() => {
        (async () => {
            await HomeInsertUser();
            fetchAddresses();
            fetchNumbers();
        })();
    }, []);

    const fetchNumbers = async () => {
        let { data } = await getNumber();
        if (data.length > 0) {
            setNumberState({
                note: data[0].notes,
                memo: data[0].memorandum,
            });
        } else {
            await saveNumber(numberState);
        }
    };

    const fetchAddresses = async () => {
        const result = await getAddressesOfDB();
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
        <div className="tab-content" id="nav-tabContent">

            <div className="tab-pane fade active show" id="nav-home">
                <Home
                    addresseeState={addresseeState}
                    fetchNumbers={fetchNumbers}
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
                    saveNumber={saveNumber}
                />
            </div>
            <div className="tab-pane fade" id="nav-template">
                <Template />
            </div>
        </div>
    );
};
