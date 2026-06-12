// AUTO-GENERATED DRAFT SCREEN: CryptoCandlestickChart
import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Bar, ErrorBar } from 'recharts';

interface CandlestickData {
  name: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface CandlestickChartProps {
  data: CandlestickData[];
}

const CryptoCandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const formatData = data.map(item => ({
    ...item,
    range: [item.low, item.high],
    // For Recharts Bar component, we need to calculate the y and height for the candle body
    // y is the minimum of open and close, height is the absolute difference
    y: Math.min(item.open, item.close),
    height: Math.abs(item.open - item.close),
    fill: item.open > item.close ? '#ef4444' : '#22c55e', // Red for down, Green for up
  }));

  return (
    <div className="w-full h-96 bg-background rounded-lg shadow-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={formatData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="fill-foreground" />
          <YAxis className="fill-foreground" />
          <Tooltip />
          <ErrorBar dataKey="range" width={5} strokeWidth={1} stroke="#8884d8" direction="y" />
          <Bar dataKey="height" yAxisId="1" fill="#8884d8" shape={(props) => {
            const { x, y, width, height, fill } = props;
            return (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
              />
            );
          }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoCandlestickChart;