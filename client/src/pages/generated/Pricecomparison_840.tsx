// AUTO-GENERATED DRAFT SCREEN: PriceComparison
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './components/ui/card';

// Mock tRPC hook for demonstration purposes
const usePriceComparisonData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await new Promise<Product[]>((resolve) =>
          setTimeout(() => {
            resolve([
              { id: '1', name: 'SKYCOIN Token', price: 1.25, vendor: 'Exchange A' },
              { id: '2', name: 'SKYCOIN Token', price: 1.28, vendor: 'Exchange B' },
              { id: '3', name: 'SKYCOIN Token', price: 1.23, vendor: 'Exchange C' },
              { id: '4', name: 'SKYCOIN Token', price: 1.26, vendor: 'Exchange D' },
            ]);
          }, 1000)
        );
        setProducts(response);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

interface Product {
  id: string;
  name: string;
  price: number;
  vendor: string;
}

const PriceComparison: React.FC = () => {
  const { products, loading, error } = usePriceComparisonData(); // Using the mock tRPC hook

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading price data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">SKYCOIN Price Comparison</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col items-center justify-between">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 dark:text-gray-300">Vendor: {product.vendor}</p>
            </CardContent>
            <CardFooter className="w-full">
              <Button className="w-full">View Offer</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PriceComparison;