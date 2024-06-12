
import type { Metadata } from 'next';
// eslint-disable-next-line import/order
import { Inter as FontSans } from 'next/font/google';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { auth } from '@/auth';
import { cn } from '@/lib/utils';

// const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Drizzle Auth',
  description: 'NextJS | NextAuth | Drizzle - Template',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <SessionProvider session={session}>
          {children}
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
