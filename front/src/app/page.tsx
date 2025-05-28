'use client'

import { useState } from 'react'
import SearchBar from './components/SearchBox'
import { FiClipboard, FiUser, FiLink, FiTerminal } from 'react-icons/fi'

const dataList = [
  { term: "АКЦИЯ", example: "Ценная бумага, удостоверяющая право её владельца на долю в капитале..." },
  { term: "БЕНЕФИЦИАР", example: "Лицо, которому предназначен доход или выгода..." },
  { term: "ИНФЛЯЦИЯ", example: "Рост общего уровня цен на товары и услуги..." },
]

const searchHistory = dataList.slice(0, 2)

export default function HomePage() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  const selectedItem = dataList.find(item =>
    item.term.toLowerCase() === selectedTerm?.toLowerCase()
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#a0a0a013]">
      <main className="flex-grow">
        <div className="p-6 mt-[15px]">
          <SearchBar onSearch={setSelectedTerm} />
        </div>
        <div className='bg-[#CCD7E0] h-[6px] w-full mt-[15px]'></div>

        <div className="px-4 md:px-[80px] mt-[20px]">
          <nav className="flex flex-col md:flex-row gap-6 justify-between">
            {/* Блок: Расшифровка выбранной аббревиатуры */}
            <div className="flex-1 flex flex-col gap-6">
              {selectedItem ? (
                <div className="bg-[#E6EFF6] border-[1px] border-blue-500 rounded-[20px] px-6 py-4">
                  <div className="flex items-start gap-2 text-black mb-2">
                    <span className="text-[#0067BA] font-bold uppercase">{selectedItem.term}</span>
                  </div>
                  <div className="flex items-start gap-2 text-black">
                    <FiClipboard className="text-[#0067BA] mt-[2px]" />
                    <span className="break-words">{selectedItem.example}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Выберите аббревиатуру или воспользуйтесь поиском</p>
              )}
            </div>

            {/* Блок: Список всех аббревиатур */}
            <div className="w-full md:w-[300px] bg-white shadow-md rounded-[12px] p-4 h-fit">
              <p className="font-bold text-[#0067BA] mb-2">Список всех аббревиатур</p>
              <ul className="list-disc list-inside text-[#333]">
                {searchHistory.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedTerm(term.term)}
                      className="text-[#0067BA] hover:underline text-left"
                    >
                      {term.term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </main>

      <footer className="bg-[#E6EFF6] border-t-2 border-[#CCD7E0] w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 px-4 md:px-[80px] py-4 md:h-[130px]">
        <div className="text-sm text-black">© 2025</div>

        <div className="shadow-md px-4 py-2 text-sm text-black rounded bg-white w-full md:w-[290px]">
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
