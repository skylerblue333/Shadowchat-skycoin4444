// AUTO-GENERATED DRAFT SCREEN: CheckoutFlow
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from './trpc';

const CheckoutFlow: React.FC = () => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const checkoutMutation = trpc.checkout.useMutation({
    onSuccess: (data) => {
      alert(data.message);
      // Clear form or redirect
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkoutMutation.mutate({
      email,
      cardNumber,
      expiry,
      cvc,
      nameOnCard,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Checkout</CardTitle>
          <CardDescription className="text-center">Complete your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                type="text"
                id="card-number"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  type="text"
                  id="cvc"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input
                type="text"
                id="name-on-card"
                placeholder="Full Name"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={checkoutMutation.isLoading}>
              {checkoutMutation.isLoading ? 'Processing...' : 'Pay Now'}
            </Button>
            {checkoutMutation.isError && (
              <p className="text-red-500 text-center mt-2">{checkoutMutation.error?.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutFlow;