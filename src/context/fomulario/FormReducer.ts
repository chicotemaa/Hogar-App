import { FormState } from './FormularioContext';

type FormAction =
  | { type: 'getFormId' }
  | { type: 'setValue'; payload: string }
  | { type: 'setPage'; payload: number }
  | { type: 'getResultado'; payload: number }
  | { type: 'setResultado' };

export const formReducer = (
  state: FormState,
  action: FormAction,
): FormState => {
  switch (action.type) {
    case 'getFormId':
      return {
        ...state,
        formularioId: 1696,
        esExpress: true,
        campoValue: undefined,
      };
    case 'setValue':
      return {
        ...state,
        campoValue: action.payload,
      };
    case 'setPage':
      return {
        ...state,
        page: action.payload,
      };
    case 'getResultado':
      //TODO: obtener resultado de formulario, get formID?
      console.log('get resultado', action.payload);
      return {
        ...state,
      };
    case 'setResultado':
      return {
        ...state,
      };
    default:
      return state;
  }
};
