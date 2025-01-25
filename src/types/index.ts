export interface ConverterState {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: string;
  currencies: string[];
  isLoading: boolean;
}

export type ConverterAction =
  | { type: 'SET_AMOUNT'; payload: number }
  | { type: 'SET_FROM_CURRENCY'; payload: string }
  | { type: 'SET_TO_CURRENCY'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'SET_CURRENCIES'; payload: string[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SWAP_CURRENCIES' };