// hooks/useAlphabetFilter.ts
import { useState, useMemo, ReactNode } from 'react'

interface Abbreviation {
  example: ReactNode
  term: string
  description: string
}

export function useAlphabetFilter(dataList: Abbreviation[]) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const filteredList = useMemo(() => {
    if (!selectedLetter) return dataList
    return dataList.filter(item => item.term.startsWith(selectedLetter))
  }, [selectedLetter, dataList])

  return {
    selectedLetter,
    setSelectedLetter,
    filteredList
  }
}