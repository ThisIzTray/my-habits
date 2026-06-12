import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHabits } from './hooks/useHabits'
import { useSessions } from './hooks/useSessions'
import { useWeek } from './hooks/useWeek'
import { useTheme } from './hooks/useTheme'
import Auth from './pages/Auth'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import PasswordResetPage from './pages/PasswordResetPage'
import WeekNav from './components/WeekNav'
import RingSummary from './components/RingSummary'
import HabitCard from './components/HabitCard'
import HabitAdmin from './components/HabitAdmin'
import HeatmapGlobal from './components/HeatmapGlobal'

export default function App() {
  const { user, loading: authLoading, needsPasswordReset, signIn, signUp, sendPasswordReset, updatePassword, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const { weekDates, weekLabel, weekNumber, isCurrentWeek, goPrev, goNext } = useWeek()
  const { habits, loading: habitsLoading, addHabit, editHabit, removeHabit } = useHabits()
  const { toggle, setCount, resetHabit, getWeekCount } = useSessions(weekDates)
  const [showAdmin, setShowAdmin] = useState(false)
  const [page, setPage] = useState('main') // 'main' | 'history' | 'profile' | 'settings'

  if (authLoading) return <div className="loading">Chargement…</div>
  if (!user) return <Auth onSignIn={signIn} onSignUp={signUp} onReset={sendPasswordReset} />
  if (needsPasswordReset) return <PasswordResetPage onUpdate={updatePassword} />

  const goBack = () => setPage('main')

  const totalDone = habits.reduce((sum, h) => sum + getWeekCount(h.id), 0)
  const totalTarget = habits.reduce((sum, h) => sum + h.target_per_week, 0)

  return (
    <div className="app">
      {page === 'history' && (
        <HistoryPage habits={habits} onBack={goBack} />
      )}

      {page === 'profile' && (
        <ProfilePage user={user} onUpdate={updatePassword} onBack={goBack} />
      )}

      {page === 'settings' && (
        <SettingsPage
          theme={theme}
          setTheme={setTheme}
          onManageHabits={() => setShowAdmin(true)}
          onBack={goBack}
        />
      )}

      {page === 'main' && (
        <>
          <WeekNav
            weekLabel={weekLabel}
            weekNumber={weekNumber}
            isCurrentWeek={isCurrentWeek}
            onPrev={goPrev}
            onNext={goNext}
            user={user}
            onProfile={() => setPage('profile')}
            onSettings={() => setPage('settings')}
            onSignOut={signOut}
          />
          <main className="main">
            <RingSummary done={totalDone} total={totalTarget} />

            <div className="section-label" style={{ marginBottom: 12 }}>Cette semaine</div>

            {habitsLoading ? (
              <div className="loading-inline">Chargement…</div>
            ) : habits.length === 0 ? (
              <div className="empty-state">
                <p>Aucun habit pour l'instant.</p>
                <button className="btn-primary" onClick={() => setShowAdmin(true)}>Ajouter mon premier habit</button>
              </div>
            ) : (
              habits.map(h => (
                <HabitCard
                  key={h.id}
                  habit={h}
                  weekCount={getWeekCount(h.id)}
                  target={h.target_per_week}
                  onSetCount={setCount}
                  onReset={resetHabit}
                  weekDates={weekDates}
                />
              ))
            )}

            <HeatmapGlobal habits={habits} onViewHistory={() => setPage('history')} />
          </main>
        </>
      )}

      {showAdmin && (
        <HabitAdmin
          habits={habits}
          onAdd={addHabit}
          onEdit={editHabit}
          onDelete={removeHabit}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  )
}
