import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { converterReducer, initialState } from 'reducer';
import toast from 'react-hot-toast';
import { convertCurrency, getSupportedSymbols } from 'services/api';

interface ConverterContextType {
  state: {
    amount: number;
    fromCurrency: string;
    toCurrency: string;
    result: string;
    currencies: string[];
    isLoading: boolean;
  };
  dispatch: React.Dispatch<any>;
  fetchCurrencies: () => Promise<void>;
  handleConvert: (amount: number, fromCurrency: string, toCurrency: string) => Promise<void>;
}

const defaultContext: ConverterContextType = {
  state: initialState,
  dispatch: () => null,
  fetchCurrencies: async () => {},
  handleConvert: async () => {}
};

const ConverterContext = createContext<ConverterContextType>(defaultContext);

export const ConverterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(converterReducer, initialState);

  const fetchCurrencies = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const symbols = await getSupportedSymbols();
      dispatch({ type: 'SET_CURRENCIES', payload: symbols });
    } catch (error) {
      toast.error('Failed to fetch currencies');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleConvert = async (amount: number, fromCurrency: string, toCurrency: string) => {
    if (!amount || !fromCurrency || !toCurrency) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const rate = await convertCurrency(fromCurrency, toCurrency);
      const sum = (rate * amount).toFixed(2);
      dispatch({
        type: 'SET_RESULT',
        payload: `${amount} ${fromCurrency} = ${sum} ${toCurrency}`,
      });
      toast.success('Conversion successful!');
    } catch (error) {
      toast.error('Conversion failed');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ConverterContext.Provider value={{ state, dispatch, fetchCurrencies, handleConvert }}>
      {children}
    </ConverterContext.Provider>
  );
};

export const useConverter = () => {
  const context = useContext(ConverterContext);
  if (!context) {
    throw new Error('useConverter must be used within a ConverterProvider');
  }
  return context;
};