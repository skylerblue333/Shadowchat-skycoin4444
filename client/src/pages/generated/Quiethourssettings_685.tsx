// AUTO-GENERATED DRAFT SCREEN: QuietHoursSettings
import React, { useState, useEffect } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface QuietHoursSettingsProps {
  initialEnabled?: boolean;
  initialStartTime?: string;
  initialEndTime?: string;
}

const QuietHoursSettings: React.FC<QuietHoursSettingsProps> = ({
  initialEnabled = false,
  initialStartTime = '22:00',
  initialEndTime = '07:00',
}) => {
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const [startTime, setStartTime] = useState<string>(initialStartTime);
  const [endTime, setEndTime] = useState<string>(initialEndTime);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  // Simulate tRPC hook for saving settings
  const saveSettings = async () => {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (Math.random() > 0.9) { // Simulate occasional error
        throw new Error('Failed to save settings. Please try again.');
      }
      console.log('Settings saved:', { enabled, startTime, endTime });
      setSaved(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  const handleSave = () => {
    saveSettings();
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold">Quiet Hours Settings</h2>

      <div className="flex items-center justify-between">
        <Label htmlFor="quiet-hours-toggle" className="text-base">
          Enable Quiet Hours
        </Label>
        <Switch
          id="quiet-hours-toggle"
          checked={enabled}
          onCheckedChange={setEnabled}
          aria-label="Toggle quiet hours"
        />
      </div>

      {enabled && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-time">Start Time</Label>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger id="start-time" className="w-full">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="end-time">End Time</Label>
            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger id="end-time" className="w-full">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save Settings'}
      </Button>

      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      {saved && <p className="text-green-500 text-sm">Settings saved successfully!</p>}
    </div>
  );
};

export default QuietHoursSettings;