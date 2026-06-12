import { useState, useRef, useEffect } from 'react'

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function UserMenu({ user, onProfile, onSettings, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onOutside(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open])

  function pick(fn) {
    fn()
    setOpen(false)
  }

  return (
    <div className="user-menu" ref={ref}>
      <button className="user-avatar" onClick={() => setOpen(v => !v)} aria-label="Menu utilisateur">
        <UserIcon />
      </button>
      {open && (
        <div className="user-dropdown">
          <button className="dropdown-item" onClick={() => pick(onProfile)}>Profil</button>
          <button className="dropdown-item" onClick={() => pick(onSettings)}>Réglages</button>
          <button className="dropdown-item dropdown-item--danger" onClick={onSignOut}>Déconnexion</button>
        </div>
      )}
    </div>
  )
}
