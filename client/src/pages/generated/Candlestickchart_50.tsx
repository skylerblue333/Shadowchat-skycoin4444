// AUTO-GENERATED DRAFT SCREEN: CandlestickChart
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, CandlestickChart, Candlestick, ReferenceLine } from 'recharts';
import { format } from 'date-fns';

interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  symbol: string;
}

const mockFetchData = async (symbol: string): Promise<CandlestickData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: CandlestickData[] = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - 30 + i);
        const open = Math.random() * 100 + 100;
        const close = open + (Math.random() - 0.5) * 20;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        return { timestamp: date.getTime(), open, high, low, close };
      });
      resolve(data);
    }, 1000);
  });
};

const CandlestickChartComponent: React.FC<CandlestickChartProps> = ({ symbol }) => {
  const [data, setData] = useState<CandlestickData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real application, this would be a tRPC hook call:
        // const result = await trpc.crypto.getCandlestickData.useQuery({ symbol });
        const result = await mockFetchData(symbol);
        setData(result);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">Loading chart data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-500 dark:text-red-400">Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">No data available for {symbol}.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 w-full h-full" aria-label={`Candlestick chart for ${symbol}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{symbol} Candlestick Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <CandlestickChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
          <XAxis
            dataKey="timestamp"
            scale="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(unixTime) => format(new Date(unixTime), 'MMM dd')}
            stroke="#333" className="dark:stroke-gray-300"
            aria-label="Date"
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            stroke="#333" className="dark:stroke-gray-300"
            aria-label="Price"
          />
          <Tooltip
            formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy HH:mm')}
            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #ccc', borderRadius: '4px' }}
            itemStyle={{ color: '#333' }}
          />
          <Candlestick
            dataKey="ohlc"
            stroke="#8884d8"
            fill="#8884d8"
            barSize={10}
            strokeWidth={1}
            fillOpacity={0.8}
            className="dark:stroke-blue-400 dark:fill-blue-400"
          />
          <ReferenceLine y={data[0]?.close} stroke="#ccc" strokeDasharray="3 3" />
        </CandlestickChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandlestickChartComponent;
