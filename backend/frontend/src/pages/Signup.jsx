import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../css/Auth.css'

export default function Signup() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordChecks = [
    { label: 'At least 8 characters', passed: password.length >= 8 },
    { label: 'One uppercase letter', passed: /[A-Z]/.test(password) },
    { label: 'One number', passed: /\d/.test(password) },
  ]

  async function handleSignup(e) {
    e.preventDefault()
    setError('')

    // ── Client-side validation ─────────────────
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
      })
      setSuccess('Account created! Check your email to verify before logging in.')
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.email
        || err.response?.data?.password
        || 'Sign up failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page auth-page--signup">
      <section className="auth-showcase" aria-label="Sakinah onboarding steps">
        <div className="auth-showcase__brand">
          <img src="/images/logo2.png" alt="Sakinah" />
        </div>

        <span className="auth-kicker">Free Sakinah account</span>
        <h1>
          Get started with
          <span> mindful worship tools</span>
        </h1>
        <p>
          Create your Sakinah account and begin organizing prayer tracking,
          Hijri calendar planning, reminders, and Islamic calculations today.
        </p>

        <ol className="auth-steps">
          <li>
            <span>01</span>
            <div>
              <strong>Create your account</strong>
              <small>Add your name, email, and a secure password.</small>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Personalize your profile</strong>
              <small>Keep your spiritual tools and reminders connected.</small>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Use Sakinah daily</strong>
              <small>Track worship, dates, and helpful calculations.</small>
            </div>
          </li>
        </ol>

        <div className="auth-pill-row">
          <span>✓ Free access</span>
          <span>✓ Peaceful tools</span>
          <span>✓ Community focused</span>
        </div>
      </section>

      <section className="auth-form-area">
        <Link to="/" className="auth-back-link">← Back to home</Link>

        <div className="auth-card auth-card--signup">
          <div className="auth-logo">
            <span className="auth-logo-mark">س</span>
            <h2 className="auth-brand">Sakinah</h2>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join the Sakinah community</p>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          {!success && (
            <form onSubmit={handleSignup} className="auth-form">
              <div className="auth-form-grid">
                <div className="input-wrapper">
                  <label className="field-label" htmlFor="firstName">
                    First name
                  </label>
                  <div className="auth-input-shell">
                    <span aria-hidden="true">👤</span>
                    <input
                      id="firstName"
                      className="text-input"
                      type="text"
                      placeholder="Ahmad"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <label className="field-label" htmlFor="lastName">
                    Last name
                  </label>
                  <div className="auth-input-shell">
                    <span aria-hidden="true">✦</span>
                    <input
                      id="lastName"
                      className="text-input"
                      type="text"
                      placeholder="Khan"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>
              </div>

              <div className="input-wrapper">
                <label className="field-label" htmlFor="email">Email address</label>
                <div className="auth-input-shell">
                  <span aria-hidden="true">✉</span>
                  <input
                    id="email"
                    className="text-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label className="field-label" htmlFor="password">Password</label>
                <div className="auth-input-shell">
                  <span aria-hidden="true">🔒</span>
                  <input
                    id="password"
                    className="text-input"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <ul className="auth-password-checks">
                {passwordChecks.map(check => (
                  <li key={check.label} className={check.passed ? 'passed' : ''}>
                    <span>{check.passed ? '✓' : '○'}</span>
                    {check.label}
                  </li>
                ))}
              </ul>

              <div className="input-wrapper">
                <label className="field-label" htmlFor="confirm">
                  Confirm password
                </label>
                <div className="auth-input-shell">
                  <span aria-hidden="true">🔐</span>
                  <input
                    id="confirm"
                    className="text-input"
                    type="password"
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="action-button"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          )}

          {success && (
            <button
              className="action-button"
              onClick={() => navigate('/login')}
            >
              Go to login
            </button>
          )}

          {!success && (
            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in →</Link>
            </p>
          )}

          <p className="auth-security-note">🛡 Your account details stay protected</p>
        </div>
      </section>
    </div>
  )
}
