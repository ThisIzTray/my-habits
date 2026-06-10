import UserMenu from './UserMenu'

export default function WeekNav({ weekLabel, weekNumber, isCurrentWeek, onPrev, onNext, user, theme, setTheme, onManageHabits, onSignOut }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Habits</h1>
        <div className="header-week">{weekLabel}</div>
      </div>
      <div className="header-right">
        <div className="week-nav">
          <button className="week-btn" onClick={onPrev}>‹</button>
          <span className="week-num">{weekNumber}</span>
          <button className="week-btn" onClick={onNext} disabled={isCurrentWeek}>›</button>
        </div>
        <UserMenu
          user={user}
          theme={theme}
          setTheme={setTheme}
          onManageHabits={onManageHabits}
          onSignOut={onSignOut}
        />
      </div>
    </header>
  )
}
