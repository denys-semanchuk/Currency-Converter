import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { getHistoricalRates } from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CurrencyChartProps {
  fromCurrency: string;
  toCurrency: string;
}

export const CurrencyChart = React.memo<CurrencyChartProps>(({ 
  fromCurrency, 
  toCurrency 
}) => {
  const [chartData, setChartData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setIsLoading(true);
        const endDate = format(new Date(), 'yyyy-MM-dd');
        const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
        
        const data = await getHistoricalRates(fromCurrency, toCurrency, startDate, endDate);
        
        const dates = Object.keys(data.rates);
        const rates = dates.map(date => data.rates[date][toCurrency]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${fromCurrency} to ${toCurrency}`,
              data: rates,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: '30 Day Exchange Rate History'
      }
    }
  };

  if (isLoading) return <div>Loading chart...</div>;
  if (!chartData) return null;

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
}, 
(prevProps, nextProps) => {
  return prevProps.fromCurrency === nextProps.fromCurrency && 
         prevProps.toCurrency === nextProps.toCurrency;
});