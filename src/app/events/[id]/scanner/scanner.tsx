"use client";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const isDevelopmentRun = process.env.NODE_ENV === "production";

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
        const response = await fetch("/api/server/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

    const isSmallScreen = window.innerWidth <= 640;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 20,
        qrbox: {
          width: isSmallScreen ? 200 : 400,
          height: isSmallScreen ? 200 : 400,
        },
      },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        QR Code Scanner
      </div>
      <div
        id="reader"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-no-repeat"
      ></div>
    </div>
  );
}
