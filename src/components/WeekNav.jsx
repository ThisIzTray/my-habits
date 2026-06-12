import UserMenu from './UserMenu'

export default function WeekNav({ weekLabel, weekNumber, isCurrentWeek, onPrev, onNext, user, onProfile, onSettings, onSignOut }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">My Habits</h1>
        <div className="header-week">{weekLabel}</div>
      </div>
      <div className="header-right">
        <div className="week-nav">
          <button className="week-btn" onClick={onPrev}>‹</button>
          <span className="week-num">{weekNumber}</span>
          <button className="week-btn" onClick={onNext} disabled={isCurrentWeek}>›</button>
        </div>
        <UserMenu user={user} onProfile={onProfile} onSettings={onSettings} onSignOut={onSignOut} />
      </div>
    </header>
  )
}
