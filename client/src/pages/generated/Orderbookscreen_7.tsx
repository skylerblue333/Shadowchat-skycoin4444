// AUTO-GENERATED DRAFT SCREEN: OrderBookScreen
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Slider } from '@/components/ui/slider';

interface Order {
  price: number;
  size: number;
  total: number;
}

interface OrderBookData {
  bids: Order[];
  asks: Order[];
}

const fetchOrderBook = async (): Promise<OrderBookData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const generateOrders = (isBid: boolean) => {
        const orders: Order[] = [];
        let total = 0;
        for (let i = 0; i < 15; i++) {
          const price = isBid ? 30000 - i * 10 : 30000 + i * 10;
          const size = Math.floor(Math.random() * 100) + 1;
          total += size;
          orders.push({ price, size, total });
        }
        return orders;
      };
      resolve({
        bids: generateOrders(true),
        asks: generateOrders(false),
      });
    }, 500);
  });
};

const OrderBookScreen: React.FC = () => {
  const [grouping, setGrouping] = useState<number>(10);
  const { data, isLoading, isError, error } = useQuery<OrderBookData, Error>({
    queryKey: ['orderBook'],
    queryFn: fetchOrderBook,
    refetchInterval: 5000,
  });

  const groupOrders = useCallback((orders: Order[], groupSize: number): Order[] => {
    if (!orders || orders.length === 0) return [];
    const grouped: { [key: number]: Order } = {};
    orders.forEach(order => {
      const groupedPrice = Math.floor(order.price / groupSize) * groupSize;
      if (grouped[groupedPrice]) {
        grouped[groupedPrice].size += order.size;
        grouped[groupedPrice].total += order.size;
      } else {
        grouped[groupedPrice] = { ...order, price: groupedPrice };
      }
    });
    return Object.values(grouped).sort((a, b) => a.price - b.price);
  }, []);

  const groupedBids = groupOrders(data?.bids || [], grouping);
  const groupedAsks = groupOrders(data?.asks || [], grouping);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading Order Book...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-lg">Error: {error?.message}</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800 dark:text-gray-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Crypto: Order Book</CardTitle>
          <ToggleGroup type="single" value={String(grouping)} onValueChange={(value) => setGrouping(Number(value))} aria-label="Order grouping">
            <ToggleGroupItem value="1" aria-label="Group by 1">1</ToggleGroupItem>
            <ToggleGroupItem value="10" aria-label="Group by 10">10</ToggleGroupItem>
            <ToggleGroupItem value="100" aria-label="Group by 100">100</ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-green-500">Bids</h3>
              <ScrollArea className="h-[300px] w-full rounded-md border dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:hover:bg-gray-700">
                      <TableHead className="w-[100px]">Price</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedBids.map((order, index) => (
                      <TableRow key={index} className="dark:hover:bg-gray-700">
                        <TableCell className="font-medium text-green-500">{order.price.toFixed(2)}</TableCell>
                        <TableCell>{order.size}</TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-red-500">Asks</h3>
              <ScrollArea className="h-[300px] w-full rounded-md border dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:hover:bg-gray-700">
                      <TableHead className="w-[100px]">Price</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedAsks.map((order, index) => (
                      <TableRow key={index} className="dark:hover:bg-gray-700">
                        <TableCell className="font-medium text-red-500">{order.price.toFixed(2)}</TableCell>
                        <TableCell>{order.size}</TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
          <Separator className="my-4 dark:bg-gray-700" />
          <div className="flex items-center justify-between">
            <span className="text-sm">Grouping: {grouping}</span>
            <Slider
              defaultValue={[grouping]}
              max={100}
              step={1}
              onValueChange={(value) => setGrouping(value[0])}
              className="w-[60%]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderBookScreen;
