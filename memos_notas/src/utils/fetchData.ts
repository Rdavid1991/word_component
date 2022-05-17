import { getAddresses, getConsecutiveNumber, getDocumentInfoTemplate, getFunctionaries } from './SaveAndGet';

interface Consecutive {
    note: string,
    memo: string,
}

const fetchData = {

    fetchFunctionary: async (): Promise<Array<any>> => {
        let functionary = await getFunctionaries();
        if (functionary) {
            const { data } = functionary;
            if (data.length > 0) {
                return data
            } else {
                return []
            }
        }
    },

    fetchNumbers: async (): Promise<Consecutive> => {
        let consecutive = await getConsecutiveNumber();
        if (consecutive) {
            const { data } = consecutive;
            if (data.length > 0) {
                return {
                    note: data[0].notes,
                    memo: data[0].memorandum,
                }
            } else {
                return {
                    note: "1",
                    memo: "1",
                };
            }
        }
    },

    fetchAddresses: async (): Promise<Array<any>> => {
        const addresses = await getAddresses();
        if (addresses) {
            const { data } = addresses;
            if (data.length >= 0) {
                return data;
            } else {
                return []
            }
        }
    },

    fetchTemplate: async (): Promise<Array<any>> => {
        const templates = await getDocumentInfoTemplate();
        if (templates) {
            const { data } = templates;

            if (data.length >= 0) {
                return (data.sort((first, second) => first.type - second.type));
            } else {
                return []
            }
        }
    },

}

export default fetchData