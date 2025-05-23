// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Моё простое приложение',
  description: 'Создано с помощью Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header style={{ padding: '1rem', background: '#eee' }}>
          <h1>Заголовок сайта</h1>
        </header>
        <main style={{ padding: '1rem' }}>{children}</main>
        <footer style={{ padding: '1rem', background: '#eee' }}>
          <p>© 2025</p>
        </footer>
      </body>
    </html>
  )
}
