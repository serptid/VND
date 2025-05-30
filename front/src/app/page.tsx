'use client'

import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBox'
import { FiClipboard } from 'react-icons/fi'
import { useAlphabetFilter } from './components/useAlphabetFilter'
import ThemeToggle from './components/ThemeToggle'

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
    fetch('api/abbreviations/')
      .then(res => res.json())
      .then((data: { short: string; description?: string; example?: string }[]) => {
        const mapped = data.map((item) => ({
          term: item.short,
          description: item.description || '—',
          example: item.example || '—',
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
    <div className="min-h-screen flex flex-col bg-[#f5faff] dark:bg-[#0d1117] dark:text-white transition-colors duration-300">
      <ThemeToggle />

      <main className="flex-grow px-4 md:px-[80px] py-6 max-w-6xl mx-auto">
        <SearchBar onSearch={setSelectedTerm} />

        <div className="my-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Найти по алфавиту</h2>
          <div className="grid grid-cols-16 md:grid-cols-8 gap-2 max-w-[500px] md:max-w-[1000px]">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 rounded-md font-medium transition text-sm md:text-base ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600'
                }`}
              >
                {letter}
              </button>
            ))}
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="col-span-2 px-3 py-1 rounded-md bg-red-100 dark:bg-red-400 text-red-600 dark:text-white hover:bg-red-200 dark:hover:bg-red-500"
              >
                Сброс
              </button>
            )}
          </div>
        </div>

        {selectedItem && (
          <div
            id="selected-card"
            className="mb-8 bg-[#E6EFF6] dark:bg-gray-800 border-l-4 border-blue-500 px-6 py-4 rounded-lg shadow-inner"
          >
            <h3 className="text-lg text-blue-700 dark:text-blue-300 font-bold uppercase mb-2">
              {selectedItem.term}
            </h3>
            <div className="flex items-start gap-2 text-black dark:text-white text-base">
              <FiClipboard className="text-[#0067BA] dark:text-blue-400 mt-[2px]" />
              <span>{selectedItem.description}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 italic">
              Пример использования: {selectedItem.example}
            </p>
          </div>
        )}

        {loading && <p className="text-center text-gray-500 dark:text-gray-300 text-lg">Загрузка...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.term)}
              className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <h3 className="text-blue-700 dark:text-blue-300 text-xl font-bold mb-2">{item.term}</h3>
              <p className="text-gray-800 dark:text-gray-200 mb-2">{item.description}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">Пример: {item.example}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
