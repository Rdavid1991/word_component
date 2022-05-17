//@ts-check
import { useContext, useLayoutEffect, useState } from 'react';
import { Addressees } from '../addressees/Addressees';
import { Home } from '../../screens/Home';
import { Template } from '../templates/Template';
import InfoHelp from '../../screens/InfoHelp';
import { context } from 'src/context/context';
import { Functionary } from '../employ/Functionary';
import { existUser } from 'src/utils';
import ModalInitialUser from './ModalInitialUser';
import fetchData from 'src/utils/fetchData';


const initialState = {
    addressee: [],
    documents: [],
    functionaries: [],
    numberState: {
        note: "1",
        memo: "1",
    }
}

export const TabNavContent = () => {

    const { showLoader, departments } = useContext(context);

    const [data, setData] = useState(initialState)
    const [showModal, setShowModal] = useState(false);

    useLayoutEffect(() => {

        (async () => {

            if (existUser()) {

                const responseNumbers = await fetchData.fetchNumbers();
                const responseTemplate = await fetchData.fetchTemplate();
                const responseAddresses = await fetchData.fetchAddresses();
                const responseFunctionary = await fetchData.fetchFunctionary();
                setData({
                    addressee: responseAddresses,
                    documents: responseTemplate,
                    functionaries: responseFunctionary,
                    numberState: responseNumbers
                })
                setShowModal(false);
            } else {
                setShowModal(true)
            }


        })();
    }, [departments]);

    console.log({data});
    

    const fetchNumbers = async () => setData({ ...data, numberState: await fetchData.fetchNumbers() })
    const fetchAddresses = async () => setData({ ...data, addressee: await fetchData.fetchAddresses() })
    const fetchTemplate = async () => setData({ ...data, documents: await fetchData.fetchTemplate() })
    const fetchFunctionary = async () => setData({ ...data, functionaries: await fetchData.fetchFunctionary() })

    return (
        <div className="tab-content scroll shadow__top" id="nav-tabContent">

            {
                showModal ? <ModalInitialUser setShowModal={setShowModal} /> : null
            }

            <div className="tab-pane fade active show" id="nav-home">
                <Home
                    addressee={data.addressee}
                    fetchNumbers={fetchNumbers}
                    functionaries={data.functionaries}
                    documents={data.documents}
                />
            </div>
            <div className="tab-pane fade h-100" id="nav-addressees">
                <Addressees
                    addressee={data.addressee}
                    fetchAddresses={fetchAddresses}
                />
            </div>
            <div className="tab-pane fade" id="nav-info-help">
                <InfoHelp
                    initialNumber={data.numberState}
                    //setNumberState={setNumberState}
                />
            </div>
            <div className="tab-pane fade h-100 after" id="nav-template">
                <Template
                    documents={data.documents}
                    fetchTemplate={fetchTemplate}
                />
            </div>
            <div className="tab-pane fade h-100 after" id="nav-employ">
                <Functionary
                    functionaries={data.functionaries}
                    fetchFunctionary={fetchFunctionary}
                />
            </div>
        </div>
    );
};
