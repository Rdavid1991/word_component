import { Addressees } from '../components/addressees/Addressees';
import { Interface } from 'readline';
export interface FunctionarySchema {
    id: string,
    name: string,
    id_card: string,
    job_title: string,
    position_number: string,
}

export interface AddresseesSchema {
    id: number,
    name: string,
    jobTitle: string,
    archetype: string,
    department: string,
    department_owner_id: number
}

export interface TemplateSchema {
    id: number,
    name: string,
    type: number,
    department_owner_id: number
}

export interface DepartmentSchema {
    id: number,
    name: string
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

export interface Consecutive {
    note: number,
    memo: number,
}

export interface DataStateSchema {
    addressee: Array<any>,
    templateInfo: Array<TemplateInfoSchema>,
    functionaries: Array<any>,
    numberState: Consecutive
}