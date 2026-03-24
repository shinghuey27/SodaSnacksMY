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

export const metadata: Metadata = {
  title: 'SodaSnacks - Digital Studio',
  description: 'Small digital studio specializing in web app development, admin systems, and custom business solutions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
