import { useState, useEffect } from 'react'
import { getSessionsRange, getLast91Days } from '../lib/heatmap'
import Heatmap from './Heatmap'

export default function HeatmapGlobal({ habits, onViewHistory }) {
  const [values, setValues] = useState({})
  const days = getLast91Days()
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    getSessionsRange(days[0], days[days.length - 1])
      .then(sessions => {
        const map = {}
        sessions.forEach(s => {
          map[s.date] = (map[s.date] || 0) + s.count
        })
        setValues(map)
      })
      .catch(console.error)
  }, [])

  const dailyTarget = Math.max(1, habits.reduce((s, h) => s + h.target_per_week, 0) / 7)

  return (
    <div className="heatmap-global" onClick={onViewHistory} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onViewHistory()}>
      <div className="section-label" style={{ marginBottom: 8 }}>Historique</div>
      <Heatmap days={days} values={values} maxValue={dailyTarget} today={today} />
      <div className="heatmap-hint">Voir tout →</div>
    </div>
  )
}
