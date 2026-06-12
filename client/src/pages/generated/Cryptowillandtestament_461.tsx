// @ts-nocheck
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: CryptoWillAndTestament

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface Beneficiary {
  id: string;
  name: string;
  address: string;
  percentage: number;
}

interface WillData {
  id: string;
  ownerAddress: string;
  beneficiaries: Beneficiary[];
  executorAddress: string;
  lastUpdated: string;
}

const CryptoWillAndTestament: React.FC = () => {
  const [ownerAddress, setOwnerAddress] = useState('');
  const [executorAddress, setExecutorAddress] = useState('');
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState('');
  const [newBeneficiaryAddress, setNewBeneficiaryAddress] = useState('');
  const [newBeneficiaryPercentage, setNewBeneficiaryPercentage] = useState<number>(0);

  const { theme, setTheme } = useTheme();

  const { data, isLoading, isError, error, refetch } = useStubQuery(
    { ownerAddress },
    { enabled: !!ownerAddress }
  );

  const createWillMutation = useStubMutation();
  const updateWillMutation = useStubMutation();

  const handleAddBeneficiary = () => {
    if (newBeneficiaryName && newBeneficiaryAddress && newBeneficiaryPercentage > 0) {
      setBeneficiaries([
        ...beneficiaries,
        { id: Math.random().toString(), name: newBeneficiaryName, address: newBeneficiaryAddress, percentage: newBeneficiaryPercentage },
      ]);
      setNewBeneficiaryName('');
      setNewBeneficiaryAddress('');
      setNewBeneficiaryPercentage(0);
    }
  };

  const handleSaveWill = async () => {
    try {
      if (data?.id) {
        await updateWillMutation.mutateAsync({ willId: data.id, ownerAddress, executorAddress, beneficiaries });
      } else {
        await createWillMutation.mutateAsync({ ownerAddress, executorAddress, beneficiaries });
      }
      refetch();
    } catch (err) {
      console.error('Failed to save will:', err);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading will data...</div>;
  if (isError) return <div className="text-red-500 text-center min-h-screen">Error: {error?.message}</div>;

  return (
    <div className={`container mx-auto p-4 ${theme === 'dark' ? 'dark' : ''}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto Will & Testament</h1>

      <div className="flex justify-end mb-4">
        <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
        <Switch
          id="dark-mode"
          checked={theme === 'dark'}
          onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label htmlFor="owner-address">Owner Address</Label>
          <Input
            id="owner-address"
            type="text"
            value={ownerAddress}
            onChange={(e) => setOwnerAddress(e.target.value)}
            placeholder="Enter owner's crypto address"
            aria-label="Owner's crypto address"
          />

          <Label htmlFor="executor-address">Executor Address</Label>
          <Input
            id="executor-address"
            type="text"
            value={executorAddress}
            onChange={(e) => setExecutorAddress(e.target.value)}
            placeholder="Enter executor's crypto address"
            aria-label="Executor's crypto address"
          />

          <h2 className="text-2xl font-semibold mt-6 mb-4">Beneficiaries</h2>
          <div className="space-y-2">
            {beneficiaries.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-2 border rounded">
                <span>{b.name} ({b.percentage}%)</span>
                <span>{b.address}</span>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 mt-4">
            <Input
              type="text"
              placeholder="Name"
              value={newBeneficiaryName}
              onChange={(e) => setNewBeneficiaryName(e.target.value)}
              aria-label="Beneficiary name"
            />
            <Input
              type="text"
              placeholder="Address"
              value={newBeneficiaryAddress}
              onChange={(e) => setNewBeneficiaryAddress(e.target.value)}
              aria-label="Beneficiary address"
            />
            <Input
              type="number"
              placeholder="Percentage"
              value={newBeneficiaryPercentage}
              onChange={(e) => setNewBeneficiaryPercentage(parseFloat(e.target.value))}
              aria-label="Beneficiary percentage"
            />
            <Button onClick={handleAddBeneficiary}>Add</Button>
          </div>

          <Button onClick={handleSaveWill} className="w-full mt-6">Save Will</Button>
        </div>

        <div className="space-y-4">
          {/* Placeholder for additional will details or summary */}
          <div className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">Current Will Details</h2>
            {data ? (
              <div className="space-y-2">
                <p><strong>Owner:</strong> {data.ownerAddress}</p>
                <p><strong>Executor:</strong> {data.executorAddress}</p>
                <p><strong>Last Updated:</strong> {new Date(data.lastUpdated).toLocaleString()}</p>
                <h3 className="font-medium mt-4">Beneficiaries:</h3>
                <ul className="list-disc pl-5">
                  {data.beneficiaries.map((b) => (
                    <li key={b.id}>{b.name} ({b.percentage}%) - {b.address}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No will data loaded. Enter owner address to fetch or create a new will.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWillAndTestament;
