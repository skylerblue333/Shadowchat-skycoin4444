// AUTO-GENERATED DRAFT SCREEN: CryptoEmailTemplates
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Mock tRPC hook for demonstration purposes
const useGetEmailTemplates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.1) { // Simulate 90% success rate
        setData([
          { id: '1', name: 'Welcome Email', subject: 'Welcome to SKYCOIN4444!', body: 'Hello {{user.name}}, welcome to our platform!' },
          { id: '2', name: 'Password Reset', subject: 'Reset Your SKYCOIN4444 Password', body: 'Click here to reset your password: {{resetLink}}' },
        ]);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to load email templates.',
          variant: 'destructive',
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return { isLoading, isError, data };
};

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

const CryptoEmailTemplates: React.FC = () => {
  const { data: templates, isLoading, isError } = useGetEmailTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading templates...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading templates.</div>;
  }

  return (
    <div className={cn("min-h-screen p-8", { "dark": isDarkTheme })}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Crypto: Email Templates</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Templates</CardTitle>
              <CardDescription>Select a template to edit.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates?.map((template: EmailTemplate) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate?.id === template.id ? "secondary" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedTemplate ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Template: {selectedTemplate.name}</CardTitle>
                <CardDescription>Modify the subject and body of the email template.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template-subject">Subject</Label>
                  <Input
                    id="template-subject"
                    value={selectedTemplate.subject}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                    aria-label="Email subject"
                  />
                </div>
                <div>
                  <Label htmlFor="template-body">Body</Label>
                  <Textarea
                    id="template-body"
                    value={selectedTemplate.body}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                    rows={10}
                    aria-label="Email body"
                  />
                </div>
                <Button onClick={() => toast({ title: 'Template Saved', description: `${selectedTemplate.name} updated.` })}>Save Changes</Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent>
                <p className="text-center text-muted-foreground">Select a template to start editing.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoEmailTemplates;