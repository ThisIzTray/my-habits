import { useState, useEffect } from 'react'
import { getSessionsRange, getLast91Days } from '../lib/heatmap'
import Heatmap from '../components/Heatmap'

export default function HistoryPage({ habits, onBack }) {
  const [sessions, setSessions] = useState([])
  const days = getLast91Days()
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    getSessionsRange(days[0], days[days.length - 1])
      .then(setSessions)
      .catch(console.error)
  }, [])

  const globalValues = {}
  sessions.forEach(s => {
    globalValues[s.date] = (globalValues[s.date] || 0) + s.count
  })
  const dailyTarget = Math.max(1, habits.reduce((s, h) => s + h.target_per_week, 0) / 7)

  return (
    <div className="history-page">
      <div className="history-page-header">
        <button className="back-btn" onClick={onBack}>← Retour</button>
        <h2 className="history-page-title">Historique</h2>
      </div>

      <div className="history-section">
        <div className="section-label" style={{ marginBottom: 8 }}>Vue globale — 13 semaines</div>
        <Heatmap days={days} values={globalValues} maxValue={dailyTarget} today={today} />
      </div>

      {habits.map(habit => {
        const habitValues = {}
        sessions
          .filter(s => s.habit_id === habit.id)
          .forEach(s => { habitValues[s.date] = s.count })

        return (
          <div key={habit.id} className="history-section">
            <div className="history-habit-label">
              <span className="history-habit-emoji">{habit.emoji}</span>
              <span className="section-label">{habit.name}</span>
            </div>
            <Heatmap
              days={days}
              values={habitValues}
              maxValue={habit.target_per_week}
              color={habit.color}
              today={today}
            />
          </div>
        )
      })}
    </div>
  )
}
