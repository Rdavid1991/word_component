import { getLocalStorageUserName } from "src/utils";
import { SelectedMemorandumOrNoteState } from "../interface";

export const initialStateSelectedMemorandumOrNote: SelectedMemorandumOrNoteState = {
    to: NaN,
    subject: "",
    functionary: "",
    cc: [],
    from: getLocalStorageUserName(),
    hasCopy: false
};