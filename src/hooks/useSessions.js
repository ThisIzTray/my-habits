import { useState, useEffect, useCallback } from 'react'
import { getSessionsForWeek, upsertSession } from '../lib/habits'

export function useSessions(weekDates) {
  const [sessions, setSessions] = useState({})
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!weekDates?.length) return
    try {
      setLoading(true)
      const data = await getSessionsForWeek(weekDates[0], weekDates[6])
      const map = {}
      data.forEach(s => { map[`${s.habit_id}_${s.date}`] = s.count })
      setSessions(map)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [weekDates])

  useEffect(() => { load() }, [load])

  async function toggle(habitId, date, currentCount, target) {
    const key = `${habitId}_${date}`
    const current = sessions[key] || 0
    const next = current < target ? current + 1 : 0
    setSessions(prev => ({ ...prev, [key]: next }))
    try {
      await upsertSession(habitId, date, next)
    } catch (e) {
      setSessions(prev => ({ ...prev, [key]: current }))
    }
  }

  async function resetHabit(habitId) {
    const key = `${habitId}_${weekDates[0]}`
    setSessions(prev => ({ ...prev, [key]: 0 }))
    try {
      await upsertSession(habitId, weekDates[0], 0)
    } catch (e) {
      load()
    }
  }

  function getCount(habitId, date) {
    return sessions[`${habitId}_${date}`] || 0
  }

  async function setCount(habitId, newCount) {
    const key = `${habitId}_${weekDates[0]}`
    const prev = sessions[key] || 0
    setSessions(s => ({ ...s, [key]: newCount }))
    try {
      await upsertSession(habitId, weekDates[0], newCount)
    } catch (e) {
      setSessions(s => ({ ...s, [key]: prev }))
    }
  }

  function getWeekCount(habitId) {
    return sessions[`${habitId}_${weekDates[0]}`] || 0
  }

  return { sessions, loading, toggle, setCount, resetHabit, getCount, getWeekCount, reload: load }
}
