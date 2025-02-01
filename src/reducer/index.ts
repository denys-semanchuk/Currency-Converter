import { ConverterState, ConverterAction } from "types";
import { getFavorites, saveFavorites } from "utils/localStorage/favoriteUtils";

export const initialState: ConverterState = {
  amount: 0,
  fromCurrency: "USD",
  toCurrency: "EUR",
  result: "",
  currencies: [],
  isLoading: false,
  favorites: getFavorites()
};

export const FAVORITES_KEY = "favorite_currencies";

export const converterReducer = (
  state: ConverterState,
  action: ConverterAction
): ConverterState => {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_FROM_CURRENCY":
      return { ...state, fromCurrency: action.payload };
    case "SET_TO_CURRENCY":
      return { ...state, toCurrency: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_CURRENCIES":
      return { ...state, currencies: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SWAP_CURRENCIES":
      return {
        ...state,
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency,
      };
    case "ADD_FAVORITE":
      const newFavorites = [...state.favorites, action.payload];
      saveFavorites(newFavorites);
      return { ...state, favorites: newFavorites };
    case "REMOVE_FAVORITE":
      const updatedFavorites = state.favorites.filter(
        (c) => c !== action.payload
      );
      saveFavorites(updatedFavorites);
      return { ...state, favorites: updatedFavorites };
    default:
      return state;
  }
};
