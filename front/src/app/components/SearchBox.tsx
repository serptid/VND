'use client'

import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

interface SearchBarProps {
  onSearch: (value: string) => void
  fullDataList: Abbreviation[]
}

interface Abbreviation {
  short: string
  description: string
  example: string
}

export default function SearchBar({ onSearch, fullDataList }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Abbreviation[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(() => {
        fetch(`/api/abbreviations/search?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data: Abbreviation[]) => {
          setSuggestions(data.slice(0, 7))
          setShowSuggestions(true)
        })
        .catch((error) => console.error('Ошибка загрузки подсказок:', error))
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSelect = (value: string) => {
    setQuery(value)
    setShowSuggestions(false)
    onSearch(value)

    const safeId = value.replace(/[^a-zA-Z0-9-_]/g, '-')
    const target = document.getElementById(safeId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    onSearch('')
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center border border-blue-500 rounded-full px-4 py-2 bg-blue-50">
        <FiSearch className="text-blue-500 mr-2" />
        <input
          type="text"
          placeholder="Введите аббревиатуру для поиска..."
          className="flex-grow bg-transparent focus:outline-none text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(true)}
        />
        {query && (
          <button onClick={handleClear} type="button">
            <FiX className="text-blue-500 ml-2" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow max-h-60 overflow-auto">
          {suggestions.map((item, index) => {
            const trueIndex = fullDataList.findIndex((el) => el.short === item.short)
            return (
              <li
                key={index}
                onClick={() => handleSelect(item.short)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black"
              >
                <span className="text-[#0067BA] font-bold mr-2">{trueIndex + 1}.</span>
                <span className="font-semibold text-[#0067BA]">{item.short}</span>{' '}
                <span className="text-sm text-gray-600">— {item.description}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
