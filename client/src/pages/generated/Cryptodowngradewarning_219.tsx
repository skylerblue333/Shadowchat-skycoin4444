// AUTO-GENERATED DRAFT SCREEN: CryptoDowngradeWarning
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info, ArrowDownRight, ShieldAlert, Loader2, RefreshCw } from 'lucide-react';
// Assuming shadcn/ui components are available in these paths
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
// Assuming tRPC hook is available
import { trpc } from '@/utils/trpc';

interface DowngradeData {
  assetId: string;
  assetName: string;
  symbol: string;
  previousTier: string;
  newTier: string;
  reason: string;
  effectiveDate: string;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  actionRequired: boolean;
  marketCapImpact: number;
  liquidityScore: number;
}

export default function CryptoDowngradeWarning() {
  // Mock tRPC query for demonstration purposes
  // In a real app, this would be: const { data, isLoading, isError, error, refetch } = trpc.crypto.getDowngradeAlert.useQuery({ assetId: 'SKYCOIN4444' });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<DowngradeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setData({
          assetId: 'SKYCOIN4444',
          assetName: 'SkyCoin',
          symbol: 'SKY',
          previousTier: 'Tier 1 (Premium)',
          newTier: 'Tier 3 (High Risk)',
          reason: 'Significant security vulnerability discovered in smart contract protocol leading to potential exploit risks.',
          effectiveDate: new Date().toISOString(),
          impactLevel: 'critical',
          actionRequired: true,
          marketCapImpact: -42.5,
          liquidityScore: 25,
        });
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAcknowledge = () => {
    // Handle acknowledgment logic here
    console.log('Downgrade acknowledged');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Fetching latest security advisory...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error Loading Advisory</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-4">
            <p>We couldn't retrieve the latest security information for this asset. Please try again later.</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="w-fit">
              <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8">
      <Card className="border-destructive/50 shadow-lg dark:bg-slate-950">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-destructive/10 p-3">
                <ShieldAlert className="h-8 w-8 text-destructive" aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-destructive flex items-center gap-2">
                  Critical Downgrade Warning
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  Immediate attention required for {data.assetName} ({data.symbol})
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className={getImpactColor(data.impactLevel)}>
              {data.impactLevel.toUpperCase()} IMPACT
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="font-semibold">Security Advisory</AlertTitle>
            <AlertDescription className="mt-2 text-sm leading-relaxed">
              {data.reason}
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                Tier Reclassification
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold line-through text-muted-foreground">{data.previousTier}</span>
                <span className="text-lg font-bold text-destructive">{data.newTier}</span>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Info className="h-4 w-4" />
                Market Impact
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Liquidity Score</span>
                  <span className="font-medium text-destructive">{data.liquidityScore}/100</span>
                </div>
                <Progress value={data.liquidityScore} className="h-2 bg-secondary" indicatorClassName="bg-destructive" />
              </div>
            </div>
          </div>

          {data.actionRequired && (
            <div className="rounded-lg bg-muted p-4 border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Required Actions
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Review your current holdings of {data.symbol}.</li>
                <li>Consider transferring assets to a secure cold wallet.</li>
                <li>Monitor official channels for further updates.</li>
                <li>Trading for this asset may be suspended shortly.</li>
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t bg-muted/50">
          <Button 
            variant="destructive" 
            className="w-full sm:w-auto"
            onClick={handleAcknowledge}
          >
            Acknowledge Risk
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.open('https://support.example.com/security-advisories', '_blank')}
          >
            Read Full Advisory
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
