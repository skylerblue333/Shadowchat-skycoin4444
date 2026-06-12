// AUTO-GENERATED DRAFT SCREEN: VotingInterface
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Proposal {
  id: string;
  title: string;
  description: string;
  options: string[];
}

interface VotingInterfaceProps {
  proposal: Proposal;
  onVote: (proposalId: string, selectedOption: string) => void;
  isLoading: boolean;
  error: string | null;
}

const VotingInterface: React.FC<VotingInterfaceProps> = ({ proposal, onVote, isLoading, error }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onVote(proposal.id, selectedOption);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{proposal.title}</CardTitle>
          <CardDescription>{proposal.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup onValueChange={setSelectedOption} value={selectedOption || ''} className="space-y-4">
            {proposal.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p className="text-red-500 text-sm mt-4">Error: {error}</p>}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!selectedOption || isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Vote'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VotingInterface;
