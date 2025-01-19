import React, { useEffect, useState } from 'react';
import { convertCurrency, getSupportedSymbols } from '../../services/api';
import './ConverterForm.css';

export const ConverterForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !fromCurrency || !toCurrency) {
      return;
    }
    const conversionRate = await convertCurrency(fromCurrency, toCurrency);
    const sum = conversionRate * amount
    setResult(`${amount} ${fromCurrency} = ${sum} ${toCurrency}`);
  };

  useEffect(() => {

    setIsLoading(true)
    getSupportedSymbols().then(data => {
      setCurrencies(data);
      setIsLoading(false)
    });
  }, [])


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            disabled={isLoading}
          >
            {currencies.length > 0 && currencies.map(currency => (
              <option key={currency[0]} value={currency[0]}>{currency[1]} | {currency[0]}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            disabled={isLoading}
          >
            {currencies.length > 0 && currencies.map(currency => (
              <option key={currency[0]} value={currency[0]}>{currency[1]} | {currency[0]}</option>
            ))}
          </select>
        </div>

        <button type="submit">Convert</button>
      </form>
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </>
  )
}
