'use client';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const isDevelopmentRun = process.env.NODE_ENV === 'production';

export default function Scanner({ event_id }: { event_id: number }) {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(true);
  const isMountedRef = useRef(isDevelopmentRun);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return undefined;
    }
    async function onScanSuccess(result: string) {
      if (isScannerActive) {
        setIsScannerActive(false);
        scanner.pause();
        setScanResult(result);
        const employee_id = result;
        const response = await fetch('/api/server/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employee_id: employee_id,
            event_id: event_id,
          }),
        });

        const responseData = await response.json();

        responseData.error
          ? toast.error(`${responseData.error}`)
          : toast.success(
              `Employee successfully registered to event ${event_id}`
            );

        router.refresh();
        setTimeout(() => {
          setIsScannerActive(true);
          scanner.resume();
        }, 5000);
      }
    }

    function onScanFailure(error: any) {}

    const scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 20, qrbox: { width: 300, height: 300 } },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);
  }, []);

  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      <div id="reader" className="w-1/4 bg-no-repeat"></div>
    </div>
  );
}
