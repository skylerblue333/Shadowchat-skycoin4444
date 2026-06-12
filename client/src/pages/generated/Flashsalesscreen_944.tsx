// AUTO-GENERATED DRAFT SCREEN: FlashSalesScreen
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFlashSales, { FlashSaleItemProps } from "@/hooks/useFlashSales";

const FlashSaleItem: React.FC<FlashSaleItemProps> = ({
  name, originalPrice, salePrice, discount, imageUrl, endTime, stock, totalStock, category
}) => {
  const progressValue = (stock / totalStock) * 100;

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardDescription className="text-sm text-gray-500">Ends: {endTime}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-2xl font-bold text-red-600">${salePrice.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          <Badge className="bg-green-500 text-white">-{discount}%</Badge>
        </div>
        <div className="mb-4">
          <Progress value={progressValue} className="w-full" />
          <p className="text-xs text-gray-500 mt-1">{stock} of {totalStock} available</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
};

const FlashSalesScreen: React.FC = () => {
  const { data: flashSaleItems, isLoading, isError, error, refetch } = useFlashSales();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-8">⚡ Flash Sales</h1>
        <p>Loading flash sales...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-8">⚡ Flash Sales</h1>
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={refetch} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">⚡ Flash Sales</h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="active">Active Sales</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Sales</TabsTrigger>
          <TabsTrigger value="ended">Ended Sales</TabsTrigger>
        </TabsList>
        <Separator className="mb-6" />
        <TabsContent value="active">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {flashSaleItems && flashSaleItems.length > 0 ? (
              flashSaleItems.map((item) => (
                <FlashSaleItem key={item.id} {...item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No active flash sales at the moment.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <p className="text-center text-gray-500">No upcoming flash sales at the moment. Check back soon!</p>
        </TabsContent>
        <TabsContent value="ended">
          <p className="text-center text-gray-500">No ended flash sales to display.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashSalesScreen;