import { useState, useEffect } from 'react'
import { getFirstHabitDate } from '../lib/habits'
import { translateAuthError } from '../lib/authErrors'

export default function ProfilePage({ user, onUpdate, onBack }) {
  const [firstDate, setFirstDate] = useState(null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getFirstHabitDate().then(setFirstDate)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await onUpdate(password)
      setSuccess(true)
      setPassword('')
      setConfirm('')
    } catch (err) {
      setError(translateAuthError(err.message))
    } finally {
      setLoading(false)
    }
  }

  const memberSince = firstDate
    ? new Date(firstDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="history-page">
      <div className="history-page-header">
        <button className="back-btn" onClick={onBack}>← Retour</button>
        <h2 className="history-page-title">Profil</h2>
      </div>

      <div className="profile-section">
        <div className="section-label" style={{ marginBottom: 10 }}>Compte</div>
        <div className="profile-card">
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
          {memberSince && (
            <div className="profile-row">
              <span className="profile-label">Premier habit</span>
              <span className="profile-value">{memberSince}</span>
            </div>
          )}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-label" style={{ marginBottom: 10 }}>Modifier le mot de passe</div>
        <form onSubmit={handleSubmit} className="profile-card profile-card--form">
          <div className="form-row">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <div className="form-row">
            <label>Confirmer</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          {success && <p className="profile-success">Mot de passe mis à jour.</p>}
          <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 'none' }}>
            {loading ? '…' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  )
}
