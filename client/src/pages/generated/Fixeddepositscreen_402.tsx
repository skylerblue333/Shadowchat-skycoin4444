// AUTO-GENERATED DRAFT SCREEN: FixedDepositScreen
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sun, Moon } from "lucide-react"; // Assuming lucide-react is installed
import { trpc } from "@/lib/api";

interface FixedDepositData {
  id: string;
  asset: string;
  amount: number;
  apy: number;
  maturityDate: string;
  status: 'active' | 'matured' | 'pending';
}

interface FixedDepositScreenProps {}

const FixedDepositScreen: React.FC<FixedDepositScreenProps> = () => {
  const { data, isLoading, isError, refetch } = trpc.fixedDeposit.getData.useQuery();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [fixedDeposits, setFixedDeposits] = useState<FixedDepositData[]>([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (data) {
      // Simulate parsing data from tRPC response
      const parsedData: FixedDepositData[] = [
        { id: 'fd-001', asset: 'USDT', amount: 1000, apy: 5.00, maturityDate: '2027-01-01', status: 'active' },
        { id: 'fd-002', asset: 'BTC', amount: 0.5, apy: 3.50, maturityDate: '2026-12-15', status: 'pending' },
        { id: 'fd-003', asset: 'ETH', amount: 2, apy: 4.20, maturityDate: '2026-11-20', status: 'matured' },
      ];
      setFixedDeposits(parsedData);
    }
  }, [data]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleDeposit = () => {
    if (parseFloat(depositAmount) > 0) {
      // Simulate a new deposit
      const newDeposit: FixedDepositData = {
        id: `fd-${Date.now()}`,
        asset: 'USDC',
        amount: parseFloat(depositAmount),
        apy: 4.75,
        maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
      };
      setFixedDeposits([...fixedDeposits, newDeposit]);
      setDepositAmount('');
      // In a real app, this would trigger a tRPC mutation
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-center space-y-8">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <Switch
          id="dark-mode-toggle"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          aria-label="Toggle dark mode"
        />
        <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
      </div>

      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Crypto: Fixed Deposit</CardTitle>
          <CardDescription>Secure your crypto assets for a fixed period and earn attractive yields.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-lg">Loading fixed deposit overview...</p>
            </div>
          )}
          {isError && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load fixed deposit data. Please check your connection or try again later.</AlertDescription>
              <Button onClick={() => refetch()} className="mt-2">Retry</Button>
            </Alert>
          )}
          {data && (
            <div className="space-y-4">
              <p className="text-lg font-medium">Current Overview: {data}</p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="number"
                  placeholder="Enter deposit amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-grow"
                  aria-label="Deposit amount input"
                />
                <Button onClick={handleDeposit} className="w-full sm:w-auto" aria-label="Make a new deposit">Make Deposit</Button>
              </div>

              <h2 className="text-2xl font-semibold mt-8">Your Fixed Deposits</h2>
              {fixedDeposits.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>APY</TableHead>
                      <TableHead>Maturity Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fixedDeposits.map((deposit) => (
                      <TableRow key={deposit.id}>
                        <TableCell className="font-medium">{deposit.id}</TableCell>
                        <TableCell>{deposit.asset}</TableCell>
                        <TableCell>{deposit.amount}</TableCell>
                        <TableCell>{deposit.apy}%</TableCell>
                        <TableCell>{deposit.maturityDate}</TableCell>
                        <TableCell>{deposit.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground">No fixed deposits found. Start by making a deposit!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FixedDepositScreen;
