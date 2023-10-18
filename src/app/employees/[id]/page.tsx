"use client";
import QRCode from "./qrcode";

export default function GenerateQRPage({
  params,
  searchParams,
}: {
  params: { id: number; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="card shadow-lg">
        <div className="card-body flex items-center justify-center">
          <QRCode id={id} />
        </div>
        <div className="card-footer flex items-center justify-center pb-5">
          <h1 className="font-bold text-xl">SCAN THE QR OF THE EMPLOYEE</h1>
        </div>
      </div>
    </div>
  );
}
