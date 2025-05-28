'use client'

import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [query, setQuery] = useState('')

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="flex items-center border border-blue-500 rounded-full px-4 py-2 bg-blue-50 w-full max-w-[1000px] h-[50px] mx-auto">
      <FiSearch className="text-blue-500 mr-2" />
      <input
        type="text"
        placeholder="Введите аббревиатуру для поиска..."
        className="flex-grow bg-transparent focus:outline-none text-black"
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button onClick={handleClear} type="button">
          <FiX className="text-blue-500 ml-2" />
        </button>
      )}
    </div>
  )
}
