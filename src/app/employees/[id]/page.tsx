import QRCode from "./qrcode";

export default function GenerateQRPage({
  params,
  searchParams,
}: {
  params: {id: number, slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  
    const {id}= params

  return (
    <>
        <QRCode id={id}/>
    </>
  )
}
