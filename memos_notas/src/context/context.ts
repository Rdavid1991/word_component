import { createContext } from 'react';
import { DepartmentSchema } from 'src/interface';

interface ContextSchema {
    departments: Array<DepartmentSchema>,
    controls: Array<any>
    showLoader: (show: boolean) => void,
    setControls: (controls: Array<any>) => void
}

export const context = createContext<ContextSchema>(null);

interface FetchContextSchema {
    fetchTemplate: () => Promise<void>
}


export const FetchContext = createContext<FetchContextSchema>(null)