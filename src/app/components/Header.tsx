'use client'

import Image from 'next/image'
import { FiUser } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-blue-500 dark:border-blue-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a
            href="https://esa.dvfu.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <FiUser className="text-xl mr-2" />
            <span className="hidden sm:inline font-medium">Личный кабинет</span>
          </a>

          <div className="flex items-center">
            <Image src="/logo2.svg" alt="ДВФУ" width={48} height={48} className="rounded-md mr-2" />
            <div className="text-blue-800 dark:text-blue-200 font-bold text-lg">
              ДВФУ
              <div className="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight">
                ДАЛЬНЕВОСТОЧНЫЙ ФЕДЕРАЛЬНЫЙ УНИВЕРСИТЕТ
              </div>
            </div>
          </div>
        </div>

        <ThemeToggle />
      </div>
      <div className="w-full h-[2px] bg-blue-600 dark:bg-blue-400"></div>
    </header>
  )
}