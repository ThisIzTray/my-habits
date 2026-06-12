import ThemeToggle from '../components/ThemeToggle'

export default function SettingsPage({ theme, setTheme, onManageHabits, onBack }) {
  return (
    <div className="history-page">
      <div className="history-page-header">
        <button className="back-btn" onClick={onBack}>← Retour</button>
        <h2 className="history-page-title">Réglages</h2>
      </div>

      <div className="profile-section">
        <div className="section-label" style={{ marginBottom: 10 }}>Apparence</div>
        <div className="profile-card">
          <div className="settings-row">
            <span className="profile-label">Thème</span>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-label" style={{ marginBottom: 10 }}>Habits</div>
        <div className="profile-card">
          <button className="settings-action" onClick={onManageHabits}>
            Gérer mes habits
            <span className="settings-action-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
