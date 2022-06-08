import React, { useContext, useLayoutEffect, useState } from 'react';
import { Addressees } from '../screens/Addressees';
import { Home } from '../screens/Home';
import { Template } from '../screens/Template';
import { Functionary } from '../screens/Functionary';
import { context, FetchContext } from 'src/context/context';
import { DataStateSchema } from '../helpers/interface/index';
import { existAdmin, existUser, getLocalStorageUserDepartment } from 'src/utils';
import InfoHelp from '../screens/InfoHelp';
import ModalInitialUser from '../screens/ModalInitialUser';
import fetchData from 'src/utils/fetchData';
import DepartmentInfoUser from '../screens/DepartmentInfoUser';
import DepartmentInfoAdmin from 'src/screens/DepartmentInfoAdmin';


const initialDataState: DataStateSchema = {
    addressee  : [],
    department : {
        id       : undefined,
        initials : undefined,
        jobTitle : undefined,
        name     : undefined,
        phone    : undefined,
        shift    : undefined,

    },
    functionaries: [],

    templateInfo: [],
};

export const TabNavContent = () => {

    const { showLoader, departments } = useContext(context);

    const [data, setData] = useState<typeof initialDataState>(initialDataState);
    const [showModal, setShowModal] = useState(false);

    useLayoutEffect(() => {

        (async () => {

            if (existUser()) {

                const responseTemplate = await fetchData.fetchTemplate();
                const responseAddresses = await fetchData.fetchAddresses();
                const responseFunctionary = await fetchData.fetchFunctionary();
                const responseDepartment = await fetchData.fetchDepartment(getLocalStorageUserDepartment());

                setData({
                    addressee     : responseAddresses,
                    department    : responseDepartment,
                    functionaries : responseFunctionary,
                    templateInfo  : responseTemplate,
                });
                setShowModal(false);
            } else if (existAdmin()) {
                const responseTemplate = await fetchData.fetchTemplate();
                setData({
                    ...data,
                    templateInfo: responseTemplate,

                });
            } else {
                setShowModal(true);
            }

        })();
    }, []);

    const fetchAddresses = async () => setData({ ...data, addressee: await fetchData.fetchAddresses() });
    const fetchTemplate = async () => setData({ ...data, templateInfo: await fetchData.fetchTemplate() });
    const fetchFunctionary = async () => setData({ ...data, functionaries: await fetchData.fetchFunctionary() });
    const fetchDepartment = async () => setData({ ...data, department: await fetchData.fetchDepartment(getLocalStorageUserDepartment()) });

    return (
        <FetchContext.Provider
            value={{
                data: {
                    addressee     : data.addressee,
                    department    : data.department,
                    documents     : data.templateInfo,
                    functionaries : data.functionaries,
                },
                fetchTemplate,
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
                    <InfoHelp />
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
                    <DepartmentInfoUser {...{ fetchDepartment }} />
                </div>
                <div className="tab-pane fade h-100 after" id="nav-dep-info-admin">
                    <DepartmentInfoAdmin />
                </div>
            </div>
        </FetchContext.Provider>
    );
};
