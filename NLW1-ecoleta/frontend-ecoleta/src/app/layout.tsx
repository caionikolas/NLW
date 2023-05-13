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
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
