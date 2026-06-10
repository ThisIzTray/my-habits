import { useState, useEffect, useCallback } from 'react'
import { getHabits, createHabit, updateHabit, deleteHabit } from '../lib/habits'

export function useHabits() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getHabits()
      setHabits(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function addHabit(habit) {
    const next = await createHabit({ ...habit, position: habits.length })
    setHabits(prev => [...prev, next])
  }

  async function editHabit(id, updates) {
    const next = await updateHabit(id, updates)
    setHabits(prev => prev.map(h => h.id === id ? next : h))
  }

  async function removeHabit(id) {
    await deleteHabit(id)
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  return { habits, loading, error, addHabit, editHabit, removeHabit, reload: load }
}
