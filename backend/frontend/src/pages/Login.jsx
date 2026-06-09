import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../css/Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/'

  const [mode, setMode] = useState('login') // 'login' | 'forgot'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // ── Login ─────────────────────────────────────
  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      // Server sends back message in err.response.data.message
      const msg = err.response?.data?.message || 'Login failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // ── Forgot password — Phase 2 ─────────────────
  async function handleForgot(e) {
    e.preventDefault()
    setSuccess('Password reset is coming soon. Please contact support for now.')
  }

  return (
    <div className="auth-page auth-page--login">
      <section className="auth-showcase" aria-label="Sakinah benefits">
        <div className="auth-showcase__brand">
          <img src="/images/logo2.png" alt="Sakinah" />
        </div>

        <span className="auth-kicker">Prayer • Calendar • Community</span>
        <h1>
          Your spiritual routine,
          <span> beautifully organized</span>
        </h1>
        <p>
          Sign in to continue tracking prayers, Hijri dates, reminders, and
          personal worship goals in one peaceful Sakinah space.
        </p>

        <div className="auth-benefits">
          <div className="auth-benefit">
            <span>☪</span>
            <div>
              <strong>Personal dashboard</strong>
              <small>View saved prayers, fasting, and calendar tools.</small>
            </div>
          </div>
          <div className="auth-benefit">
            <span>🕌</span>
            <div>
              <strong>Masajid timings</strong>
              <small>Keep local prayer information close at hand.</small>
            </div>
          </div>
          <div className="auth-benefit">
            <span>✦</span>
            <div>
              <strong>Guided calculators</strong>
              <small>Access Zakat, Fitrah, Iddat, Aqiqah, and more.</small>
            </div>
          </div>
        </div>

        <div className="auth-trust-panel">
          <span className="auth-live-dot" />
          <p>Built for a calm, consistent Islamic lifestyle.</p>
        </div>
      </section>

      <section className="auth-form-area">
        <Link to="/" className="auth-back-link">← Back to home</Link>

        <div className="auth-card">
          <div className="auth-logo">
            <span className="auth-logo-mark">س</span>
            <h2 className="auth-brand">Sakinah</h2>
          </div>

          {mode === 'login' ? (
            <>
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">
                Sign in to access your personal dashboard
              </p>

              {error && <p className="form-error">{error}</p>}

              <form onSubmit={handleLogin} className="auth-form">
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => { setMode('forgot'); setError('') }}
                >
                  Forgot password?
                </button>

                <button
                  type="submit"
                  className="action-button"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <p className="auth-footer-text">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="auth-link">Create one free →</Link>
              </p>

              <p className="auth-security-note">🛡 Secured with encrypted authentication</p>
            </>
          ) : (
            <>
              <h1 className="auth-title">Reset password</h1>
              <p className="auth-subtitle">
                Enter your email and we&apos;ll send a reset link
              </p>

              {error && <p className="form-error">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <form onSubmit={handleForgot} className="auth-form">
                <div className="input-wrapper">
                  <label className="field-label" htmlFor="reset-email">
                    Email address
                  </label>
                  <div className="auth-input-shell">
                    <span aria-hidden="true">✉</span>
                    <input
                      id="reset-email"
                      className="text-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="action-button"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>

              <button
                type="button"
                className="auth-link-btn auth-link-btn--left"
                onClick={() => { setMode('login'); setError(''); setSuccess('') }}
              >
                ← Back to login
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
