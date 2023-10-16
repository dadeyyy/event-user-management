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
        width: 150,
        color: {
          dark: '#135080',
          light: '#FFFFFF',
        },
      }}
    />
  )
}