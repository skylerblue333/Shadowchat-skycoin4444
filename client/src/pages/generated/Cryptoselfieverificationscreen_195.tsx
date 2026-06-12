// AUTO-GENERATED DRAFT SCREEN: CryptoSelfieVerificationScreen
import React, { useState, useEffect, useRef } from 'react';

interface SelfieVerificationProps {
  userId: string;
  onVerificationComplete: (success: boolean) => void;
}

// Mock tRPC hook for selfie verification
const useSelfieVerification = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);

  const verifySelfie = async (image: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (Math.random() > 0.2) { // 80% success rate
        setData({ status: 'success', message: 'Selfie verified successfully.' });
      } else {
        throw new Error('Verification failed. Please try again.');
      }
    } catch (error) {
      setIsError(true);
      setData({ status: 'error', message: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, data, verifySelfie };
};

const CryptoSelfieVerificationScreen: React.FC<SelfieVerificationProps> = ({ userId, onVerificationComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { isLoading, isError, data, verifySelfie } = useSelfieVerification(userId);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        // Handle camera access error gracefully
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        const image = canvasRef.current.toDataURL('image/png');
        setCapturedImage(image);
        verifySelfie(image);
      }
    }
  };

  useEffect(() => {
    if (data) {
      onVerificationComplete(data.status === 'success');
    }
  }, [data, onVerificationComplete]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Selfie Verification</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Please take a clear selfie to verify your identity.</p>

        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-6">
          {stream ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Camera not available or access denied.
            </div>
          )}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>

        <button
          onClick={handleCapture}
          disabled={!stream || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200
                     disabled:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800 dark:disabled:bg-blue-500"
          aria-label="Capture Selfie"
        >
          {isLoading ? 'Verifying...' : 'Capture Selfie'}
        </button>

        {isLoading && (
          <p className="mt-4 text-blue-600 dark:text-blue-400" aria-live="polite">Verification in progress...</p>
        )}
        {isError && data && (
          <p className="mt-4 text-red-600 dark:text-red-400" aria-live="assertive">Error: {data.message}</p>
        )}
        {data && data.status === 'success' && (
          <p className="mt-4 text-green-600 dark:text-green-400" aria-live="polite">{data.message}</p>
        )}

        {capturedImage && !isLoading && !isError && data?.status === 'success' && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Captured Image Preview:</h2>
            <img src={capturedImage} alt="Captured Selfie" className="max-w-full h-auto rounded-md border border-gray-300 dark:border-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoSelfieVerificationScreen;
