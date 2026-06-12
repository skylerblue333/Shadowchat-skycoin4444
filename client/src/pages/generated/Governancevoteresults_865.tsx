// AUTO-GENERATED DRAFT SCREEN: GovernanceVoteResults
import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  BarChart3, 
  ChevronLeft,
  Info
} from 'lucide-react';

// Mock tRPC hook for demonstration
const trpc = {
  governance: {
    getVoteResults: {
      useQuery: (params: { proposalId: string }) => {
        return {
          data: {
            id: params.proposalId,
            title: "SIP-042: Increase Validator Active Set to 150",
            status: "passed",
            endTime: "2026-06-15T00:00:00Z",
            totalVotes: 12500000,
            quorum: 10000000,
            turnoutPercentage: 65.4,
            results: {
              yes: { votes: 8500000, percentage: 68 },
              no: { votes: 3000000, percentage: 24 },
              abstain: { votes: 1000000, percentage: 8 }
            },
            voters: 4250,
            description: "This proposal aims to increase the active validator set from 100 to 150 to improve network decentralization and censorship resistance."
          },
          isLoading: false,
          isError: false,
          error: null,
          refetch: () => {}
        };
      }
    }
  }
};

// --- UI Components (Mocking shadcn/ui) ---
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}>{children}</div>
);

const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`p-6 border-b border-slate-100 dark:border-slate-800 ${className || ''}`}>{children}</div>
);

const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={`text-lg font-semibold text-slate-900 dark:text-white ${className || ''}`}>{children}</h3>
);

const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`p-6 ${className || ''}`}>{children}</div>
);

const Badge = ({ variant = 'default', className, children }: { variant?: 'default' | 'success' | 'destructive' | 'outline' | 'secondary', className?: string, children: React.ReactNode }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    destructive: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    outline: 'border border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-300',
    secondary: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className || ''}`}>{children}</span>;
};

const Progress = ({ value, className, indicatorClassName }: { value: number, className?: string, indicatorClassName?: string }) => (
  <div className={`h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${className || ''}`}>
    <div className={`h-full rounded-full transition-all duration-500 ease-in-out ${indicatorClassName || 'bg-blue-600 dark:bg-blue-500'}`} style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} />
  </div>
);

const Button = ({ variant = 'default', size = 'default', className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost', size?: 'default' | 'sm' | 'icon' }) => {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
  };
  const sizes = { default: 'h-10 px-4 py-2', sm: 'h-8 px-3 text-xs', icon: 'h-10 w-10 flex items-center justify-center' };
  return <button className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className || ''}`} {...props}>{children}</button>;
};

