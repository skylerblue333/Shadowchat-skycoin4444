// AUTO-GENERATED DRAFT SCREEN: ReferenceCheckScreen
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  UserPlus, 
  Mail, 
  Phone, 
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { trpc } from '@/utils/trpc';

interface ReferenceFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  relationship: string;
}

export default function ReferenceCheckScreen() {
  const [formData, setFormData] = useState<ReferenceFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    relationship: ''
  });

  const { mutateAsync: submitReference, isLoading, error, isSuccess, reset } = trpc.onboarding.submitReference.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, relationship: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitReference(formData);
    } catch (err) {
      // Error is handled by the mutation hook and displayed in the UI
      console.error('Failed to submit reference:', err);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
        <Card className="w-full max-w-md mx-auto shadow-lg border-slate-200 dark:border-slate-800">
          <CardContent className="pt-8 flex flex-col items-center text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-300">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Reference Submitted
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                We've sent an email to <span className="font-medium text-slate-900 dark:text-slate-200">{formData.email}</span> with instructions on how to complete the reference check.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <Button onClick={reset} variant="outline" className="w-full sm:w-auto">
              Add Another Reference
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            SKYCOIN4444 Onboarding
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Step 3: Professional Reference Check
          </p>
        </div>

        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserPlus className="h-6 w-6 text-primary" />
              Provide a Reference
            </CardTitle>
            <CardDescription className="text-base">
              Please provide contact details for a professional reference. We will reach out to them securely.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Submission Failed</AlertTitle>
                  <AlertDescription>{error.message || 'An unexpected error occurred. Please try again.'}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300">Full Name</Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Jane Doe"
                      className="pl-10 bg-white dark:bg-slate-900"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane.doe@company.com"
                      className="pl-10 bg-white dark:bg-slate-900"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 bg-white dark:bg-slate-900"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="company" className="text-slate-700 dark:text-slate-300">Company</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Corp"
                      className="pl-10 bg-white dark:bg-slate-900"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 md:col-span-2">
                  <Label htmlFor="relationship" className="text-slate-700 dark:text-slate-300">Professional Relationship</Label>
                  <Select 
                    value={formData.relationship} 
                    onValueChange={handleSelectChange}
                    disabled={isLoading}
                    required
                  >
                    <SelectTrigger id="relationship" className="bg-white dark:bg-slate-900">
                      <SelectValue placeholder="Select relationship type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Direct Manager</SelectItem>
                      <SelectItem value="colleague">Colleague / Peer</SelectItem>
                      <SelectItem value="report">Direct Report</SelectItem>
                      <SelectItem value="client">Client / Customer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4 border-t border-slate-100 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl">
              <Button type="button" variant="ghost" disabled={isLoading} className="w-full sm:w-auto">
                Skip for now
              </Button>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto min-w-[160px]">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Reference
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}