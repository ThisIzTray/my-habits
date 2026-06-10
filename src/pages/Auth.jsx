import { useState } from 'react'

export default function Auth({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onSignIn(email)
      setSent(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">◈</div>
        <h1 className="auth-title">Habits</h1>
        <p className="auth-sub">Ton tracker personnel</p>
        {sent ? (
          <div className="auth-sent">
            <div className="auth-sent-icon">✉️</div>
            <p>Lien envoyé à <strong>{email}</strong></p>
            <p className="auth-sent-hint">Vérifie ta boîte mail et clique sur le lien pour te connecter.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="ton@email.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Envoi…' : 'Recevoir le lien de connexion'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
