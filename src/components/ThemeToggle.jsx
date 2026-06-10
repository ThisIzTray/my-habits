export default function ThemeToggle({ theme, setTheme }) {
  const options = [
    { value: 'auto', label: 'Auto' },
    { value: 'light', label: '☀️' },
    { value: 'dark', label: '🌙' },
  ]
  return (
    <div className="theme-toggle">
      {options.map(o => (
        <button
          key={o.value}
          className={`theme-btn ${theme === o.value ? 'theme-btn--active' : ''}`}
          onClick={() => setTheme(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
