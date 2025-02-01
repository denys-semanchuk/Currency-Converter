import React, { useEffect, useState } from 'react';
import { convertCurrency } from 'services/api';
import './ExchangeRateWidget.css';

interface ExchangeRateWidgetProps {
  fromCurrency: string;
  toCurrency: string;
}

export const ExchangeRateWidget: React.FC<ExchangeRateWidgetProps> = ({
  fromCurrency,
  toCurrency
}) => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRate = async () => {
    try {
      setLoading(true);
      const newRate = await convertCurrency(fromCurrency, toCurrency);
      setRate(newRate);
    } catch (error) {
      console.error('Failed to fetch rate:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
    const interval = setInterval(fetchRate, 60000);
    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  return (
    <div className="exchange-rate-widget">
      <div className="rate-info">
        {loading ? (
          <span className="loading">Loading rate...</span>
        ) : (
          <>
            <span className="rate-label">Current Rate:</span>
            <span className="rate-value">
              1 {fromCurrency} = {rate?.toFixed(4)} {toCurrency}
            </span>
          </>
        )}
      </div>
      <span className="update-text">Updates every minute</span>
    </div>
  );
};