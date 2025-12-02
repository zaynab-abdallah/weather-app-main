import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Weather App - Get Accurate Weather Forecasts',
  description: 'Weather app with detailed forecasts, favorites, location comparison, and more',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#1e1b4b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

