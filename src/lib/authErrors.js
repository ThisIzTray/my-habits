const errorMap = [
  ['email rate limit exceeded',       'Trop d\'emails envoyés. Réessaie dans une heure.'],
  ['over_email_send_rate_limit',       'Trop d\'emails envoyés. Réessaie dans une heure.'],
  ['invalid login credentials',        'Email ou mot de passe incorrect.'],
  ['user already registered',          'Un compte existe déjà avec cet email.'],
  ['password should be at least',      'Le mot de passe doit contenir au moins 6 caractères.'],
  ['email not confirmed',              'Email non confirmé. Vérifie ta boîte mail.'],
  ['signup disabled',                  'Les inscriptions sont désactivées.'],
  ['network request failed',           'Erreur réseau. Vérifie ta connexion.'],
  ['invalid email',                    'Adresse email invalide.'],
]

export function translateAuthError(message) {
  if (!message) return 'Une erreur est survenue.'
  const lower = message.toLowerCase()
  for (const [key, val] of errorMap) {
    if (lower.includes(key)) return val
  }
  return message
}
