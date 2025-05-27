// app/page.tsx
'use client' // обязательно для использования useEffect

import { useState } from 'react'
import SearchBar from './components/SearchBox'
import { FiClipboard, FiUser, FiLink, FiTerminal   } from 'react-icons/fi'

const dataList = [
  { term: "Текст 1", example: "Пример использования 1" },
  { term: "Текст 2", example: "Пример использования 2" },
  { term: "Текст 3", example: "Пример использования 3" },
];

export default function HomePage() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="p-6 mt-[20px]">
          <SearchBar onSearch={setSearchValue} />
        </div>
        <div className='bg-[#CCD7E0] h-[6px] w-full mt-[20px]'></div>
        <div className="px-4 md:px-[80px] mt-[20px]">
        {/* Заголовки для десктопа */}
        <div className="hidden md:flex gap-6 mb-2">
          <p className="flex-1 font-bold font-montserrat text-[32px] text-[#0067BA]">Словарь</p>
          <p className="flex-1 font-bold font-montserrat text-[32px] text-[#0067BA]">Примеры использования</p>
        </div>

        {/* Контент */}
        <div className="flex flex-col gap-6">
          {dataList.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              {/* Слово */}
              <div className="flex-1">
                {/* Только на mobile — заголовок для Словаря */}
                <p className="md:hidden font-bold font-montserrat text-[20px] text-[#0067BA] mb-2">Слово</p>
                <div className="bg-[#E6EFF6] rounded-[20px] px-6 py-4">
                  <div className="flex items-start gap-2 text-black">
                    <span className="text-[#0067BA] font-bold">{index + 1}</span>
                    <span className="break-words">{item.term}</span>
                  </div>
                </div>
              </div>

              {/* Пример */}
              <div className="flex-1">
                {/* Только на mobile — заголовок для Примера */}
                <p className="md:hidden font-bold font-montserrat text-[20px] text-[#0067BA] mb-2">Пример использования</p>
                <div className="bg-[#E6EFF6] rounded-[20px] px-6 py-4">
                  <div className="flex items-start gap-2 text-black">
                    <FiClipboard className="text-[#0067BA] mt-[2px]" />
                    <span className="break-words">{item.example}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>
      <footer className="bg-[#E6EFF6] border-t-2 border-[#CCD7E0] w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 px-4 md:px-[80px] py-4 md:h-[130px]">
        {/* Левая часть */}
        <div className="text-sm text-black">
          © 2025
        </div>

        {/* Правая часть */}
        <div className="border border-gray-400 px-4 py-2 text-sm text-black rounded bg-white w-full md:w-[290px]">
          <p className="font-semibold mb-2">Контактные данные</p>
          <div className="flex flex-col gap-2 text-[#0067BA]">
            <a href="https://t.me/ProkopenkoSR" className="flex items-center gap-2 hover:underline">
              <FiUser />
              <span>Telegram</span>
            </a>
            <a href="https://github.com/serptid/VND" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <FiLink />
              <span>GitHub</span>
            </a>
            <a href="https://t.me/imctech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <FiTerminal />
              <span>IMTech</span>
            </a>
          </div>
        </div>
      </footer>
    </div> 
  )
}