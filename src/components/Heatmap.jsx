import { getIntensity } from '../lib/heatmap'

export default function Heatmap({ days, values, maxValue = 1, color, today }) {
  return (
    <div className="heatmap-grid">
      {days.map(date => {
        const v = values[date] || 0
        const intensity = getIntensity(v, maxValue)
        const isToday = date === today

        const style = {}
        if (intensity > 0 && color) {
          const alphas = ['', '40', '70', 'a0', 'ff']
          style.background = `${color}${alphas[intensity]}`
        }

        return (
          <div
            key={date}
            className={`heatmap-cell heatmap-cell--${intensity}${isToday ? ' heatmap-cell--today' : ''}`}
            style={style}
            title={new Date(date + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          />
        )
      })}
    </div>
  )
}
