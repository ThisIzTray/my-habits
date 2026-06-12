export default function HabitCard({ habit, weekCount, target, onSetCount, weekDates, onReset }) {
  const pct = Math.min(weekCount / target, 1)
  const complete = weekCount >= target

  return (
    <div
      className={`habit-card ${complete ? 'habit-card--complete' : ''}`}
      style={complete ? { borderColor: `${habit.color}80` } : {}}
    >
      <div className="habit-progress-bar" style={{ width: `${Math.round(pct * 100)}%`, background: habit.color }} />
      <div className="habit-top">
        <span className="habit-emoji">{habit.emoji}</span>
        <span className="habit-name">{habit.name}</span>
        <div className="habit-top-right">
          {weekCount > 0 && (
            <button className="habit-reset" onClick={() => onReset(habit.id)} title="Réinitialiser">↺</button>
          )}
          <span className="habit-count" style={complete ? { color: habit.color } : {}}>
            {complete ? '✓' : `${weekCount}/${target}`}
          </span>
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
              onClick={() => onSetCount(habit.id, done ? i : i + 1)}
            >
              {done && <span style={{ color: habit.color }}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
