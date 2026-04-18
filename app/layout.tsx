import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Odlotowe Animacje — Twoje wymarzone wydarzenie!',
  description:
    'Profesjonalne animacje dla dzieci na urodziny, wesela, komunie i pikniki. Działamy w Białej Podlaskiej i okolicach. Tworzymy odlotowe wspomnienia!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
