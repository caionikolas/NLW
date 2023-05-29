/* ============ App ===============  */

import './globals.css'
import { Roboto } from 'next/font/google'
import { Ubuntu } from 'next/font/google'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight:'400'
})

const ubuntu = Ubuntu({ 
  subsets: ['latin'],
  weight:
    '400'
})

export const metadata = {
  title: 'Ecoleta',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""/>
      </head>
      <body className={ubuntu.className}>{children}</body>
    </html>
  )
}
