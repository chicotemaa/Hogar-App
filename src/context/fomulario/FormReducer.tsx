import {FormState} from './FormularioContext';

type FormAction =
  | {type: 'getFormId'}
  | {type: 'setValue'; payload: string}
  | {type: 'setPage'; payload: number};

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
    default:
      return state;
  }

  return state;
};
