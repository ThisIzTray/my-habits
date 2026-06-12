import { supabase } from './supabase'

// --- HABITS CRUD ---
export async function getHabits() {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('active', true)
    .order('position')
  if (error) throw error
  return data
}

export async function createHabit(habit) {
  const { data, error } = await supabase
    .from('habits')
    .insert(habit)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateHabit(id, updates) {
  const { data, error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteHabit(id) {
  const { error } = await supabase
    .from('habits')
    .update({ active: false })
    .eq('id', id)
  if (error) throw error
}

// --- SESSIONS CRUD ---
export async function getSessionsForWeek(weekStart, weekEnd) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .gte('date', weekStart)
    .lte('date', weekEnd)
  if (error) throw error
  return data
}

export async function upsertSession(habitId, date, count) {
  const { data, error } = await supabase
    .from('sessions')
    .upsert({ habit_id: habitId, date, count }, { onConflict: 'habit_id,date' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getSessionsForDays(days) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .in('date', days)
  if (error) throw error
  return data
}

export async function getFirstHabitDate() {
  const { data, error } = await supabase
    .from('habits')
    .select('created_at')
    .order('created_at', { ascending: true })
    .limit(1)
    .single()
  if (error) return null
  return data?.created_at ?? null
}

export async function deleteSessionsForHabitWeek(habitId, weekStart, weekEnd) {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('habit_id', habitId)
    .gte('date', weekStart)
    .lte('date', weekEnd)
  if (error) throw error
}
