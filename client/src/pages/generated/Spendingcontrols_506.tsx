// AUTO-GENERATED DRAFT SCREEN: SpendingControls
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Slider } from './components/ui/slider';
import { Badge } from './components/ui/badge';

interface SpendingControl {
  id: string;
  category: string;
  limit: number;
  enabled: boolean;
}

const SpendingControls: React.FC = () => {
  const [controls, setControls] = useState<SpendingControl[]>([
    { id: '1', category: 'Daily Transactions', limit: 100, enabled: true },
    { id: '2', category: 'Online Purchases', limit: 500, enabled: false },
    { id: '3', category: 'International Transfers', limit: 1000, enabled: true },
  ]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newLimit, setNewLimit] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddControl = () => {
    if (!newCategory || newLimit <= 0) {
      setError('Category and limit are required, and limit must be greater than 0.');
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setControls([
        ...controls,
        { id: String(controls.length + 1), category: newCategory, limit: newLimit, enabled: true },
      ]);
      setNewCategory('');
      setNewLimit(0);
      setLoading(false);
    }, 500);
  };

  const handleToggleControl = (id: string) => {
    setControls(controls.map(control =>
      control.id === id ? { ...control, enabled: !control.enabled } : control
    ));
  };

  const handleLimitChange = (id: string, value: number[]) => {
    setControls(controls.map(control =>
      control.id === id ? { ...control, limit: value[0] } : control
    ));
  };

  return (
    <div className="min-h-screen bg-background p-4 dark:bg-gray-900">
      <Card className="w-full max-w-2xl mx-auto shadow-lg dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto: Spending Controls</CardTitle>
          <CardDescription>Manage your cryptocurrency spending limits and categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="manage">Manage Controls</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Current Spending Limits</h3>
              {controls.length === 0 && <p className="text-muted-foreground">No spending controls set.</p>}
              {controls.map((control) => (
                <div key={control.id} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
                  <div>
                    <p className="font-medium">{control.category}</p>
                    <p className="text-sm text-muted-foreground">Limit: ${control.limit}</p>
                  </div>
                  <Badge variant={control.enabled ? "default" : "destructive"}>
                    {control.enabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="manage" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Add New Control</h3>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Food, Travel"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="limit">Limit ($)</Label>
                <Input
                  id="limit"
                  type="number"
                  value={newLimit}
                  onChange={(e) => setNewLimit(Number(e.target.value))}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button onClick={handleAddControl} disabled={loading}>
                {loading ? 'Adding...' : 'Add Control'}
              </Button>

              <h3 className="text-xl font-semibold mt-6">Edit Existing Controls</h3>
              {controls.length === 0 && <p className="text-muted-foreground">No controls to edit.</p>}
              {controls.map((control) => (
                <div key={control.id} className="space-y-3 p-3 border rounded-md dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`enable-${control.id}`}>{control.category}</Label>
                    <Switch
                      id={`enable-${control.id}`}
                      checked={control.enabled}
                      onCheckedChange={() => handleToggleControl(control.id)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`limit-slider-${control.id}`}>Limit: ${control.limit}</Label>
                    <Slider
                      id={`limit-slider-${control.id}`}
                      min={0}
                      max={2000}
                      step={10}
                      value={[control.limit]}
                      onValueChange={(value) => handleLimitChange(control.id, value)}
                      disabled={!control.enabled}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpendingControls;
