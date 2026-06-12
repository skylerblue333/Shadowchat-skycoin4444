// AUTO-GENERATED DRAFT SCREEN: VerifiableCredentialsScreen
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './trpc'; // Import the tRPC client instance
// Main component
const VerifiableCredentialsScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [newCredentialRecipient, setNewCredentialRecipient] = useState('');
  const [newCredentialType, setNewCredentialType] = useState('');

  const { data: credentials, isLoading, isError, error } = trpc.vc.getCredentials.useQuery();
  const issueCredentialMutation = trpc.vc.issueCredential.useMutation();

  const handleIssueCredential = () => {
    if (newCredentialRecipient && newCredentialType) {
      issueCredentialMutation.mutate({
        recipient: newCredentialRecipient,
        type: newCredentialType,
        data: { /* additional data */ },
      });
      setNewCredentialRecipient('');
      setNewCredentialType('');
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Verifiable Credentials</h1>

        <div className="flex justify-end mb-4">
          <Label htmlFor="dark-mode-switch" className="flex items-center space-x-2 cursor-pointer">
            <span>Dark Mode</span>
            <Switch
              id="dark-mode-switch"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
          </Label>
        </div>

        {isLoading && <p className="text-center">Loading credentials...</p>}
        {isError && <p className="text-center text-red-500">Error: {error?.message}</p>}

        {credentials && credentials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {credentials.map((credential) => (
              <Card key={credential.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{credential.type} from {credential.issuer}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Status: <span className={`font-semibold ${credential.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'}`}>{credential.status}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          !isLoading && !isError && <p className="text-center">No verifiable credentials found.</p>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Issue New Credential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="Recipient's Identifier"
                  value={newCredentialRecipient}
                  onChange={(e) => setNewCredentialRecipient(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Credential Type</Label>
                <Input
                  id="type"
                  placeholder="e.g., Degree, Employment"
                  value={newCredentialType}
                  onChange={(e) => setNewCredentialType(e.target.value)}
                />
              </div>
              <Button
                onClick={handleIssueCredential}
                disabled={issueCredentialMutation.isPending || !newCredentialRecipient || !newCredentialType}
              >
                {issueCredentialMutation.isPending ? 'Issuing...' : 'Issue Credential'}
              </Button>
              {issueCredentialMutation.isSuccess && <p className="text-green-500">{issueCredentialMutation.data?.message}</p>}
              {issueCredentialMutation.isError && <p className="text-red-500">Error issuing credential: {issueCredentialMutation.error?.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifiableCredentialsScreen;
