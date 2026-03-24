export const metadata = {
  title: 'Login | UVIP — Automate Your E-Commerce',
  description: 'Sign in to your UVIP account and manage your product imports, supplier integrations, and AI-powered automation tools.',
  keywords: 'UVIP login, e-commerce automation login, supplier management sign in',
  openGraph: {
    title: 'Login | UVIP',
    description: 'Sign in to your UVIP account and automate your e-commerce product management.',
    type: 'website',
    images: [{ url: '/assets/uvip_login_banner.png', width: 1200, height: 630, alt: 'UVIP Login Banner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | UVIP',
    description: 'Sign in to your UVIP account and automate your e-commerce product management.',
    images: ['/assets/uvip_login_banner.png'],
  },

  robots: {
    index: false, // Auth pages should not be indexed
    follow: false,
  },
};

export default function LoginLayout({ children }) {
  return children;
}
