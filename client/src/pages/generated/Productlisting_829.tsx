// AUTO-GENERATED DRAFT SCREEN: ProductListing
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming Skeleton component will be added
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Assuming Alert component will be added
import { Terminal } from 'lucide-react'; // Assuming Lucide-react is installed

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Simulated tRPC hook for fetching products
const useGetProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
      setIsError(false);
      setTimeout(() => {
        // Simulate API call success or failure
        const success = Math.random() > 0.2; // 80% chance of success
        if (success) {
          const dummyProducts: Product[] = [
            {
              id: '1',
              name: 'Ergonomic Mechanical Keyboard',
              description: 'A high-performance mechanical keyboard with customizable RGB lighting and ergonomic design for comfortable typing.',
              price: 129.99,
              imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Keyboard'
            },
            {
              id: '2',
              name: 'Wireless Noise-Cancelling Headphones',
              description: 'Immersive audio experience with active noise cancellation, long battery life, and comfortable over-ear design.',
              price: 199.99,
              imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Headphones'
            },
            {
              id: '3',
              name: '4K Ultra HD Monitor',
              description: 'Stunning 4K resolution monitor with vibrant colors and wide viewing angles, perfect for professional work and entertainment.',
              price: 349.99,
              imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Monitor'
            },
            {
              id: '4',
              name: 'Portable SSD 1TB',
              description: 'Ultra-fast portable solid-state drive with 1TB storage, ideal for quick data transfers and backups on the go.',
              price: 99.99,
              imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=SSD'
            },
            {
              id: '5',
              name: 'Smartwatch with Health Tracking',
              description: 'Feature-rich smartwatch with heart rate monitoring, GPS, sleep tracking, and notifications for a healthier lifestyle.',
              price: 149.99,
              imageUrl: 'https://via.placeholder.com/150/A133FF/FFFFFF?text=Smartwatch'
            },
            {
              id: '6',
              name: 'Gaming Mouse with Adjustable DPI',
              description: 'Precision gaming mouse with adjustable DPI settings, programmable buttons, and ergonomic grip for competitive gaming.',
              price: 59.99,
              imageUrl: 'https://via.placeholder.com/150/33FFF5/FFFFFF?text=Mouse'
            },
            {
              id: '7',
              name: 'USB-C Hub 7-in-1',
              description: 'Versatile USB-C hub with multiple ports including HDMI, USB 3.0, SD card reader, and power delivery for enhanced connectivity.',
              price: 39.99,
              imageUrl: 'https://via.placeholder.com/150/FF8C33/FFFFFF?text=USBHub'
            },
            {
              id: '8',
              name: 'Webcam 1080p with Autofocus',
              description: 'Full HD 1080p webcam with autofocus and built-in microphone, perfect for video calls and streaming.',
              price: 49.99,
              imageUrl: 'https://via.placeholder.com/150/8C33FF/FFFFFF?text=Webcam'
            },
          ];
          setData(dummyProducts);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      }, 1500); // Simulate network delay
    };

    fetchProducts();
  }, []);

  return { data, isLoading, isError };
};

const ProductListing: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 min-h-screen bg-background text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-center">
          Loading Products...
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader className="p-0">
                <Skeleton className="w-full h-48 rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-8 w-1/2 mt-4" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8 px-4 min-h-screen bg-background text-foreground flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-center">
        Explore Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader className="p-0">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground line-clamp-3">{product.description}</CardDescription>
              <p className="text-2xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Add to Cart</n>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
