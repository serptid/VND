'use client'

import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBox'
import { FiClipboard } from 'react-icons/fi'
import { useAlphabetFilter } from './components/useAlphabetFilter'

interface Abbreviation {
  term: string
  description: string
  example: string
}

export default function HomePage() {
  const [dataList, setDataList] = useState<Abbreviation[]>([])
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { selectedLetter, setSelectedLetter, filteredList } = useAlphabetFilter(dataList)

  useEffect(() => {
    fetch('http://localhost:8000/abbreviations/')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((item: any) => ({
          term: item.short,
          description: item.description || '—',
          example: item.example || '—'
        }))
        setDataList(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError('Ошибка загрузки данных')
        setLoading(false)
      })
  }, [])

  const selectedItem = filteredList.find(item =>
    item.term.toLowerCase() === selectedTerm?.toLowerCase()
  )

  const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')

  const handleCardClick = (term: string) => {
    setSelectedTerm(term)
    const element = document.getElementById('selected-card')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5faff]">
      <main className="flex-grow px-4 md:px-[80px] py-6 max-w-6xl mx-auto">
        <SearchBar onSearch={setSelectedTerm} fullDataList={[]} />
        <div className="my-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Найти по алфавиту</h2>
          <div className="grid grid-cols-8 gap-2 max-w-[500px]">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 rounded-md font-medium transition text-sm md:text-base ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                }`}
              >
                {letter}
              </button>
            ))}
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="col-span-2 px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
              >
                Сброс
              </button>
            )}
          </div>
        </div>

        {selectedItem && (
          <div id="selected-card" className="mb-8 bg-[#E6EFF6] border-l-4 border-blue-500 px-6 py-4 rounded-lg shadow-inner">
            <h3 className="text-lg text-blue-700 font-bold uppercase mb-2">{selectedItem.term}</h3>
            <div className="flex items-start gap-2 text-black text-base">
              <FiClipboard className="text-[#0067BA] mt-[2px]" />
              <span>{selectedItem.description}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 italic">Пример использования: {selectedItem.example}</p>
          </div>
        )}

        {loading && <p className="text-center text-gray-500 text-lg">Загрузка...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.term)}
              className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <h3 className="text-blue-700 text-xl font-bold mb-2">{item.term}</h3>
              <p className="text-gray-800 mb-2">{item.description}</p>
              <p className="text-gray-500 text-sm italic">Пример: {item.example}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}