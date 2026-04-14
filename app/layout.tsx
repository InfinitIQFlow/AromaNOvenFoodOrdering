import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aroma Oven - Premium Cloud Kitchen',
  description: 'Order delicious Indian cuisine from Aroma Oven. Fresh, authentic, and delivered fast.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E8D4C0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
