// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from "@/app/components/Header"


export const metadata = {
  title: 'ДВФУ - Аббревиатуры',
  description: 'Создал Улько Данила',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
