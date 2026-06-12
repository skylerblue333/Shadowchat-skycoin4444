// AUTO-GENERATED DRAFT SCREEN: JsonFormatter
import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useJsonFormatter from '@/hooks/useJsonFormatter';

const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>('');
  const { formattedJson, error, isLoading, formatJson } = useJsonFormatter();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputJson(e.target.value);
  };

  const handleFormat = () => {
    formatJson(inputJson);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-8" aria-label="JSON Formatter Tool">JSON Formatter</h1>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
        <div className="flex-1 flex flex-col gap-4">
          <Textarea
            value={inputJson}
            onChange={handleInputChange}
            placeholder="Enter JSON here..."
            rows={15}
            className="w-full resize-none"
            aria-label="JSON Input"
          />
          <Button
            onClick={handleFormat}
            disabled={isLoading}
            className="w-full"
            aria-label={isLoading ? 'Formatting JSON' : 'Format JSON'}
          >
            {isLoading ? 'Formatting...' : 'Format JSON'}
          </Button>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm" role="alert">Error: {error}</p>}
          <Textarea
            value={formattedJson}
            readOnly
            placeholder="Formatted JSON will appear here..."
            rows={15}
            className="w-full resize-none"
            aria-label="Formatted JSON Output"
          />
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
