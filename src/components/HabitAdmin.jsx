import { useState } from 'react'

const COLORS = ['#2dd4a0', '#f5a623', '#f06a6a', '#6ab0f5', '#b06af5', '#f06ab0', '#a0d42d']
const EMOJIS = ['🖌️', '📖', '🎬', '🎮', '✍️', '🏃', '🎵', '🧘', '💪', '🍳', '📝', '🎯']

function HabitForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || '')
  const [emoji, setEmoji] = useState(initial?.emoji || '🎯')
  const [color, setColor] = useState(initial?.color || COLORS[0])
  const [target, setTarget] = useState(initial?.target_per_week || 3)

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ name, emoji, color, target_per_week: Number(target) })
  }

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <div className="form-row">
        <label>Nom</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Lecture" required />
      </div>
      <div className="form-row">
        <label>Emoji</label>
        <div className="emoji-grid">
          {EMOJIS.map(em => (
            <button type="button" key={em} className={`emoji-btn ${emoji === em ? 'emoji-btn--active' : ''}`} onClick={() => setEmoji(em)}>{em}</button>
          ))}
        </div>
      </div>
      <div className="form-row">
        <label>Couleur</label>
        <div className="color-grid">
          {COLORS.map(c => (
            <button type="button" key={c} className={`color-btn ${color === c ? 'color-btn--active' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />
          ))}
        </div>
      </div>
      <div className="form-row">
        <label>Objectif / semaine</label>
        <input type="number" min="1" max="7" value={target} onChange={e => setTarget(e.target.value)} />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </div>
    </form>
  )
}

export default function HabitAdmin({ habits, onAdd, onEdit, onDelete, onClose }) {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  async function handleAdd(data) {
    await onAdd(data)
    setAdding(false)
  }

  async function handleEdit(data) {
    await onEdit(editing.id, data)
    setEditing(null)
  }

  async function handleDelete(id) {
    await onDelete(id)
    setConfirmDelete(null)
  }

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Gérer les habits</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {adding ? (
          <HabitForm onSave={handleAdd} onCancel={() => setAdding(false)} />
        ) : editing ? (
          <HabitForm initial={editing} onSave={handleEdit} onCancel={() => setEditing(null)} />
        ) : (
          <>
            <ul className="admin-list">
              {habits.map(h => (
                <li key={h.id} className="admin-item">
                  <span className="admin-item-emoji">{h.emoji}</span>
                  <span className="admin-item-name">{h.name}</span>
                  <span className="admin-item-target">{h.target_per_week}×/sem</span>
                  <div className="admin-item-actions">
                    <button className="btn-icon" onClick={() => setEditing(h)}>✏️</button>
                    <button className="btn-icon btn-icon--danger" onClick={() => setConfirmDelete(h)}>🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn-add" onClick={() => setAdding(true)}>+ Ajouter un habit</button>
          </>
        )}

        {confirmDelete && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <p>Supprimer <strong>{confirmDelete.emoji} {confirmDelete.name}</strong> ?</p>
              <div className="form-actions">
                <button className="btn-ghost" onClick={() => setConfirmDelete(null)}>Annuler</button>
                <button className="btn-danger" onClick={() => handleDelete(confirmDelete.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
