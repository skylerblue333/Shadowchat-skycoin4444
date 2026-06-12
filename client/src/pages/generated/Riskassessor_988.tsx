// AUTO-GENERATED DRAFT SCREEN: RiskAssessor
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { trpc } from '../utils/trpc'; // Adjust path as per your tRPC setup
import { z } from 'zod'; // For schema validation

// shadcn/ui components (placeholder imports)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

// Define input schema for risk assessment
const riskAssessmentSchema = z.object({
  assetValue: z.number().min(0, { message: 'Asset value cannot be negative.' }),
  threatLikelihood: z.number().min(0).max(100, { message: 'Threat likelihood must be between 0 and 100.' }),
  impactSeverity: z.number().min(0).max(100, { message: 'Impact severity must be between 0 and 100.' }),
});

type RiskAssessmentInput = z.infer<typeof riskAssessmentSchema>;

// Define output schema for risk assessment result
const riskResultSchema = z.object({
  riskScore: z.number(),
  category: z.enum(['Low', 'Medium', 'High', 'Critical']),
  recommendations: z.array(z.string()),
});

type RiskResult = z.infer<typeof riskResultSchema>;

const RiskAssessor: React.FC = () => {
  const { toast } = useToast();
  const [input, setInput] = useState<RiskAssessmentInput>({
    assetValue: 10000,
    threatLikelihood: 50,
    impactSeverity: 50,
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Simulate dark theme toggle
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // tRPC hook for fetching risk assessment (e.g., initial data or recalculation)
  const { data, isLoading, error, refetch } = trpc.risk.assess.useQuery(input, {
    enabled: false, // Only run on demand
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  // tRPC hook for performing risk assessment mutation
  const { mutate, isLoading: isMutating } = trpc.risk.performAssessment.useMutation({
    onSuccess: (result) => {
      toast({
        title: 'Success',
        description: 'Risk assessment completed.',
      });
      // Optionally update local state or trigger a refetch of the query
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = useCallback((field: keyof RiskAssessmentInput, value: number) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    try {
      riskAssessmentSchema.parse(input);
      mutate(input);
    } catch (e) {
      if (e instanceof z.ZodError) {
        e.errors.forEach((err) => {
          toast({
            title: 'Validation Error',
            description: err.message,
            variant: 'destructive',
          });
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred during validation.',
          variant: 'destructive',
        });
      }
    }
  }, [input, mutate, toast]);

  return (
    <div className="min-h-screen bg-background p-4 dark:bg-gray-900 text-foreground">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Risk Assessor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-end space-x-2">
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="asset-value">Asset Value ($)</Label>
                <Input
                  id="asset-value"
                  type="number"
                  value={input.assetValue}
                  onChange={(e) => handleInputChange('assetValue', parseFloat(e.target.value))}
                  placeholder="e.g., 10000"
                  aria-describedby="asset-value-description"
                />
                <p id="asset-value-description" className="text-sm text-muted-foreground">The monetary value of the asset being assessed.</p>
              </div>

              <div>
                <Label htmlFor="threat-likelihood">Threat Likelihood (%)</Label>
                <Slider
                  id="threat-likelihood"
                  min={0}
                  max={100}
                  step={1}
                  value={[input.threatLikelihood]}
                  onValueChange={(val) => handleInputChange('threatLikelihood', val[0])}
                  aria-describedby="threat-likelihood-description"
                />
                <div className="text-right text-sm text-muted-foreground">{input.threatLikelihood}%</div>
                <p id="threat-likelihood-description" className="text-sm text-muted-foreground">The probability of a threat exploiting a vulnerability.</p>
              </div>

              <div>
                <Label htmlFor="impact-severity">Impact Severity (%)</Label>
                <Slider
                  id="impact-severity"
                  min={0}
                  max={100}
                  step={1}
                  value={[input.impactSeverity]}
                  onValueChange={(val) => handleInputChange('impactSeverity', val[0])}
                  aria-describedby="impact-severity-description"
                />
                <div className="text-right text-sm text-muted-foreground">{input.impactSeverity}%</div>
                <p id="impact-severity-description" className="text-sm text-muted-foreground">The severity of the consequences if a threat materializes.</p>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading || isMutating}
              className="w-full"
              aria-live="polite"
            >
              {(isLoading || isMutating) ? 'Assessing Risk...' : 'Perform Assessment'}
            </Button>

            {error && (
              <div className="text-red-500 text-sm" role="alert">
                Failed to load data: {error.message}
              </div>
            )}

            {data && (
              <Card className="mt-6 bg-muted">
                <CardHeader>
                  <CardTitle>Assessment Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Risk Score:</strong> {data.riskScore.toFixed(2)}</p>
                  <p><strong>Category:</strong> <span className={`font-semibold ${data.category === 'Critical' ? 'text-red-600' : data.category === 'High' ? 'text-orange-500' : data.category === 'Medium' ? 'text-yellow-500' : 'text-green-600'}`}>{data.category}</span></p>
                  <div>
                    <strong>Recommendations:</strong>
                    <ul className="list-disc list-inside">
                      {data.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskAssessor;
