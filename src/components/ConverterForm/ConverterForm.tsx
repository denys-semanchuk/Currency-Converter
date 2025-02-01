import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import './ConverterForm.css';
import { CurrencyChart } from 'components/CurrencyChart/CurrencyChart';
import { useConverter } from 'contexts/ConvertContext';
import { FavoriteCurrencies } from 'components/FavoriteCurrencies/FavoriteCurrencies';
import { StarButton } from 'components/StarButton/StarButton';
import AmountInput from 'components/AmountInput/AmountInput';

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

  const handleSubmit = async (e: any) => {
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
        <FavoriteCurrencies />
        <div className="form-group">
          <AmountInput />
        </div>

        <div className="currencies-container">
          <div className="form-group">
            <label>From:</label>
            <div className="select-with-star">
              <select
                value={state.fromCurrency}
                onChange={(e) => dispatch({
                  type: 'SET_FROM_CURRENCY',
                  payload: e.target.value
                })}
                disabled={state.isLoading}
              >
                {state.currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <StarButton
                isActive={state.favorites.includes(state.fromCurrency)}
                onClick={() => dispatch({
                  type: state.favorites.includes(state.fromCurrency)
                    ? 'REMOVE_FAVORITE'
                    : 'ADD_FAVORITE',
                  payload: state.fromCurrency
                })}
              />
            </div>
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
            <div className="select-with-star">

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
              <StarButton
                isActive={state.favorites.includes(state.toCurrency)}
                onClick={() => dispatch({
                  type: state.favorites.includes(state.toCurrency)
                    ? 'REMOVE_FAVORITE'
                    : 'ADD_FAVORITE',
                  payload: state.toCurrency
                })}
              />
            </div>
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
