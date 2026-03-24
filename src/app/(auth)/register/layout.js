export const metadata = {
  title: 'Create Account | UVIP — Start Automating Your E-Commerce',
  description: 'Create your free UVIP account and start automating product imports, managing suppliers, and scaling your e-commerce store without limits.',
  keywords: 'UVIP register, e-commerce automation sign up, supplier management account, free plan',
  openGraph: {
    title: 'Create Account | UVIP',
    description: 'Start your free UVIP account and automate your e-commerce product management from day one.',
    type: 'website',
    images: [{ url: '/assets/uvip_login_banner.png', width: 1200, height: 630, alt: 'UVIP Registration Banner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Account | UVIP',
    description: 'Start your free UVIP account and automate your e-commerce product management from day one.',
    images: ['/assets/uvip_login_banner.png'],
  },

  robots: {
    index: false, // Auth pages should not be indexed
    follow: false,
  },
};

export default function RegisterLayout({ children }) {
  return children;
}
