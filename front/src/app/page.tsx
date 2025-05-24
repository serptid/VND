// app/page.tsx
'use client' // обязательно для использования useEffect

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [message, setMessage] = useState('Загрузка...')

  useEffect(() => {
    fetch('http://localhost:8000')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error('Ошибка запроса:', err)
        setMessage('Ошибка при подключении к API')
      })
  }, [])

  return (
    <div>
      <h2>Ответ от FastAPI:</h2>
      <p>{message}</p>
    </div>
  )
}