import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vigneshwaran — MERN Stack Developer',
  description: 'Portfolio of Vigneshwaran, a MERN Stack Developer based in Puducherry.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
