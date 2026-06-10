export default function RingSummary({ done, total }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const circumference = 188.5
  const offset = circumference - (pct / 100) * circumference
  const status = pct === 0 ? 'En attente…' : pct < 50 ? "C'est parti" : pct < 80 ? 'En route' : pct < 100 ? 'Presque là' : 'Semaine solide'

  return (
    <div className="ring-section">
      <div className="ring-wrap">
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="36" cy="36" r="30" fill="none" stroke="var(--surface2)" strokeWidth="5" />
          <circle
            cx="36" cy="36" r="30" fill="none"
            stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset .5s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div className="ring-center">
          <span className="ring-pct">{pct}%</span>
          <span className="ring-sub">semaine</span>
        </div>
      </div>
      <div className="ring-meta">
        <div className="ring-status">{status}</div>
        <div className="ring-detail">{done} / {total} sessions</div>
        {pct === 100 && <div className="ring-badge">✓ Semaine complète</div>}
      </div>
    </div>
  )
}
