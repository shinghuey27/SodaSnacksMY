import type { Metadata } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-pixel'
});

const siteUrl = 'https://sodasnacks.my'
const title = 'SodaSnacks - Digital Studio'
const description = 'Small digital studio specializing in web app development, admin systems, and custom business solutions.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'SodaSnacks',
    'digital studio Malaysia',
    'freelancer KL',
    'web app development',
    'admin system development',
    'custom business solutions',
    'web developer Malaysia',
    'ERPNext Customization'
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'SodaSnacks',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SodaSnacks',
  url: siteUrl,
  logo: `${siteUrl}/pixel-logo.png`,
  description,
  email: 'iwantsodasnacks@gmail.com',
  telephone: '+601137652814',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MY',
  },
  areaServed: ['Kuala Lumpur', 'Malaysia'],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Web App Development',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Admin System Development',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'ERPNext Customization',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${pressStart.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
