import { supabase } from './supabase'

export async function getSessionsRange(startDate, endDate) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
  if (error) throw error
  return data
}

export function getLast91Days() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = []
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export function getIntensity(count, maxCount) {
  if (!count || count === 0) return 0
  if (!maxCount || maxCount <= 0) return 1
  const ratio = count / maxCount
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}
