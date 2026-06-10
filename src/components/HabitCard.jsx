export default function HabitCard({ habit, weekCount, target, onToggle, weekDates, onReset }) {
  const pct = Math.min(weekCount / target, 1)

  return (
    <div className={`habit-card ${weekCount >= target ? 'habit-card--complete' : ''}`}>
      <div className="habit-progress-bar" style={{ width: `${Math.round(pct * 100)}%`, background: habit.color }} />
      <div className="habit-top">
        <span className="habit-emoji">{habit.emoji}</span>
        <span className="habit-name">{habit.name}</span>
        <div className="habit-top-right">
          <span className="habit-count">{weekCount}/{target}</span>
          {weekCount > 0 && (
            <button className="habit-reset" onClick={() => onReset(habit.id)} title="Réinitialiser">↺</button>
          )}
        </div>
      </div>
      <div className="habit-pips">
        {Array.from({ length: target }, (_, i) => {
          const done = i < weekCount
          return (
            <button
              key={i}
              className={`pip ${done ? 'pip--done' : ''}`}
              style={done ? { background: `${habit.color}22`, borderColor: habit.color } : {}}
              onClick={() => onToggle(habit.id, weekDates[0], weekCount, target)}
            >
              {done && <span style={{ color: habit.color }}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
