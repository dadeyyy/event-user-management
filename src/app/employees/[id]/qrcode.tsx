"use client"
import {useQRCode } from 'next-qrcode'

export default function QRCode({id}:{id:number}) {
    const {Canvas} = useQRCode();

    
  return (
    <Canvas
      text={`${id}`}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 220,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }}
    />
  )
}