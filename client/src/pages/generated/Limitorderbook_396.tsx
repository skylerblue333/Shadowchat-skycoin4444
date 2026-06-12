// AUTO-GENERATED DRAFT SCREEN: LimitOrderBook
import React, { useState } from 'react';
import { trpc } from '../trpc';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LimitOrderBookProps {
  // Define props here if needed
}

const LimitOrderBook: React.FC<LimitOrderBookProps> = () => {
  const { data, isLoading, error } = trpc.orderBook.useQuery({ pair: 'BTC/USD' });
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handlePlaceOrder = () => {
    // In a real application, this would interact with a tRPC mutation to place an order
    console.log(`Placing ${orderType} order: Price ${price}, Amount ${amount}`);
    setPrice('');
    setAmount('');
    alert(`Order placed: ${orderType} ${amount} BTC at ${price} USD`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-lg">Loading order book...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground text-red-500">
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto: Limit Order Book</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Book - Bids */}
        <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-700">
          <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300">Bids</h2>
          <div className="space-y-2" role="table" aria-label="Bids Order Book">
            <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400 border-b pb-2 mb-2">
              <span className="w-1/2 text-left">Price (USD)</span>
              <span className="w-1/2 text-right">Amount (BTC)</span>
            </div>
            {data?.bids.map((bid, index) => (
              <div key={index} className="flex justify-between text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200" role="row">
                <span className="w-1/2 text-left" role="cell">{bid.price.toFixed(2)}</span>
                <span className="w-1/2 text-right" role="cell">{bid.amount.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Book - Asks */}
        <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg shadow-md border border-red-200 dark:border-red-700">
          <h2 className="text-2xl font-semibold mb-4 text-red-700 dark:text-red-300">Asks</h2>
          <div className="space-y-2" role="table" aria-label="Asks Order Book">
            <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400 border-b pb-2 mb-2">
              <span className="w-1/2 text-left">Price (USD)</span>
              <span className="w-1/2 text-right">Amount (BTC)</span>
            </div>
            {data?.asks.map((ask, index) => (
              <div key={index} className="flex justify-between text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-200" role="row">
                <span className="w-1/2 text-left" role="cell">{ask.price.toFixed(2)}</span>
                <span className="w-1/2 text-right" role="cell">{ask.amount.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Pair and Price Info */}
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Trading Info</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Pair:</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">BTC/USD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Last Price:</span>
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{data?.lastPrice.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">24h Change:</span>
            <span className={`text-lg font-semibold ${data && data.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{data?.change24h.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Order Placement Form */}
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Place Order</h2>
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => setOrderType('buy')}
            className={`${orderType === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'} text-white`}
          >
            Buy
          </Button>
          <Button
            onClick={() => setOrderType('sell')}
            className={`${orderType === 'sell' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'} text-white`}
          >
            Sell
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount (BTC)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={handlePlaceOrder} className="mt-6 w-full">
          Place {orderType === 'buy' ? 'Buy' : 'Sell'} Order
        </Button>
      </div>
    </div>
  );
};

export default LimitOrderBook;