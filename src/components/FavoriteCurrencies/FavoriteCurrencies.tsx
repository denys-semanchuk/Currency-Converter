import React from 'react';
import { useConverter } from 'contexts/ConvertContext';
import './FavoriteCurrencies.css';

export const FavoriteCurrencies: React.FC = () => {
  const { state, dispatch } = useConverter();
  if (state.favorites.length === 0) return null;

  const toggleFavorite = (currency: string) => {
    if (state.favorites.includes(currency)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: currency });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: currency });
    }
  };

  return (
    <div className="favorites-container">
      <h3>Favorite Currencies</h3>
      <div className="favorites-grid">
        {state.favorites.map(currency => (
          <button
            key={currency}
            className={`favorite-button ${state.favorites.includes(currency) ? 'active' : ''}`}
            onClick={() => toggleFavorite(currency)}
          >
            {currency}
          </button>
        ))}
      </div>
      <div className="quick-select">
        {state.favorites.map(currency => (
          <button
            key={currency}
            className="quick-select-button"
            onClick={() => dispatch({ type: 'SET_TO_CURRENCY', payload: currency })}
          >
            Convert to {currency}
          </button>
        ))}
      </div>
    </div>
  );};