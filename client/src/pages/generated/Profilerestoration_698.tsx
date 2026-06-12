// AUTO-GENERATED DRAFT SCREEN: ProfileRestoration
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "../utils/trpc";

const ProfileRestoration: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [restorationCode, setRestorationCode] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const restoreProfile = trpc.profile.restore.useMutation({
    onSuccess: (data) => {
      setMessage({ type: 'success', text: data.message });
      setEmail('');
      setRestorationCode('');
    },
    onError: (error) => {
      setMessage({ type: 'error', text: error.message });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await restoreProfile.mutateAsync({ email, restorationCode });
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-card text-card-foreground rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Profile Restoration</h1>
        <p className="text-center text-muted-foreground">Enter your details to restore your profile.</p>
        <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="profile-restoration-heading">
          <h2 id="profile-restoration-heading" className="sr-only">Profile Restoration Form</h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full"
              disabled={restoreProfile.isLoading}
              aria-describedby="email-help-text"
            />
            <p id="email-help-text" className="sr-only">Enter the email associated with your profile.</p>
          </div>
          <div>
            <label htmlFor="restorationCode" className="block text-sm font-medium text-foreground">Restoration Code</label>
            <Input
              id="restorationCode"
              type="text"
              placeholder="Enter your restoration code"
              value={restorationCode}
              onChange={(e) => setRestorationCode(e.target.value)}
              required
              className="mt-1 block w-full"
              disabled={restoreProfile.isLoading}
              aria-describedby="code-help-text"
            />
            <p id="code-help-text" className="sr-only">Enter the unique restoration code you received.</p>
          </div>
          <Button type="submit" className="w-full" disabled={restoreProfile.isLoading} aria-label="Restore Profile">
            {restoreProfile.isLoading ? 'Restoring...' : 'Restore Profile'}
          </Button>
        </form>
        {message && (
          <div
            role="alert"
            aria-live="assertive"
            className={`p-3 rounded-md text-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRestoration;