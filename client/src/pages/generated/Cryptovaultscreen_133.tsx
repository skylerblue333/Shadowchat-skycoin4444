// AUTO-GENERATED DRAFT SCREEN: CryptoVaultScreen
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, Wallet, Lock, Search, ChevronRight, ChevronLeft } from 'lucide-react';

// Placeholder for tRPC hooks - replace with actual tRPC client setup
// import { trpc } from '@/utils/trpc';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  balance_usd: number;
  apy: number;
  value_percentage: number;
}

interface Activity {
  id: string;
  type: 'deposit' | 'withdraw' | 'earnings';
  asset: string;
  amount: number;
  symbol: string;
  time_ago: string;
}

const mockAssets: Asset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: 0.546312, balance_usd: 56721.68, apy: 2.45, value_percentage: 45.60 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', balance: 4.2301, balance_usd: 13842.11, apy: 3.65, value_percentage: 11.12 },
  { id: '3', name: 'Solana', symbol: 'SOL', balance: 25.00, balance_usd: 9528.75, apy: 6.75, value_percentage: 7.66 },
  { id: '4', name: 'USD Coin', symbol: 'USDC', balance: 12500.00, balance_usd: 12500.00, apy: 4.10, value_percentage: 10.04 },
  { id: '5', name: 'Arbitrum', symbol: 'ARB', balance: 3210.00, balance_usd: 7968.24, apy: 5.20, value_percentage: 6.41 },
  { id: '6', name: 'Chainlink', symbol: 'LINK', balance: 150.00, balance_usd: 6000.00, apy: 4.35, value_percentage: 4.81 },
];

const mockActivity: Activity[] = [
  { id: 'a1', type: 'deposit', asset: 'Bitcoin', amount: 0.152, symbol: 'BTC', time_ago: '2h ago' },
  { id: 'a2', type: 'earnings', asset: 'Vault Yield', amount: 12.45, symbol: 'USDC', time_ago: '5h ago' },
  { id: 'a3', type: 'withdraw', asset: 'Ethereum', amount: 1.00, symbol: 'ETH', time_ago: '1d ago' },
];

const CryptoVaultScreen: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      setAssets(mockAssets);
      setActivity(mockActivity);
    } catch (err) {
      setError('Failed to fetch vault data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading vault data...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

  const totalVaultValue = assets.reduce((sum, asset) => sum + asset.balance_usd, 0);
  const totalEarnings = 8742.19;
  const currentAPY = 4.92;

  const formatCurrency = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 dark:bg-gray-900 dark:text-gray-50">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Crypto: Vault</h2>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Vault Value</CardTitle><Wallet className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">${formatCurrency(totalVaultValue)}</div><p className="text-xs text-muted-foreground">+4.37% (24h)</p></CardContent></Card>
        <Card><CardHeader className="flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Earnings (All Time)</CardTitle><ArrowUpRight className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">${formatCurrency(totalEarnings)}</div><p className="text-xs text-muted-foreground">+12.18%</p></CardContent></Card>
        <Card><CardHeader className="flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Current APY</CardTitle><Lock className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{currentAPY}%</div><p className="text-xs text-muted-foreground">+0.28%</p></CardContent></Card>
        <Card><CardHeader className="flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Assets in Vault</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{assets.length}</div><p className="text-xs text-muted-foreground">View all assets &gt;</p></CardContent></Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Vault Assets</CardTitle>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search assets..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Balance</TableHead><TableHead>APY</TableHead><TableHead>Value</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium flex items-center">{asset.name}<span className="text-muted-foreground ml-2">{asset.symbol}</span></TableCell>
                    <TableCell>{asset.balance.toLocaleString()} {asset.symbol}<div className="text-muted-foreground text-xs">${formatCurrency(asset.balance_usd)}</div></TableCell>
                    <TableCell className="text-green-500">{asset.apy}%</TableCell>
                    <TableCell>${formatCurrency(asset.balance_usd)}<div className="text-muted-foreground text-xs">{asset.value_percentage}%</div></TableCell>
                    <TableCell className="text-right"><Button variant="secondary" size="sm" className="mr-2">Deposit</Button><Button variant="outline" size="sm">Withdraw</Button><Button variant="ghost" size="sm"><ChevronRight className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4"><Button variant="outline" size="sm"><ChevronLeft className="h-4 w-4" /></Button><Button variant="outline" size="sm">1</Button><Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button></div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader><CardTitle>Deposit Assets</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Select><SelectTrigger><SelectValue placeholder="Select asset" /></SelectTrigger><SelectContent>{assets.map(asset => (<SelectItem key={asset.id} value={asset.id}>{asset.name} ({asset.symbol})</SelectItem>))}</SelectContent></Select>
              <div><Input type="number" placeholder="Amount" /><p className="text-xs text-muted-foreground mt-1">Available: --</p></div>
              <Button className="w-full">Deposit to Vault</Button>
              <p className="text-xs text-muted-foreground flex items-center justify-center"><Lock className="h-3 w-3 mr-1" /> Your assets are secured with bank-grade encryption.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle><Button variant="link" className="p-0 h-auto">View all activity</Button></CardHeader>
            <CardContent className="space-y-4">
              {activity.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {item.type === 'deposit' && <ArrowDownLeft className="h-4 w-4 text-green-500 mr-2" />}
                    {item.type === 'withdraw' && <ArrowUpRight className="h-4 w-4 text-red-500 mr-2" />}
                    {item.type === 'earnings' && <Wallet className="h-4 w-4 text-blue-500 mr-2" />}
                    <div><p className="font-medium capitalize">{item.type}</p><p className="text-sm text-muted-foreground">{item.asset}</p></div>
                  </div>
                  <div className="text-right">
                    <p className={`${item.type === 'deposit' || item.type === 'earnings' ? 'text-green-500' : 'text-red-500'} font-medium`}>{item.type === 'deposit' || item.type === 'earnings' ? '+' : '-'}{item.amount.toLocaleString()} {item.symbol}</p>
                    <p className="text-sm text-muted-foreground">{item.time_ago}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CryptoVaultScreen;
