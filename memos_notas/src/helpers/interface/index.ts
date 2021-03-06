import { Addressees } from '../../screens/Addressees';
import { Interface } from 'readline';
export interface FunctionarySchema {
    id: string,
    name: string,
    id_card: string,
    job_title: string,
    position_number: string,
}

export interface AddresseesSchema {
    id?: number,
    name?: string,
    jobTitle?: string,
    archetype?: string,
    department?: string,
    department_owner_id?: number
    edit ?: boolean;
}

export interface TemplateSchema {
    id: number,
    name: string,
    type: number,
    department_owner_id: number
}

export interface DepartmentSchema {
    id?: number;
    name?: string;
    initials?:string;
    phone?: string;
    shift?: string;
    jobTitle?: string;
}

export interface SelectedMemorandumOrNoteState {
    to: number,
    subject: string,
    functionary: string,
    cc: Array<any>,
    from: string,
    hasCopy: boolean
}
export interface TemplateInfoSchema {
    id: number;
    name: string;
    type: number;
    department_owner_id: number;
    edit: boolean;
}


export interface DataStateSchema {
    addressee: Array<AddresseesSchema>,
    templateInfo: Array<TemplateInfoSchema>,
    functionaries: Array<FunctionarySchema>,
    department: DepartmentSchema
}

export interface Result {
    message: {
        title: string;
        text: string;
        icon: string;
    }
}

export interface PermissionRequestSchema {
    from        :string;
    functionary :string;
    to  :string;
}