import { useState } from 'react'
import { translateAuthError } from '../lib/authErrors'

export default function PasswordResetPage({ onUpdate }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    setLoading(true)
    setError(null)
    try {
      await onUpdate(password)
    } catch (err) {
      setError(translateAuthError(err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">◈</div>
        <h1 className="auth-title">Habits</h1>
        <p className="auth-sub">Nouveau mot de passe</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="auth-input"
            autoComplete="new-password"
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            className="auth-input"
            autoComplete="new-password"
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? '…' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  )
}
