
import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from 'next/font/google';
import Header from './components/Header';
import { NextAuthProvider } from './lib/next-auth/provider';
import { Suspense } from 'react';
import Loading  from './loading';

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Book commerce",
  description: "次代の開発者になるための一歩を踏み出そう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <NextAuthProvider>
          <Header/>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </NextAuthProvider>
        </body>
    </html>
  );
}
