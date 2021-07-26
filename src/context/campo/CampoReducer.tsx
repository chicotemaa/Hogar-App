import { CampoState } from "./CampoContext";

type FormAction =
    | { type: 'setValue', payload: string }


export const campoReducer = (state: CampoState, action: FormAction): CampoState => {

    switch (action.type) {
        case 'setValue':
            return {
                ...state,
                campoId: 1243,
                campoValue: action.payload
            }
        default:
            return state
    }

    return state;
}