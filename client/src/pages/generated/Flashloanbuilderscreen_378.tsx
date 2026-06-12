// AUTO-GENERATED DRAFT SCREEN: FlashLoanBuilderScreen
import React, { useState, useCallback } from 'react';
import { trpc } from '@/utils/trpc';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Plus, Trash2, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type OperationType = 'SWAP' | 'ARBITRAGE' | 'LIQUIDATE';

interface Operation {
  id: string;
  type: OperationType;
  targetProtocol: string;
  amount: string;
}

export default function FlashLoanBuilderScreen() {
  const [asset, setAsset] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [operations, setOperations] = useState<Operation[]>([]);
  
  const { data: assets, isLoading: isLoadingAssets } = trpc.crypto.getSupportedAssets.useQuery();
  const { data: protocols, isLoading: isLoadingProtocols } = trpc.crypto.getProtocols.useQuery();
  const executeFlashLoan = trpc.crypto.executeFlashLoan.useMutation();

  const handleAddOperation = useCallback(() => {
    const newOp: Operation = {
      id: crypto.randomUUID(),
      type: 'SWAP',
      targetProtocol: '',
      amount: '',
    };
    setOperations((prev) => [...prev, newOp]);
  }, []);

  const handleRemoveOperation = useCallback((id: string) => {
    setOperations((prev) => prev.filter((op) => op.id !== id));
  }, []);

  const handleUpdateOperation = useCallback((id: string, field: keyof Operation, value: string) => {
    setOperations((prev) => prev.map((op) => 
      op.id === id ? { ...op, [field]: value } : op
    ));
  }, []);

  const handleExecute = async () => {
    if (!asset || !amount || operations.length === 0) return;
    try {
      await executeFlashLoan.mutateAsync({
        asset,
        amount,
        operations: operations.map(({ type, targetProtocol, amount }) => ({
          type,
          targetProtocol,
          amount
        }))
      });
    } catch (error) {
      console.error('Flash loan execution failed:', error);
    }
  };

  const isFormValid = asset && amount && operations.length > 0 && operations.every(op => op.targetProtocol && op.amount);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Zap className="h-8 w-8 text-yellow-500" aria-hidden="true" />
              Flash Loan Builder
            </h1>
            <p className="text-zinc-400 mt-1">Construct and execute multi-step flash loan transactions.</p>
          </div>
        </div>

        {executeFlashLoan.error && (
          <Alert variant="destructive" className="bg-red-950/50 border-red-900 text-red-200">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Execution Failed</AlertTitle>
            <AlertDescription>
              {executeFlashLoan.error.message || 'An unexpected error occurred during execution.'}
            </AlertDescription>
          </Alert>
        )}

        {executeFlashLoan.isSuccess && (
          <Alert className="bg-green-950/50 border-green-900 text-green-200">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Flash loan executed successfully. Transaction hash: {executeFlashLoan.data?.txHash}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Loan Configuration</CardTitle>
              <CardDescription className="text-zinc-400">Select asset and amount to borrow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="asset">Asset</Label>
                <Select value={asset} onValueChange={setAsset} disabled={isLoadingAssets}>
                  <SelectTrigger id="asset" className="bg-zinc-950 border-zinc-800">
                    <SelectValue placeholder={isLoadingAssets ? "Loading..." : "Select asset"} />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {assets?.map((a) => (
                      <SelectItem key={a.symbol} value={a.symbol}>{a.name} ({a.symbol})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-zinc-950 border-zinc-800"
                  aria-label="Loan amount"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Execution Steps</CardTitle>
                <CardDescription className="text-zinc-400">Define the sequence of operations.</CardDescription>
              </div>
              <Button onClick={handleAddOperation} variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 text-zinc-100">
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Add Step
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {operations.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-lg">
                  No operations added. Click "Add Step" to begin.
                </div>
              ) : (
                <div className="space-y-4">
                  {operations.map((op, index) => (
                    <div key={op.id} className="flex items-start gap-4 p-4 bg-zinc-950 rounded-lg border border-zinc-800 relative group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-medium text-sm text-zinc-200">
                        {index + 1}
                      </div>
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs text-zinc-400">Action</Label>
                          <Select value={op.type} onValueChange={(val) => handleUpdateOperation(op.id, 'type', val)}>
                            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-700">
                              <SelectItem value="SWAP">Swap</SelectItem>
                              <SelectItem value="ARBITRAGE">Arbitrage</SelectItem>
                              <SelectItem value="LIQUIDATE">Liquidate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-zinc-400">Protocol</Label>
                          <Select value={op.targetProtocol} onValueChange={(val) => handleUpdateOperation(op.id, 'targetProtocol', val)} disabled={isLoadingProtocols}>
                            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-700">
                              {protocols?.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-zinc-400">Amount/Ratio</Label>
                          <Input 
                            placeholder="e.g. 100%" 
                            value={op.amount}
                            onChange={(e) => handleUpdateOperation(op.id, 'amount', e.target.value)}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            aria-label={`Amount for step ${index + 1}`}
                          />
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveOperation(op.id)}
                        className="text-zinc-500 hover:text-red-400 hover:bg-red-950/30 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 md:relative md:top-0 md:right-0"
                        aria-label={`Remove step ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-zinc-800 pt-6 flex justify-between items-center">
              <div className="text-sm text-zinc-400">
                Estimated Gas: <span className="text-zinc-200 font-mono">~0.045 ETH</span>
              </div>
              <Button 
                onClick={handleExecute} 
                disabled={!isFormValid || executeFlashLoan.isPending}
                className={cn(
                  "bg-yellow-500 text-yellow-950 hover:bg-yellow-400 font-semibold",
                  executeFlashLoan.isPending && "opacity-70 cursor-not-allowed"
                )}
              >
                {executeFlashLoan.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                    Execute Flash Loan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}