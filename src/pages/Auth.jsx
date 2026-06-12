import { useState } from 'react'
import { translateAuthError } from '../lib/authErrors'

export default function Auth({ onSignIn, onSignUp, onReset }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'reset'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function switchMode(next) {
    setMode(next)
    setError(null)
    setDone(false)
    setPassword('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (mode === 'login') {
        await onSignIn(email, password)
      } else if (mode === 'signup') {
        await onSignUp(email, password)
        setDone(true)
      } else {
        await onReset(email)
        setDone(true)
      }
    } catch (err) {
      setError(translateAuthError(err.message))
    } finally {
      setLoading(false)
    }
  }

  const titles = { login: 'Connexion', signup: 'Créer un compte', reset: 'Mot de passe oublié' }
  const btnLabels = { login: 'Se connecter', signup: 'Créer le compte', reset: 'Envoyer le lien' }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">◈</div>
        <h1 className="auth-title">My Habits</h1>
        <p className="auth-sub">{titles[mode]}</p>

        {done ? (
          <div className="auth-sent">
            <div className="auth-sent-icon">{mode === 'signup' ? '✉️' : '🔑'}</div>
            <p>{mode === 'signup'
              ? <>Compte créé ! Vérifie <strong>{email}</strong> pour confirmer.</>
              : <>Lien envoyé à <strong>{email}</strong>.</>
            }</p>
            <p className="auth-sent-hint">
              {mode === 'signup'
                ? 'Clique sur le lien dans l\'email pour activer ton compte.'
                : 'Clique sur le lien pour choisir un nouveau mot de passe.'}
            </p>
            <button className="auth-link" onClick={() => switchMode('login')} style={{ marginTop: 16 }}>
              Retour à la connexion
            </button>
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
              autoComplete="email"
            />
            {mode !== 'reset' && (
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="auth-input"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={6}
              />
            )}
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? '…' : btnLabels[mode]}
            </button>

            <div className="auth-links">
              {mode === 'login' && <>
                <button type="button" className="auth-link" onClick={() => switchMode('reset')}>
                  Mot de passe oublié ?
                </button>
                <button type="button" className="auth-link" onClick={() => switchMode('signup')}>
                  Créer un compte
                </button>
              </>}
              {(mode === 'signup' || mode === 'reset') && (
                <button type="button" className="auth-link" onClick={() => switchMode('login')}>
                  ← Retour à la connexion
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
