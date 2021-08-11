import { CampoState } from './CampoContext';

type CampoAction =
  | { type: 'setValue'; payload: string }
  | { type: 'setOpcionDepende'; payload: number };

export const campoReducer = (
  state: CampoState,
  action: CampoAction,
): CampoState => {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        campoValue: action.payload,
      };
    case 'setOpcionDepende':
      return {
        ...state,
        opcionDependeSeleccionada: action.payload,
      };
    default:
      return state;
  }

  return state;
};
