'use client'

import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

interface SearchBarProps {
  onSearch: (value: string) => void
}

interface Abbreviation {
  short: string
  description: string
  example: string
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(() => {
      fetch(`http://localhost:8000/abbreviations/search?query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          const mapped = data.map((item: any) => item.short)
          setSuggestions(mapped.slice(0, 5))
        })
        .catch(() => setSuggestions([]))
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    onSearch('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (term: string) => {
    setQuery(term)
    setSuggestions([])
    setShowSuggestions(false)
    onSearch(term)
  }

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <div className="flex items-center border border-blue-500 rounded-full px-4 py-2 bg-blue-50 w-full h-[50px]">
        <FiSearch className="text-blue-500 mr-2" />
        <input
          type="text"
          placeholder="Введите аббревиатуру для поиска..."
          className="flex-grow bg-transparent focus:outline-none text-black"
          value={query}
          onChange={handleChange}
          onFocus={() => query && setShowSuggestions(true)}
        />
        {query && (
          <button onClick={handleClear} type="button">
            <FiX className="text-blue-500 ml-2" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-blue-100 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((term, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(term)}
              className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer text-gray-800"
            >
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}