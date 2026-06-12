// AUTO-GENERATED DRAFT SCREEN: CryptoWithdrawalScreen
import React, { useState } from 'react';
import { useWithdrawal } from './trpc/hooks'; // Assuming tRPC hooks are in this path
import { Button } from './components/ui/button'; // shadcn/ui button
import { Input } from './components/ui/input'; // shadcn/ui input
import { Label } from './components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Switch } from './components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog';
import { toast } from 'react-hot-toast'; // Assuming react-hot-toast for notifications

interface CryptoWithdrawalScreenProps {
  userId: string;
}

const CryptoWithdrawalScreen: React.FC<CryptoWithdrawalScreenProps> = ({ userId }) => {
  const [amount, setAmount] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [inputErrors, setInputErrors] = useState<{ amount?: string; address?: string }>({});

  const { mutate: withdraw, isLoading, error } = useWithdrawal();

  const validateInputs = () => {
    const errors: { amount?: string; address?: string } = {};
    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      errors.amount = 'Please enter a valid positive amount.';
    }
    if (!address || address.trim().length < 10) { // Basic address validation
      errors.address = 'Please enter a valid withdrawal address.';
    }
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInitiateWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmWithdrawal = () => {
    setIsConfirmationOpen(false);
    withdraw({ userId, amount: parseFloat(amount), address }, {
      onSuccess: () => {
        toast.success('Withdrawal initiated successfully!');
        setAmount('');
        setAddress('');
      },
      onError: (err) => {
        toast.error(`Withdrawal failed: ${err.message}`);
      },
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md p-6 space-y-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Crypto Withdrawal</CardTitle>
          <CardDescription className="text-center">Securely withdraw your cryptocurrency.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInitiateWithdrawal} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 0.05 BTC"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                aria-invalid={!!inputErrors.amount}
                aria-describedby="amount-error"
              />
              {inputErrors.amount && <p id="amount-error" className="text-red-500 text-sm">{inputErrors.amount}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Withdrawal Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                aria-invalid={!!inputErrors.address}
                aria-describedby="address-error"
              />
              {inputErrors.address && <p id="address-error" className="text-red-500 text-sm">{inputErrors.address}</p>}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Preparing...' : 'Initiate Withdrawal'}
            </Button>
            {error && <p className="text-red-500 text-sm text-center">Error: {error.message}</p>}
          </form>
        </CardContent>
      </Card>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Withdrawal</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw <span className="font-bold">{amount}</span> to address <span className="font-bold break-all">{address}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmWithdrawal} disabled={isLoading}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CryptoWithdrawalScreen;
