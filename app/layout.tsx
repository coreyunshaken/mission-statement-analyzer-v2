import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mission Statement Analyzer | The Unshaken Leader',
  description: 'Score your mission statement against Fortune 500 standards. Free instant analysis based on academic research from Harvard Business School and Wharton.',
  keywords: 'mission statement, mission analyzer, company mission, Fortune 500, business strategy',
  authors: [{ name: 'The Unshaken Leader' }],
  openGraph: {
    title: 'Mission Statement Analyzer',
    description: 'Score your mission statement against Fortune 500 standards',
    url: 'https://mission.theunshakenleader.com',
    siteName: 'The Unshaken Leader',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
