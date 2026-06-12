// AUTO-GENERATED DRAFT SCREEN: SellerDashboard
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './server/router'; // Assuming a tRPC server setup

// Initialize tRPC client
const trpc = createTRPCReact<AppRouter>();

const queryClient = new QueryClient();

// Dummy tRPC hooks (replace with actual tRPC client calls)
const useProducts = () => trpc.getProducts.useQuery();
const useCreateProduct = () => trpc.createProduct.useMutation();
const useUpdateProduct = () => trpc.updateProduct.useMutation();
const useDeleteProduct = () => trpc.deleteProduct.useMutation();

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const SellerDashboard: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleCreateProduct = () => {
    // Dummy data for creation
    createProductMutation.mutate({ name: 'New Product', price: 100, stock: 50 });
  };

  const handleUpdateProduct = (id: string) => {
    // Dummy data for update
    updateProductMutation.mutate({ id, price: 120 });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" placeholder="Enter product name" />
            </div>
            <div>
              <Label htmlFor="productPrice">Price</Label>
              <Input id="productPrice" type="number" placeholder="Enter price" />
            </div>
            <div>
              <Label htmlFor="productStock">Stock</Label>
              <Input id="productStock" type="number" placeholder="Enter stock" />
            </div>
          </div>
          <Button onClick={handleCreateProduct}>Add New Product</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleUpdateProduct(product.id)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const App: React.FC = () => (
  <trpc.Provider client={trpc.createClient({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <SellerDashboard />
    </QueryClientProvider>
  </trpc.Provider>
);

export default App;
