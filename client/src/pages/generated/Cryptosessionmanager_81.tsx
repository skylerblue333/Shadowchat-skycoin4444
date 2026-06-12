// AUTO-GENERATED DRAFT SCREEN: CryptoSessionManager
import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Laptop, Smartphone, Globe, AlertCircle, ShieldAlert, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { formatDistanceToNow } from 'date-fns';

interface Session {
  id: string;
  device: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: Date;
  isCurrent: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

const getDeviceIcon = (device: Session['device']) => {
  switch (device) {
    case 'desktop': return <Laptop className="h-5 w-5 text-muted-foreground" aria-hidden="true" />;
    case 'mobile': return <Smartphone className="h-5 w-5 text-muted-foreground" aria-hidden="true" />;
    default: return <Globe className="h-5 w-5 text-muted-foreground" aria-hidden="true" />;
  }
};

const getRiskBadge = (risk: Session['riskLevel']) => {
  switch (risk) {
    case 'high': return <Badge variant="destructive" className="flex items-center gap-1"><ShieldAlert className="h-3 w-3" /> High Risk</Badge>;
    case 'medium': return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Suspicious</Badge>;
    default: return <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-900 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Safe</Badge>;
  }
};

export default function CryptoSessionManager() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);

  const { data: sessions, isLoading, isError, error, refetch } = trpc.security.getSessions.useQuery(undefined, {
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const revokeMutation = trpc.security.revokeSession.useMutation({
    onSuccess: () => { setIsRevokeDialogOpen(false); setSelectedSession(null); refetch(); },
  });

  const revokeAllMutation = trpc.security.revokeAllOtherSessions.useMutation({
    onSuccess: () => { refetch(); },
  });

  const handleRevokeClick = (sessionId: string) => { setSelectedSession(sessionId); setIsRevokeDialogOpen(true); };
  const handleConfirmRevoke = () => { if (selectedSession) revokeMutation.mutate({ sessionId: selectedSession }); };
  const handleRevokeAll = () => { revokeAllMutation.mutate(); };

  const renderSessionContent = useMemo(() => {
    if (isLoading) return (
      <div className="space-y-4" aria-busy="true" aria-label="Loading sessions">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" /><div className="space-y-2 flex-1"><Skeleton className="h-4 w-[250px]" /><Skeleton className="h-4 w-[200px]" /></div><Skeleton className="h-8 w-[100px]" />
          </div>
        ))}
      </div>
    );

    if (!sessions || sessions.length === 0) return (
      <div className="text-center py-8 text-muted-foreground">No active sessions found.</div>
    );

    return (
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Device</TableHead><TableHead>Location & IP</TableHead><TableHead>Last Active</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id} className={session.isCurrent ? 'bg-primary/5 dark:bg-primary/10' : ''}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">{getDeviceIcon(session.device)}</div>
                    <div>
                      <p className="font-medium text-sm">{session.os} • {session.browser}</p>
                      {session.isCurrent && (<Badge variant="default" className="mt-1 text-[10px] h-4 px-1.5">Current Device</Badge>)}
                    </div>
                  </div>
                </TableCell>
                <TableCell><p className="text-sm font-medium">{session.location}</p><p className="text-xs text-muted-foreground font-mono">{session.ipAddress}</p></TableCell>
                <TableCell><p className="text-sm">{formatDistanceToNow(new Date(session.lastActive), { addSuffix: true })}</p></TableCell>
                <TableCell>{getRiskBadge(session.riskLevel)}</TableCell>
                <TableCell className="text-right">
                  {!session.isCurrent && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleRevokeClick(session.id)} aria-label={`Revoke session for ${session.os} on ${session.browser}`}>
                      <XCircle className="h-4 w-4 mr-1" />Revoke
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }, [sessions, isLoading, revokeMutation.isPending]);

  if (isError) return (
    <Alert variant="destructive" className="max-w-4xl mx-auto mt-8">
      <AlertCircle className="h-4 w-4" /><AlertTitle>Error Loading Sessions</AlertTitle>
      <AlertDescription>{error?.message || 'Failed to load active sessions. Please try again later.'}
        <Button variant="outline" size="sm" className="mt-4 block" onClick={() => refetch()}>Retry</Button>
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Session Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your active sessions and secure your crypto account.</p>
        </div>
        <Button variant="destructive" onClick={handleRevokeAll} disabled={revokeAllMutation.isPending || isLoading || !sessions || sessions.length <= 1} aria-label="Revoke all other sessions">
          {revokeAllMutation.isPending ? 'Revoking...' : 'Revoke All Other Sessions'}
        </Button>
      </div>

      <Card className="border-border/50 shadow-sm dark:bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Active Sessions</CardTitle>
          <CardDescription>Review devices currently logged into your account. If you see an unfamiliar device, revoke its access immediately.</CardDescription>
        </CardHeader>
        <CardContent>{renderSessionContent}</CardContent>
      </Card>

      <Dialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2"><ShieldAlert className="h-5 w-5" />Revoke Session</DialogTitle>
            <DialogDescription>Are you sure you want to revoke access for this device? It will be logged out immediately and will require re-authentication to access your crypto assets.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsRevokeDialogOpen(false)} disabled={revokeMutation.isPending}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmRevoke} disabled={revokeMutation.isPending}>
              {revokeMutation.isPending ? 'Revoking...' : 'Confirm Revoke'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}