// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from "@/app/components/Header"

export const metadata = {
  title: 'Моё простое приложение',
  description: 'Создано с помощью Next.js',
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
