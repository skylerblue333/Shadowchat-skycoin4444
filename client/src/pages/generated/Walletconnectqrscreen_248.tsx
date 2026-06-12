// AUTO-GENERATED DRAFT SCREEN: WalletConnectQRScreen
import React, { useState, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, RefreshCw, AlertCircle, Shield, Smartphone, ArrowLeft, Scan, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/utils/trpc';

interface WalletConnectQRScreenProps {
  onBack?: () => void;
  onConnect?: (sessionData: any) => void;
  className?: string;
}

export const WalletConnectQRScreen: React.FC<WalletConnectQRScreenProps> = ({
  onBack,
  onConnect,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const { 
    data: sessionData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = trpc.wallet.createSession.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { mutate: checkStatus } = trpc.wallet.checkSessionStatus.useMutation({
    onSuccess: (data) => {
      if (data.status === 'connected' && onConnect) {
        onConnect(data);
      }
    },
  });

  useEffect(() => {
    if (!sessionData?.uri) return;
    const interval = setInterval(() => {
      checkStatus({ sessionId: sessionData.sessionId });
    }, 3000);
    return () => clearInterval(interval);
  }, [sessionData, checkStatus]);

  useEffect(() => {
    if (isLoading || isError) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLoading, isError, sessionData]);

  const handleCopyUri = useCallback(async () => {
    if (!sessionData?.uri) return;
    try {
      await navigator.clipboard.writeText(sessionData.uri);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URI:', err);
    }
  }, [sessionData?.uri]);

  const handleRefresh = useCallback(() => {
    setTimeLeft(300);
    refetch();
  }, [refetch]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] p-4 ${className}`}>
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 py-8">
            <Skeleton className="h-64 w-64 rounded-xl" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || timeLeft === 0) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] p-4 ${className}`}>
        <Card className="w-full max-w-md border-destructive/50 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="mr-2 h-5 w-5" />
              Connection Failed
            </CardTitle>
            <CardDescription>
              {timeLeft === 0 
                ? 'The QR code has expired. Please generate a new one.' 
                : error?.message || 'Failed to generate connection URI. Please try again.'}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button onClick={handleRefresh} className="w-full ml-2">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-[400px] p-4 ${className}`}>
      <Card className="w-full max-w-md border-border/50 bg-card shadow-lg dark:shadow-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold tracking-tight">Connect Wallet</CardTitle>
            <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="font-mono">
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground">
            Scan this QR code with your WalletConnect-compatible wallet to connect.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          <div className="relative p-4 bg-white rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            {sessionData?.uri ? (
              <QRCodeSVG
                value={sessionData.uri}
                size={260}
                level="H"
                includeMargin={false}
                className="rounded-lg"
                imageSettings={{
                  src: "/walletconnect-logo.svg",
                  x: undefined,
                  y: undefined,
                  height: 48,
                  width: 48,
                  excavate: true,
                }}
              />
            ) : (
              <div className="w-[260px] h-[260px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {timeLeft === 0 && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <Button onClick={handleRefresh} variant="secondary">
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh QR
                </Button>
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-sm font-medium px-1">
              <span className="text-muted-foreground">Or copy to clipboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted/50 border border-border rounded-md px-3 py-2 text-sm font-mono truncate text-muted-foreground">
                {sessionData?.uri || 'Generating URI...'}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleCopyUri}
                disabled={!sessionData?.uri}
                className="shrink-0"
                aria-label="Copy URI"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Alert className="bg-primary/5 border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-semibold text-primary">Secure Connection</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground mt-1">
              This connection is end-to-end encrypted. Never share your seed phrase or private keys with anyone.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground w-full">
            <div className="flex items-center">
              <Smartphone className="mr-1.5 h-4 w-4" />
              <span>Open App</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center">
              <Scan className="mr-1.5 h-4 w-4" />
              <span>Scan QR</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center">
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              <span>Confirm</span>
            </div>
          </div>
          
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="w-full text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Wallets
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletConnectQRScreen;
