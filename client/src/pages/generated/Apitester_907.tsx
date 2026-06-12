// AUTO-GENERATED DRAFT SCREEN: ApiTester
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc";
import { useTheme } from "./theme-provider"; // Assuming a theme provider for dark mode

const ApiTester: React.FC = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [responseStatus, setResponseStatus] = useState("N/A");
  const [responseTime, setResponseTime] = useState("N/A");
  const [responseBody, setResponseBody] = useState("");
  const { theme } = useTheme(); // For dark mode

  const testApiMutation = trpc.testApi.useMutation({
    onMutate: () => {
      setResponseStatus("Loading...");
      setResponseTime("Loading...");
      setResponseBody("");
    },
    onSuccess: (data) => {
      setResponseStatus(data.status.toString());
      setResponseTime(data.time);
      setResponseBody(JSON.stringify(data.data, null, 2));
    },
    onError: (error) => {
      setResponseStatus("Error");
      setResponseTime("N/A");
      setResponseBody(`Error: ${error.message}`);
    },
  });

  const handleSendRequest = () => {
    testApiMutation.mutate({
      method,
      url,
      body: requestBody,
    });
  };

  return (
    <div className={`flex flex-col h-screen p-4 ${theme === "dark" ? "dark" : ""}`}>
      <h1 className="text-3xl font-bold mb-4">API Tester</h1>
      <div className="flex flex-grow space-x-4">
        {/* Request Builder */}
        <div className="flex flex-col w-1/2 border rounded-lg p-4 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2">Request</h2>
          {/* Method and URL */}
          <div className="flex space-x-2 mb-4">
            <Select onValueChange={setMethod} defaultValue={method}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
              aria-label="API Endpoint URL"
            />
            <Button onClick={handleSendRequest} disabled={testApiMutation.isLoading}>
              {testApiMutation.isLoading ? "Sending..." : "Send"}
            </Button>
          </div>

          {/* Request Tabs (Headers, Body) */}
          <Tabs defaultValue="body" className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            <TabsContent value="headers" className="flex-grow">
              <div className="h-full border rounded-md p-2 bg-gray-50 dark:bg-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Headers functionality to be implemented.</p>
              </div>
            </TabsContent>
            <TabsContent value="body" className="flex-grow">
              <Textarea
                placeholder="Request Body (JSON, etc.)"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="flex-grow font-mono text-sm"
                aria-label="Request Body"
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Response Viewer */}
        <div className="flex flex-col w-1/2 border rounded-lg p-4 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2">Response</h2>
          {/* Status, Time */}
          <div className="mb-4 flex space-x-4">
            <p>Status: <span className="font-semibold" aria-live="polite">{responseStatus}</span></p>
            <p>Time: <span className="font-semibold" aria-live="polite">{responseTime}</span></p>
          </div>

          {/* Response Tabs (Headers, Body) */}
          <Tabs defaultValue="body" className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            <TabsContent value="headers" className="flex-grow">
              <div className="h-full border rounded-md p-2 bg-gray-50 dark:bg-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Response Headers functionality to be implemented.</p>
              </div>
            </TabsContent>
            <TabsContent value="body" className="flex-grow">
              <Textarea
                readOnly
                value={responseBody}
                placeholder="Response Body"
                className="flex-grow font-mono text-sm"
                aria-label="Response Body"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
