// AUTO-GENERATED DRAFT SCREEN: ProductDetail
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Mock tRPC client for demonstration
const trpc = {
  product: {
    getById: {
      useQuery: (productId: string) => {
        // Simulate API call
        const { data, isLoading, isError, error } = useQuery<Product, Error>(
          ["product", productId],
          async () => {
            if (productId === "error-product") {
              throw new Error("Failed to fetch product details.");
            }
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
            return {
              id: productId,
              name: "Example Product " + productId,
              description:
                "This is a detailed description of the example product. It highlights various features and benefits, providing comprehensive information to the user.",
              price: 99.99,
              imageUrl: "https://via.placeholder.com/400",
              currency: "USD",
              stock: 10,
            };
          },
          { enabled: !!productId },
        );
        return { data, isLoading, isError, error };
      },
    },
  },
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  currency: string;
  stock: number;
}

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = trpc.product.getById.useQuery(productId);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <Alert variant="destructive" className="w-full max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ||
              "An unknown error occurred while fetching product details."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <Alert className="w-full max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Product Not Found</AlertTitle>
          <AlertDescription>
            The product with ID &quot;{productId}&quot; could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:text-gray-50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {product.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
            Product ID: {product.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg object-cover w-full h-auto max-h-96"
            />
          </div>
          <div className="space-y-4">
            <p className="text-4xl font-extrabold text-gray-900 dark:text-gray-50">
              {product.currency} {product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              In Stock: {product.stock}
            </p>
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
              Add to Cart
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button
            variant="outline"
            className="dark:text-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            Back to Marketplace
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetail;
