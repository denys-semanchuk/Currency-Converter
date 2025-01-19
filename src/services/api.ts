import axios from "axios";

interface RatesResponse {
  success: boolean;
  rates: Record<string, number>;
  base: string;
  date: string;
}

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/${API_KEY}`,
});

export const convertCurrency = async (
  from: string,
  to: string,
) => {
  try {
    const response = await api.get(`/pair/${from}/${to}`);
    return response.data.conversion_rate;
  } catch (error) {
    console.error("Error converting currency:", error);
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
    const response = await api.get("/codes");
    if (response.data.result !== "success") {
      throw new Error("Failed to fetch symbols");
    }
    return response.data.supported_codes;
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return ["USD", "EUR", "GBP", "JPY", "AUD"];
  }
};
