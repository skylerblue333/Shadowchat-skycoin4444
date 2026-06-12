// AUTO-GENERATED DRAFT SCREEN: RewardGiftingScreen
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Loader2 } from 'lucide-react';
import { ModeToggle } from '../components/mode-toggle';

const RewardGiftingScreen: React.FC = () => {
  const [recipientId, setRecipientId] = useState('');
  const [selectedGift, setSelectedGift] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState('');

  const { data: giftOptions, isLoading: isLoadingGiftOptions, error: giftOptionsError } = trpc.gifting.getGiftOptions.useQuery();
  const sendGiftMutation = trpc.gifting.sendGift.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGift && recipientId) {
      sendGiftMutation.mutate({
        recipientId,
        giftId: selectedGift,
        message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Reward Gifting</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Send a special reward to a fellow SkyCoin holder.</CardDescription>
        </CardHeader>
        <CardContent>
          {giftOptionsError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{giftOptionsError.message}</AlertDescription>
            </Alert>
          )}

          {sendGiftMutation.isError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{sendGiftMutation.error.message}</AlertDescription>
            </Alert>
          )}

          {sendGiftMutation.isSuccess && (
            <Alert className="mb-4">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{sendGiftMutation.data.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="recipientId">Recipient ID</Label>
              <Input
                id="recipientId"
                type="text"
                placeholder="Enter recipient's ID"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="giftOption">Select Gift</Label>
              <Select onValueChange={setSelectedGift} value={selectedGift}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a reward" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingGiftOptions ? (
                    <SelectItem value="loading" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading options...
                    </SelectItem>
                  ) : (
                    giftOptions?.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name} - {option.description}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message (max 200 characters)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
              />
            </div>

            <Button type="submit" className="w-full" disabled={sendGiftMutation.isLoading || isLoadingGiftOptions || !recipientId || !selectedGift}>
              {sendGiftMutation.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reward
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardGiftingScreen;
