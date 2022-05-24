import { createContext } from 'react';
import { AddresseesSchema, DepartmentSchema, FunctionarySchema, TemplateInfoSchema } from 'src/helpers/interface';


interface ContextSchema {
    departments: Array<DepartmentSchema>,
    controls: Array<any>
    showLoader: (show: boolean) => void,
    setControls: (controls: Array<any>) => void
}

export const context = createContext<ContextSchema>(null);

interface FetchContextSchema {
    fetchTemplate: () => Promise<void>;
    fetchNumbers: () => Promise<void>;
    data: {
        department: DepartmentSchema
        addressee: Array<AddresseesSchema>
        functionaries: Array<FunctionarySchema>
        documents: Array<TemplateInfoSchema>
    }
}


export const FetchContext = createContext<FetchContextSchema>(null)