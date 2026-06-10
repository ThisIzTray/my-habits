import { useState, useMemo } from 'react'

function getISOWeek(d) {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  const week1 = new Date(date.getFullYear(), 0, 4)
  return 1 + Math.round(((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

function getMondayOfWeek(offset = 0) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const day = d.getDay() || 7
  d.setDate(d.getDate() - day + 1 + offset * 7)
  return d
}

export function useWeek() {
  const [offset, setOffset] = useState(0)

  const weekDates = useMemo(() => {
    const monday = getMondayOfWeek(offset)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return d.toISOString().split('T')[0]
    })
  }, [offset])

  const weekLabel = useMemo(() => {
    const fmt = d => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    return `${fmt(weekDates[0])} — ${fmt(weekDates[6])}`
  }, [weekDates])

  const weekNumber = useMemo(() => {
    return `S${String(getISOWeek(new Date(weekDates[0]))).padStart(2, '0')}`
  }, [weekDates])

  const isCurrentWeek = offset === 0

  return {
    weekDates,
    weekLabel,
    weekNumber,
    offset,
    isCurrentWeek,
    goNext: () => setOffset(o => Math.min(o + 1, 0)),
    goPrev: () => setOffset(o => o - 1),
  }
}
