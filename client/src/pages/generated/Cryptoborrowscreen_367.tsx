// AUTO-GENERATED DRAFT SCREEN: CryptoBorrowScreen
import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, AlertCircle, Info, ArrowRight, Wallet, ShieldCheck } from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const borrowSchema = z.object({
  collateralAsset: z.string().min(1, 'Please select a collateral asset'),
  borrowAsset: z.string().min(1, 'Please select an asset to borrow'),
  borrowAmount: z.number().positive('Amount must be greater than 0'),
});
type BorrowFormValues = z.infer<typeof borrowSchema>;

export default function CryptoBorrowScreen() {
  const [ltv, setLtv] = useState<number>(50);
  const { data: assets, isLoading: isLoadingAssets, error: assetsError } = trpc.crypto.getAssets.useQuery();
  const { data: userStats, isLoading: isLoadingStats } = trpc.crypto.getUserStats.useQuery();
  const borrowMutation = trpc.crypto.borrow.useMutation();

  const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BorrowFormValues>({
    resolver: zodResolver(borrowSchema),
    defaultValues: { collateralAsset: '', borrowAsset: 'USDC', borrowAmount: 0 },
  });

  const collateralAsset = watch('collateralAsset');
  const borrowAmount = watch('borrowAmount');

  const selectedCollateral = useMemo(() => assets?.find(a => a.symbol === collateralAsset), [assets, collateralAsset]);

  const requiredCollateral = useMemo(() => {
    if (!borrowAmount || !selectedCollateral || !ltv) return 0;
    return (borrowAmount / (ltv / 100)) / selectedCollateral.price;
  }, [borrowAmount, selectedCollateral, ltv]);

  const onSubmit = async (data: BorrowFormValues) => {
    try {
      await borrowMutation.mutateAsync({ ...data, ltv, requiredCollateral });
    } catch (error) {
      console.error('Borrow failed:', error);
    }
  };

  if (isLoadingAssets || isLoadingStats) return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading SKYCOIN4444 Markets...</p>
    </div>
  );

  if (assetsError) return (
    <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription>Failed to connect to SKYCOIN4444 network. Please try again later.</AlertDescription>
    </Alert>
  );

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">SKYCOIN4444 Protocol</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Borrow Assets</h1>
          <p className="text-muted-foreground mt-1">Use your crypto as collateral to borrow stablecoins instantly.</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-sm w-fit">
          <Wallet className="mr-2 h-4 w-4" />
          Health Factor: {userStats?.healthFactor?.toFixed(2) || 'N/A'}
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle>Loan Configuration</CardTitle>
              <CardDescription>Set up your collateral and borrowing parameters.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="borrow-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="collateralAsset">Collateral Asset</Label>
                      <Controller
                        name="collateralAsset"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="collateralAsset" className={errors.collateralAsset ? 'border-destructive focus:ring-destructive' : ''}>
                              <SelectValue placeholder="Select asset" />
                            </SelectTrigger>
                            <SelectContent>
                              {assets?.filter(a => a.canBeCollateral).map((asset) => (
                                <SelectItem key={asset.symbol} value={asset.symbol}>{asset.name} ({asset.symbol})</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.collateralAsset && <p className="text-xs text-destructive font-medium">{errors.collateralAsset.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="borrowAsset">Borrow Asset</Label>
                      <Controller
                        name="borrowAsset"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="borrowAsset" className={errors.borrowAsset ? 'border-destructive focus:ring-destructive' : ''}>
                              <SelectValue placeholder="Select asset" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USDC">USDC</SelectItem>
                              <SelectItem value="USDT">USDT</SelectItem>
                              <SelectItem value="DAI">DAI</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.borrowAsset && <p className="text-xs text-destructive font-medium">{errors.borrowAsset.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <Label htmlFor="borrowAmount">Borrow Amount</Label>
                      <span className="text-xs text-muted-foreground">Max Capacity: ${userStats?.maxBorrowCapacity?.toLocaleString() || '0'}</span>
                    </div>
                    <Controller
                      name="borrowAmount"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">$</span>
                          <Input
                            id="borrowAmount" type="number" placeholder="0.00"
                            className={`pl-7 font-mono ${errors.borrowAmount ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} value={field.value || ''}
                          />
                        </div>
                      )}
                    />
                    {errors.borrowAmount && <p className="text-xs text-destructive font-medium">{errors.borrowAmount.message}</p>}
                  </div>

                  <div className="space-y-4 pt-5 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <Label>Loan to Value (LTV)</Label>
                      <Badge variant={ltv > 75 ? "destructive" : ltv > 50 ? "secondary" : "outline"} className="font-mono">{ltv}%</Badge>
                    </div>
                    <Slider
                      value={[ltv]} onValueChange={(vals) => setLtv(vals[0])}
                      max={selectedCollateral?.maxLtv || 80} min={10} step={1} className="py-4" disabled={!selectedCollateral}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                      <span className="text-green-500/80">Safer</span>
                      <span className="text-destructive/80">Riskier</span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader><CardTitle className="text-lg">Transaction Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Required Collateral</span>
                <span className="font-mono font-medium">{requiredCollateral > 0 ? `${requiredCollateral.toFixed(4)} ${collateralAsset}` : '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Interest Rate (APY)</span>
                <span className="font-mono font-medium text-green-500">4.50%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Liquidation Price</span>
                <span className="font-mono font-medium">{selectedCollateral && borrowAmount > 0 ? `$${((borrowAmount / requiredCollateral) * 1.15).toFixed(2)}` : '-'}</span>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Post-Borrow Health</span>
                  <span className={`font-mono font-medium ${ltv > 70 ? 'text-destructive' : 'text-green-500'}`}>
                    {selectedCollateral ? (100 / ltv).toFixed(2) : '-'}
                  </span>
                </div>
                <Progress value={ltv} className="h-2 bg-secondary" indicatorColor={ltv > 75 ? 'bg-destructive' : ltv > 50 ? 'bg-yellow-500' : 'bg-green-500'} />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              {borrowMutation.isError && (
                <Alert variant="destructive" className="w-full py-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs ml-2">{borrowMutation.error.message}</AlertDescription>
                </Alert>
              )}
              {borrowMutation.isSuccess && (
                <Alert className="w-full py-3 bg-green-500/10 text-green-500 border-green-500/20">
                  <ShieldCheck className="h-4 w-4" />
                  <AlertDescription className="text-xs ml-2">Loan executed successfully!</AlertDescription>
                </Alert>
              )}
              <Button type="submit" form="borrow-form" className="w-full font-semibold" size="lg" disabled={isSubmitting || !borrowAmount || !collateralAsset || borrowMutation.isPending}>
                {borrowMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <>Confirm Borrow <ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>
            </CardFooter>
          </Card>

          <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-sm">
            <Info className="h-4 w-4" />
            <AlertTitle className="text-sm font-semibold">Risk Management</AlertTitle>
            <AlertDescription className="text-xs mt-1 leading-relaxed">
              Keep your LTV below 50% to minimize the risk of liquidation during sudden market volatility on the SKYCOIN4444 network.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}