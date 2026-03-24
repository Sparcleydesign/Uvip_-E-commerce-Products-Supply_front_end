import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import ScrollToTop from '@/components/ui/ScrollToTop';
import LoadingScreen from '@/components/ui/LoadingScreen';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-next-poppins',
});

export const metadata = {
  title: {
    default: 'UVIP | Automate Your E-Commerce Store',
    template: '%s | UVIP',
  },
  description: 'UVIP automates your e-commerce product management — from multi-vendor imports to AI-powered product descriptions, real-time price sync, and smart duplicate detection. Scale without limits.',
  keywords: [
    'e-commerce automation',
    'product import automation',
    'supplier management',
    'AI product descriptions',
    'OpenCart integration',
    'WooCommerce integration',
    'multi-vendor e-commerce',
    'real-time price sync',
    'UVIP',
  ],
  authors: [{ name: 'UVIP' }],
  metadataBase: new URL('https://uvip.app'),
  openGraph: {
    title: 'UVIP | Automate Your E-Commerce Store',
    description: 'From multi-vendor imports to AI-powered product descriptions — UVIP does it all. Scale your store faster without manual work.',
    type: 'website',
    url: 'https://uvip.app',
    siteName: 'UVIP',
    images: [
      {
        url: '/assets/uvip_login_banner.png',
        width: 1200,
        height: 630,
        alt: 'UVIP — E-Commerce Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UVIP | Automate Your E-Commerce Store',
    description: 'From multi-vendor imports to AI-powered product descriptions — UVIP does it all.',
    images: ['/assets/uvip_login_banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/assets/uvip_favicon_main.png',
    shortcut: '/assets/uvip_favicon_main.png',
    apple: '/assets/uvip_favicon_main.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins bg-cream text-gray-900 antialiased`}>
        <LoadingScreen />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
