import Image from 'next/image'
import { FiUser, FiEye } from 'react-icons/fi'

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a
            href="https://esa.dvfu.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FiUser className="text-xl mr-2" />
            <span className="hidden sm:inline font-medium">Личный кабинет</span>
          </a>

          <div className="flex items-center">
            <Image src="/logo2.svg" alt="ДВФУ" width={48} height={48} className="rounded-md mr-2" />
            <div className="text-blue-800 font-bold text-lg">
              ДВФУ
              <div className="text-sm font-normal text-gray-700 leading-tight">ДАЛЬНЕВОСТОЧНЫЙ ФЕДЕРАЛЬНЫЙ УНИВЕРСИТЕТ</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-blue-600 font-medium">RU</button>
            <span className="text-gray-400">|</span>
            <button className="text-gray-400 hover:text-blue-600">EN</button>
          </div>
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <FiEye className="text-lg mr-1" />
            <span className="hidden sm:inline">Версия для слабовидящих</span>
          </button>
        </div>
      </div>
      <div className="w-full h-[2px] bg-blue-600"></div>
    </header>
  )
}