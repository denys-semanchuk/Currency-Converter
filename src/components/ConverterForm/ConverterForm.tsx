import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import './ConverterForm.css';
import { CurrencyChart } from 'components/CurrencyChart/CurrencyChart';
import { useConverter } from 'contexts/ConvertContext';

export const ConverterForm = () => {
  const {
    state,
    fetchCurrencies,
    handleConvert,
    dispatch,
  } = useConverter();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    handleConvert(state.amount, state.fromCurrency, state.toCurrency);
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
      <CurrencyChart
        fromCurrency={state.fromCurrency}
        toCurrency={state.toCurrency}
      />
    </div>
  );
};
