import { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function UserMenu({ user, theme, setTheme, onManageHabits, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const initial = user?.email?.[0]?.toUpperCase() ?? '?'

  useEffect(() => {
    if (!open) return
    function onOutside(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open])

  return (
    <div className="user-menu" ref={ref}>
      <button
        className="user-avatar"
        onClick={() => setOpen(v => !v)}
        aria-label="Menu utilisateur"
      >
        {initial}
      </button>
      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-email">{user?.email}</div>
          <button
            className="dropdown-item"
            onClick={() => { onManageHabits(); setOpen(false) }}
          >
            Gérer les habits
          </button>
          <div className="dropdown-theme">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <button className="dropdown-item dropdown-item--danger" onClick={onSignOut}>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  )
}
