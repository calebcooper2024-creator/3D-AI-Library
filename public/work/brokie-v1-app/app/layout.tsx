import type {Metadata} from 'next';
import { Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Brokie | Intelligence should not cost a fortune',
  description: 'Premium token compression for multi-agent workflows.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jetbrains.variable}`}>
      <body suppressHydrationWarning className="bg-[#0A0A0F] text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
