import { ConverterState, ConverterAction } from 'types';

export const initialState: ConverterState = {
  amount: 0,
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  result: '',
  currencies: [],
  isLoading: false,
};

export const converterReducer = (
  state: ConverterState,
  action: ConverterAction
): ConverterState => {
  switch (action.type) {
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
    case 'SET_FROM_CURRENCY':
      return { ...state, fromCurrency: action.payload };
    case 'SET_TO_CURRENCY':
      return { ...state, toCurrency: action.payload };
    case 'SET_RESULT':
      return { ...state, result: action.payload };
    case 'SET_CURRENCIES':
      return { ...state, currencies: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SWAP_CURRENCIES':
      return {
        ...state,
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency,
      };
    default:
      return state;
  }
};