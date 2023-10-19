import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProvider from '@/components/session-provider';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import NavMenu from '@/components/nav-menu';
const inter = Inter({ subsets: ['latin'] });
import toast, { Toaster } from 'react-hot-toast';
import { chdir } from 'process';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <SessionProvider session={session}>
          <main className='flex'>
            <NavMenu/>
            <div className='w-full h-screen'>
            {children}
            </div>
          </main>
        </SessionProvider>
      
      </body>
    </html>
  );
}
