// AUTO-GENERATED DRAFT SCREEN: QrCodeScanner

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQRCodeScanner } from './hooks/useQRCodeScanner'; // Assuming a custom hook for scanner logic
import { Button } from './ui/button'; // shadcn/ui button
import { Input } from './ui/input'; // shadcn/ui input
import { Label } from './ui/label'; // shadcn/ui label
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // shadcn/ui card
import { MoonIcon, SunIcon, QrCodeIcon, Loader2 } from 'lucide-react'; // Icons for dark mode toggle and loading
import { trpc } from './utils/trpc'; // Assuming tRPC client setup

interface QrCodeScannerProps {
  onScan: (data: string) => void;
  onError: (error: string) => void;
}

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScan, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Simulate tRPC hook for a hypothetical backend scan validation
  const { mutate: validateScan, isLoading: isValidating } = trpc.qr.validate.useMutation({
    onSuccess: (data) => {
      if (data.isValid) {
        onScan(scannedData!); // Use non-null assertion as it's validated in logic
      } else {
        onError('Invalid QR code content.');
      }
    },
    onError: (error) => {
      onError(`Validation error: ${error.message}`);
    },
  });

  const { startScanner, stopScanner, error: scannerError, data: scannerResult, loading: scannerLoading } = useQRCodeScanner(videoRef);

  useEffect(() => {
    if (scannerResult) {
      setScannedData(scannerResult);
      setIsScanning(false);
      // Optionally validate with tRPC
      validateScan({ qrContent: scannerResult });
    }
  }, [scannerResult, validateScan]);

  useEffect(() => {
    if (scannerError) {
      onError(scannerError);
      setIsScanning(false);
    }
  }, [scannerError, onError]);

  const handleStartScan = useCallback(() => {
    setIsScanning(true);
    setScannedData(null);
    startScanner();
  }, [startScanner]);

  const handleStopScan = useCallback(() => {
    setIsScanning(false);
    stopScanner();
  }, [stopScanner]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  }, [isDarkMode]);

  const isLoading = scannerLoading || isValidating;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>QR Code Scanner</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
            {isScanning && !scannerError ? (
              <video ref={videoRef} className="w-full h-full object-cover" playsInline />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                <QrCodeIcon className="h-12 w-12 mb-2" />
                <span>{scannerError || 'Ready to scan'}</span>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </div>

          {scannedData && (
            <div className="space-y-2">
              <Label htmlFor="scanned-data" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Scanned Data</Label>
              <Input
                id="scanned-data"
                type="text"
                value={scannedData}
                readOnly
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}
                aria-label="Scanned QR code data"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleStartScan} disabled={isScanning || isLoading} className="flex-1">
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Button>
            <Button onClick={handleStopScan} disabled={!isScanning || isLoading} variant="outline" className="flex-1">
              Stop Scan
            </Button>
          </div>

          {scannerError && <p className="text-red-500 text-sm" role="alert">Error: {scannerError}</p>}
          {isValidating && <p className="text-blue-500 text-sm">Validating scan...</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeScanner;
