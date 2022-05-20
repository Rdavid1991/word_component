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

export interface HomeGenerateDocumentState {
    to: number,
    subject: string,
    functionary: string,
    cc: Array<any>,
    from: string,
    hasCopy: boolean
}
export interface DocumentInfoSchema {
    id : number,
    name: string,
    type : number,
    department_owner_id : number
}