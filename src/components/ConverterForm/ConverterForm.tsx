import React, { useEffect, useReducer } from 'react';
import { convertCurrency, getSupportedSymbols } from '../../services/api';
import { converterReducer, initialState } from 'reducer';
import toast from 'react-hot-toast';
import './ConverterForm.css';

export const ConverterForm = () => {
  const [state, dispatch] = useReducer(converterReducer, initialState);

  useEffect(() => {
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
    fetchCurrencies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.amount || !state.fromCurrency || !state.toCurrency) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const rate = await convertCurrency(state.fromCurrency, state.toCurrency);
      const sum = (rate * state.amount).toFixed(2);
      dispatch({
        type: 'SET_RESULT',
        payload: `${state.amount} ${state.fromCurrency} = ${sum} ${state.toCurrency}`,
      });
      toast.success('Conversion successful!');
    } catch (error) {
      toast.error('Conversion failed');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleSwapCurrencies = () => {
    dispatch({ type: 'SWAP_CURRENCIES' });
    toast.success('Currencies swapped!');
  };

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={state.amount}
            onChange={(e) => dispatch({ 
              type: 'SET_AMOUNT', 
              payload: Number(e.target.value) 
            })}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="currencies-container">
          <div className="form-group">
            <label>From:</label>
            <select
              value={state.fromCurrency}
              onChange={(e) => dispatch({ 
                type: 'SET_FROM_CURRENCY', 
                payload: e.target.value 
              })}
              disabled={state.isLoading}
            >
              {state.currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="swap-button"
            onClick={handleSwapCurrencies}
            disabled={state.isLoading}
          >
            ⇄
          </button>

          <div className="form-group">
            <label>To:</label>
            <select
              value={state.toCurrency}
              onChange={(e) => dispatch({ 
                type: 'SET_TO_CURRENCY', 
                payload: e.target.value 
              })}
              disabled={state.isLoading}
            >
              {state.currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" disabled={state.isLoading}>
          Convert
        </button>
      </form>

      {state.result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{state.result}</p>
        </div>
      )}
    </div>
  );
};
