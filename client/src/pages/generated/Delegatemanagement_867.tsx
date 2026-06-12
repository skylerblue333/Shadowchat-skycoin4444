// AUTO-GENERATED DRAFT SCREEN: DelegateManagement
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const DelegateManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const { data: delegates, isLoading, isError, error } = trpc.delegate.query({ search });

  if (isLoading) return <div>Loading delegates...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Delegate Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Input
              type="text"
              placeholder="Search delegates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
          <div className="space-y-4">
            {delegates?.map((delegate) => (
              <div key={delegate.id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">{delegate.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Votes: {delegate.votes}</p>
                </div>
                <Button>Delegate</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelegateManagement;