const Skeleton = ({ className }: { className?: string }) => <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${className || ''}`} />;

const Alert = ({ variant = 'default', title, children }: { variant?: 'default' | 'destructive', title?: string, children: React.ReactNode }) => {
  const variants = {
    default: 'bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-300',
    destructive: 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800/50 dark:text-rose-300'
  };
  return (
    <div className={`p-4 border rounded-lg flex gap-3 ${variants[variant]}`}>
      {variant === 'destructive' ? <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-500 shrink-0" /> : <Info className="h-5 w-5 text-blue-600 dark:text-blue-500 shrink-0" />}
      <div>{title && <h4 className="font-medium mb-1">{title}</h4>}<div className="text-sm opacity-90">{children}</div></div>
    </div>
  );
};

// --- Main Component ---
export interface GovernanceVoteResultsProps { proposalId: string; onBack?: () => void; }

export default function GovernanceVoteResults({ proposalId = "sip-042", onBack }: GovernanceVoteResultsProps) {
  const { data, isLoading, isError, error, refetch } = trpc.governance.getVoteResults.useQuery({ proposalId });
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed': return <Badge variant="success" className="gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Passed</Badge>;
      case 'rejected': return <Badge variant="destructive" className="gap-1.5"><XCircle className="w-3.5 h-3.5" /> Rejected</Badge>;
      case 'active': return <Badge variant="default" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> Active</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-4 mb-8"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-64 md:w-96" /></div></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6"><Card><CardHeader><Skeleton className="h-6 w-32" /></CardHeader><CardContent className="space-y-6">{[1, 2, 3].map(i => (<div key={i} className="space-y-2"><div className="flex justify-between"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-24" /></div><Skeleton className="h-2.5 w-full rounded-full" /></div>))}</CardContent></Card></div>
          <div className="space-y-6"><Card><CardHeader><Skeleton className="h-6 w-24" /></CardHeader><CardContent className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card></div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
        <Alert variant="destructive" title="Failed to load vote results">
          <p className="mb-3">{error instanceof Error ? error.message : "An unexpected error occurred."}</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>Try Again</Button>
        </Alert>
      </div>
    );
  }

  const isQuorumReached = data.totalVotes >= data.quorum;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-3">
          {onBack && <Button variant="ghost" size="icon" onClick={onBack} className="mt-1 shrink-0"><ChevronLeft className="h-5 w-5" /></Button>}
          <div>
            <div className="flex items-center gap-3 mb-2"><span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{data.id.toUpperCase()}</span>{getStatusBadge(data.status)}</div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{data.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Voting Results</CardTitle>
              <span className="text-sm text-slate-500 dark:text-slate-400">{formatNumber(data.totalVotes)} total votes</span>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="h-4 w-4" /> Yes</div>
                  <div className="flex items-center gap-3"><span className="text-slate-500 dark:text-slate-400">{formatNumber(data.results.yes.votes)}</span><span className="font-bold w-12 text-right">{data.results.yes.percentage}%</span></div>
                </div>
                <Progress value={data.results.yes.percentage} indicatorClassName="bg-emerald-500 dark:bg-emerald-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium text-rose-700 dark:text-rose-400"><XCircle className="h-4 w-4" /> No</div>
                  <div className="flex items-center gap-3"><span className="text-slate-500 dark:text-slate-400">{formatNumber(data.results.no.votes)}</span><span className="font-bold w-12 text-right">{data.results.no.percentage}%</span></div>
                </div>
                <Progress value={data.results.no.percentage} indicatorClassName="bg-rose-500 dark:bg-rose-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400"><MinusCircle className="h-4 w-4" /> Abstain</div>
                  <div className="flex items-center gap-3"><span className="text-slate-500 dark:text-slate-400">{formatNumber(data.results.abstain.votes)}</span><span className="font-bold w-12 text-right">{data.results.abstain.percentage}%</span></div>
                </div>
                <Progress value={data.results.abstain.percentage} indicatorClassName="bg-slate-400 dark:bg-slate-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold mb-1 flex items-center gap-2">Quorum Status {isQuorumReached ? <Badge variant="success" className="text-[10px] px-1.5 py-0">Reached</Badge> : <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Not Reached</Badge>}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{formatNumber(data.totalVotes)} of {formatNumber(data.quorum)} required votes</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-500">Current: {((data.totalVotes / data.quorum) * 100).toFixed(1)}%</span><span className="text-slate-500">Target: 100%</span></div>
                  <Progress value={(data.totalVotes / data.quorum) * 100} indicatorClassName={isQuorumReached ? "bg-emerald-500" : "bg-amber-500"} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4"><CardTitle>Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800"><div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Users className="h-4 w-4" /> Total Voters</div><span className="font-medium">{formatNumber(data.voters)}</span></div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800"><div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><BarChart3 className="h-4 w-4" /> Turnout</div><span className="font-medium">{data.turnoutPercentage}%</span></div>
              <div className="flex justify-between items-center py-2"><div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Clock className="h-4 w-4" /> End Date</div><span className="font-medium text-sm">{new Date(data.endTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
            <CardContent className="p-5">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2"><Info className="h-4 w-4" /> Voting Rules</h4>
              <ul className="text-sm text-blue-800/80 dark:text-blue-300/80 space-y-2 list-disc pl-4">
                <li>1 token = 1 vote</li>
                <li>Quorum requires 10M total votes</li>
                <li>Simple majority (>50% Yes) required to pass</li>
                <li>Voting period lasts 7 days</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}