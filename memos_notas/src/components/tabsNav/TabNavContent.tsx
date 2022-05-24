//@ts-check
import { useContext, useLayoutEffect, useState } from 'react';
import { Addressees } from '../addressees/Addressees';
import { Home } from '../../screens/Home';
import { Template } from '../../screens/Template';
import InfoHelp from '../../screens/InfoHelp';
import { context, FetchContext } from 'src/context/context';
import { Functionary } from '../../screens/Functionary';
import { existAdmin, existUser, getLocalStorageUserDepartment } from 'src/utils';
import ModalInitialUser from '../../screens/ModalInitialUser';
import fetchData from 'src/utils/fetchData';
import { DataStateSchema } from '../../helpers/interface/index';
import DepartmentInfo from '../../screens/DepartmentInfo';


const initialDataState: DataStateSchema = {
    addressee: [],
    templateInfo: [],
    functionaries: [],
    department: {
        id: 0,
        name: "",
        phone: "",
        shift: "",
        jobTitle: "",

    },
    numberState: {
        note: 1,
        memo: 1,
    }
}

export const TabNavContent = () => {

    const { showLoader, departments } = useContext(context);

    const [data, setData] = useState<typeof initialDataState>(initialDataState)
    const [showModal, setShowModal] = useState(false);

    useLayoutEffect(() => {

        (async () => {

            if (existUser()) {

                const responseNumbers = await fetchData.fetchNumbers();
                const responseTemplate = await fetchData.fetchTemplate();
                const responseAddresses = await fetchData.fetchAddresses();
                const responseFunctionary = await fetchData.fetchFunctionary();
                const responseDepartment = await fetchData.fetchDepartment(getLocalStorageUserDepartment());

                setData({
                    addressee: responseAddresses,
                    templateInfo: responseTemplate,
                    functionaries: responseFunctionary,
                    numberState: responseNumbers,
                    department: responseDepartment,
                })
                setShowModal(false);
            } else if (existAdmin()) {
                const responseTemplate = await fetchData.fetchTemplate();
                setData({
                    ...data,
                    templateInfo: responseTemplate,

                })
            } else {
                setShowModal(true)
            }

        })();
    }, []);

    const fetchNumbers = async () => setData({ ...data, numberState: await fetchData.fetchNumbers() })
    const fetchAddresses = async () => setData({ ...data, addressee: await fetchData.fetchAddresses() })
    const fetchTemplate = async () => setData({ ...data, templateInfo: await fetchData.fetchTemplate() })
    const fetchFunctionary = async () => setData({ ...data, functionaries: await fetchData.fetchFunctionary() })
    const fetchDepartment = async () => setData({ ...data, department: await fetchData.fetchDepartment(getLocalStorageUserDepartment()) })
    
    return (
        <FetchContext.Provider
            value={{
                fetchTemplate,
                fetchNumbers,
                data: {
                    department: data.department,
                    addressee: data.addressee,
                    functionaries: data.functionaries,
                    documents: data.templateInfo,
                }
            }}
        >
            <div className="tab-content scroll shadow__top" id="nav-tabContent">

                {
                    showModal ? <ModalInitialUser setShowModal={setShowModal} /> : null
                }

                <div className="tab-pane fade active show" id="nav-home">
                    <Home />
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
                        templates={data.templateInfo}
                    />
                </div>
                <div className="tab-pane fade h-100 after" id="nav-employ">
                    <Functionary
                        functionaries={data.functionaries}
                        fetchFunctionary={fetchFunctionary}
                    />
                </div>
                <div className="tab-pane fade h-100 after" id="nav-dep-info">
                    <DepartmentInfo {...{ fetchDepartment }} />
                </div>
            </div>
        </FetchContext.Provider>
    );
};
