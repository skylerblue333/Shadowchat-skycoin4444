// AUTO-GENERATED DRAFT SCREEN: ShoppingCart
import React, { useReducer, createContext, useContext, ReactNode, useEffect } from 'react';
import { CartItem, CartState, UseCartResult } from './types';

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";

// --- State Management ---
type Action = 
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
          total: state.total - (itemToRemove.price * itemToRemove.quantity),
        };
      }
      return state;
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        const oldPrice = itemToUpdate.price * itemToUpdate.quantity;
        const newPrice = itemToUpdate.price * quantity;
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
          total: state.total - oldPrice + newPrice,
        };
      }
      return state;
    }
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const initialCartState: CartState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

const CartContext = createContext<UseCartResult | undefined>(undefined);

// Simulated tRPC hook for cart management
const useCart = (): UseCartResult => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const checkout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (state.items.length === 0) {
        throw new Error('Your cart is empty. Add items before checking out.');
      }
      console.log('Checking out with items:', state.items);
      clearCart();
      alert('Checkout successful!');
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Checkout failed.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { cart: state, addItem, removeItem, updateQuantity, clearCart, checkout };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartResult = useCart();
  return (
    <CartContext.Provider value={cartResult}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};


export const ShoppingCart = () => {
  const { cart, removeItem, updateQuantity, clearCart, checkout } = useCartContext();
  const { items, total, isLoading, error } = cart;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center">Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <Alert className="mb-4">
              <AlertTitle>Loading...</AlertTitle>
              <AlertDescription>Processing your request.</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {items.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">Your cart is empty.</p>
          ) : (
            <>
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-20 text-center"
                          min="1"
                          aria-label={`Quantity for ${item.name}`}
                        />
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          onClick={() => removeItem(item.id)}
                          className="text-sm"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end items-center space-x-4 mb-6">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Total:</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${total.toFixed(2)}</p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={clearCart} disabled={isLoading}>
                  Clear Cart
                </Button>
                <Button onClick={checkout} disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Example of adding items (for demonstration) */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Example Items</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => addItem({ id: '1', name: 'Laptop', price: 1200, image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Laptop' })} disabled={isLoading}>
            Add Laptop
          </Button>
          <Button onClick={() => addItem({ id: '2', name: 'Mouse', price: 25, image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Mouse' })} disabled={isLoading}>
            Add Mouse
          </Button>
          <Button onClick={() => addItem({ id: '3', name: 'Keyboard', price: 75, image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Keyboard' })} disabled={isLoading}>
            Add Keyboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
