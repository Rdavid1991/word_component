import { createContext } from 'react';
import { AddresseesSchema, DepartmentSchema, FunctionarySchema, TemplateInfoSchema } from 'src/helpers/interface';


interface ContextSchema {
    controls: Array<any>
    departments: Array<DepartmentSchema>,
    fetchDepartments : () => void;
    showLoader: (show: boolean) => void,
    setControls: (controls: Array<any>) => void
}

export const context = createContext<ContextSchema>(null);

interface FetchContextSchema {
    fetchTemplate: () => Promise<void>;
    data: {
        department: DepartmentSchema
        addressee: Array<AddresseesSchema>
        functionaries: Array<FunctionarySchema>
        documents: Array<TemplateInfoSchema>
    }
}


export const FetchContext = createContext<FetchContextSchema>(null)