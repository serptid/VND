// app/page.tsx
'use client' // обязательно для использования useEffect

import { useState } from 'react'
import SearchBar from './components/SearchBox'

export default function HomePage() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <main>
      <div className="p-6 mt-[40px]">
        <SearchBar onSearch={setSearchValue} />
      </div>
      <div className='bg-[#CCD7E0] h-[6px] w-full mt-[50px]'></div>
    </main>
  )
}