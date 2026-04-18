import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Odlotowe Animacje',
  description:
    'Tworzymy odlotowe wspomnienia, które zostają na długo! Animacje dla dzieci, imprezy rodzinne, szkolne i firmowe. Mobilnie — Biała Podlaska i okolice.',
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
