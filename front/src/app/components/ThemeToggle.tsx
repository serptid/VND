// components/ThemeToggle.tsx
'use client'

import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const className = 'dark'
    const bodyClass = document.documentElement.classList
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme === 'dark') {
      bodyClass.add(className)
      setIsDark(true)
    } else {
      bodyClass.remove(className)
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const className = 'dark'
    const bodyClass = document.documentElement.classList

    if (isDark) {
      bodyClass.remove(className)
      localStorage.setItem('theme', 'light')
    } else {
      bodyClass.add(className)
      localStorage.setItem('theme', 'dark')
    }
    setIsDark(!isDark)
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Переключить тему"
    >
      {isDark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-blue-500" />}
    </button>
  )
}
