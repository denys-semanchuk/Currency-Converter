import axios from 'axios';
import { CacheService } from './cache';


const CACHE_KEYS = {
  RATES: 'currency_rates',
  SYMBOLS: 'currency_symbols',
};

const api = axios.create({
  baseURL: 'https://api.frankfurter.app'
});

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number = 1
): Promise<number> => {
  try {
    const response = await api.get('/latest', {
      params: {
        amount,
        from,
        to
      }
    });
    return response.data.rates[to];
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};

export const getLatestRates = async (
  base: string = "EUR"
): Promise<RatesResponse> => {
  const cachedRates = CacheService.get<RatesResponse>(CACHE_KEYS.RATES);
  
  if (cachedRates) {
    return cachedRates;
  }
  try {
    const response = await api.get<RatesResponse>("/latest", {
      params: {
        base,
      },
    });

    if (!response.data.success) {
      throw new Error("Failed to fetch rates");
    }

    CacheService.set(CACHE_KEYS.RATES, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest rates:", error);
    throw error;
  }
};

export const getSupportedSymbols = async (): Promise<string[]> => {
  const cachedSymbols = CacheService.get<string[]>(CACHE_KEYS.SYMBOLS);

  if (cachedSymbols) {
    return cachedSymbols;
  }

  try {
    const response = await api.get<FrankfurterSymbolsResponse>('/currencies');
    const symbols = Object.keys(response.data);
    CacheService.set(CACHE_KEYS.SYMBOLS, symbols);
    return symbols;
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return ["USD", "EUR", "GBP", "JPY", "AUD"];
  }
};

export const getHistoricalRates = async (
  base: string,
  symbol: string,
  startDate: string,
  endDate: string
): Promise<FrankfurterHistoricalResponse> => {
  try {
    const response = await api.get<FrankfurterHistoricalResponse>(`/${startDate}..${endDate}`, {
      params: {
        from: base,
        to: symbol
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    throw error;
  }
};






interface RatesResponse {
  success: boolean;
  rates: Record<string, number>;
  base: string;
  date: string;
}

interface FrankfurterSymbolsResponse {
  [key: string]: string;
}

interface FrankfurterHistoricalResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [date: string]: {
      [currency: string]: number;
    };
  };
}