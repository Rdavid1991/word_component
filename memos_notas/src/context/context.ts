import { createContext } from 'react';
import { DepartmentSchema } from 'src/interface';

interface ContextSchema {
    departments: Array<DepartmentSchema>,
    showLoader: (show: boolean) => void,
    setControls: (controls: Array<any>) => void
    controls : Array<any>
}

export const context = createContext<ContextSchema>(null);

