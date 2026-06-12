// AUTO-GENERATED DRAFT SCREEN: DeveloperConsole
import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Copy,
  Key,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Terminal
} from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function DeveloperConsole() {
  const [activeTab, setActiveTab] = useState('api-keys');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // tRPC hooks for fetching data
  const { data: apiKeys, isLoading: isLoadingKeys, error: keysError, refetch: refetchKeys } = trpc.developer.getApiKeys.useQuery();
  const { data: webhooks, isLoading: isLoadingWebhooks, error: webhooksError } = trpc.developer.getWebhooks.useQuery();
  const { data: systemStatus, isLoading: isLoadingStatus } = trpc.system.getStatus.useQuery(undefined, {
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // tRPC mutations
  const generateKeyMutation = trpc.developer.generateApiKey.useMutation({
    onSuccess: () => refetchKeys(),
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateKey = () => {
    generateKeyMutation.mutate({ name: `New Key ${new Date().toLocaleDateString()}` });
  };

  if (keysError || webhooksError) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 dark bg-zinc-950 min-h-screen text-zinc-50">
        <Alert variant="destructive" className="bg-red-950/50 border-red-900 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Developer Data</AlertTitle>
          <AlertDescription>
            {keysError?.message || webhooksError?.message || 'An unexpected error occurred while fetching developer settings.'}
            <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 dark bg-zinc-950 min-h-screen text-zinc-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <Terminal className="h-8 w-8 text-indigo-500" />
            Developer Console
          </h1>
          <p className="text-zinc-400 mt-1">Manage your API keys, webhooks, and monitor system status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={systemStatus?.status === 'operational' ? 'default' : 'destructive'} className="px-3 py-1 text-sm">
            {isLoadingStatus ? (
              <RefreshCw className="h-3 w-3 animate-spin mr-2" />
            ) : systemStatus?.status === 'operational' ? (
              <CheckCircle2 className="h-3 w-3 mr-2 text-green-400" />
            ) : (
              <AlertCircle className="h-3 w-3 mr-2" />
            )}
            {isLoadingStatus ? 'Checking Status...' : systemStatus?.status === 'operational' ? 'All Systems Operational' : 'System Degraded'}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-zinc-900">
          <TabsTrigger value="api-keys" className="data-[state=active]:bg-zinc-800">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks" className="data-[state=active]:bg-zinc-800">Webhooks</TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-zinc-800">API Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="mt-6 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
                  <Key className="h-5 w-5 text-indigo-400" />
                  API Credentials
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Use these keys to authenticate your application with the SKYCOIN4444 API.
                </CardDescription>
              </div>
              <Button
                onClick={handleGenerateKey}
                disabled={generateKeyMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {generateKeyMutation.isPending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
                Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingKeys ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-24 w-full bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : apiKeys?.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-lg">
                  <Key className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-300">No API Keys Found</h3>
                  <p className="text-zinc-500 mt-1">Generate your first API key to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiKeys?.map((key: any) => (
                    <div key={key.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-950/50 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-zinc-200">{key.name}</span>
                          {key.isTest && <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400">Test</Badge>}
                        </div>
                        <div className="text-xs text-zinc-500">
                          Created on {new Date(key.createdAt).toLocaleDateString()} • Last used {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                          <Input
                            readOnly
                            value={key.maskedKey}
                            className="font-mono text-sm bg-zinc-900 border-zinc-700 text-zinc-300 pr-10"
                            aria-label="API Key"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1 h-7 w-7 text-zinc-400 hover:text-zinc-100"
                            onClick={() => handleCopy(key.fullKey || '', key.id)}
                            title="Copy API Key"
                          >
                            {copiedKey === key.id ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <Button variant="outline" size="icon" className="border-zinc-700 hover:bg-zinc-800 text-zinc-400">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-6 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
                <Server className="h-5 w-5 text-emerald-400" />
                Webhook Endpoints
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Configure endpoints to receive real-time events from the SKYCOIN4444 network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingWebhooks ? (
                <Skeleton className="h-32 w-full bg-zinc-800 rounded-lg" />
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-lg">
                  <Server className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-300">No Webhooks Configured</h3>
                  <p className="text-zinc-500 mt-1 mb-4">Set up webhooks to listen for transaction events.</p>
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Add Endpoint
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-6 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Recent API Activity
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Monitor your API usage and troubleshoot integration issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded bg-zinc-950/50 border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-950/30 text-green-400 border-green-900">200 OK</Badge>
                    <span className="font-mono text-sm text-zinc-300">POST /v1/transactions/transfer</span>
                  </div>
                  <span className="text-xs text-zinc-500">Just now</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-zinc-950/50 border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-950/30 text-green-400 border-green-900">200 OK</Badge>
                    <span className="font-mono text-sm text-zinc-300">GET /v1/wallet/balance</span>
                  </div>
                  <span className="text-xs text-zinc-500">2 mins ago</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-zinc-950/50 border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-red-950/30 text-red-400 border-red-900">401 ERR</Badge>
                    <span className="font-mono text-sm text-zinc-300">GET /v1/wallet/history</span>
                  </div>
                  <span className="text-xs text-zinc-500">15 mins ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
