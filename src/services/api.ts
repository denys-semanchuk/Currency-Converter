import axios from 'axios';

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
  try {
    const response = await api.get<RatesResponse>("/latest", {
      params: {
        base,
      },
    });

    if (!response.data.success) {
      throw new Error("Failed to fetch rates");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching latest rates:", error);
    throw error;
  }
};

export const getSupportedSymbols = async (): Promise<string[]> => {
  try {
    const response = await api.get<FrankfurterSymbolsResponse>('/currencies');
    return Object.keys(response.data);
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