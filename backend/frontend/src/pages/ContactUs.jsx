import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/contactus.css';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    // Simulate submission — wire to backend later
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  }

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="cu-hero">
        <div className="cu-hero__bg" aria-hidden="true">
          <div className="cu-hero__overlay" />
          <div className="cu-hero__dots" />
          <div className="cu-hero__ring cu-hero__ring--a" />
          <div className="cu-hero__ring cu-hero__ring--b" />
        </div>

        <div className="cu-hero__body">
          <h1 className="cu-hero__title">Contact Us</h1>
          <p className="cu-hero__sub">
            Have a question, suggestion, or want to collaborate? We'd love to
            hear from you. Our team is here to help.
          </p>
        </div>

        <div className="cu-hero__stats">
          {[
            { icon: '📧', label: 'Email Us', val: 'javabeans.bpl@gmail.com' },
            { icon: '📍', label: 'Location', val: 'Bhopal, Madhya Pradesh' },
            { icon: '🕌', label: 'Community', val: 'Always Open' },
          ].map((s) => (
            <div key={s.label} className="cu-hero__stat">
              <span className="cu-hero__stat-icon">{s.icon}</span>
              <div>
                <span className="cu-hero__stat-label">{s.label}</span>
                <span className="cu-hero__stat-val">{s.val}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN ── */}
      <main className="cu-main">
        <div className="cu-layout">
          {/* ── LEFT: Map + Mosque Image ── */}
          <div className="cu-left">
            {/* Mosque image card */}
            <div className="cu-mosque-card">
              <img
                src="/images/mosque6.jpg"
                alt="Mosque"
                className="cu-mosque-img"
              />
              <div className="cu-mosque-overlay">
                <span className="cu-mosque-overlay__ar">بيت الله</span>
                <span className="cu-mosque-overlay__en">House of Allah</span>
              </div>
              {/* Decorative corner ornaments */}
              <span
                className="cu-mosque-corner cu-mosque-corner--tl"
                aria-hidden="true"
              >
                ✦
              </span>
              <span
                className="cu-mosque-corner cu-mosque-corner--br"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>

            {/* Google Map */}
            <div className="cu-map-card">
              <div className="cu-map-card__label">
                <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                  <path
                    d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    fill="currentColor"
                  />
                </svg>
                Find Us on the Map
              </div>
              <div className="cu-map-wrap">
                <iframe
                  title="Sakinah Location — Bhopal"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117519.88804063826!2d77.27534439843749!3d23.259933099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Quick info strip */}
            <div className="cu-info-strip">
              <div className="cu-info-item">
                <span className="cu-info-item__icon">🕌</span>
                <div>
                  <span className="cu-info-item__title">Masjid Support</span>
                  <span className="cu-info-item__desc">
                    Register your masjid with Sakinah
                  </span>
                </div>
              </div>
              <div className="cu-info-divider" />
              <div className="cu-info-item">
                <span className="cu-info-item__icon">💬</span>
                <div>
                  <span className="cu-info-item__title">Response Time</span>
                  <span className="cu-info-item__desc">
                    Within 24–48 hours, In sha Allah
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <div className="cu-right">
            <div className="cu-form-card">
              <div className="cu-form-card__header">
                <h2 className="cu-form-card__title">Send Us a Message</h2>
                <p className="cu-form-card__sub">
                  Fill in the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              {status === 'success' && (
                <div className="cu-success-banner">
                  <span className="cu-success-banner__icon">✓</span>
                  <div>
                    <strong>JazakAllahu Khayran!</strong>
                    <p>
                      Your message has been sent. We'll reply within 24–48
                      hours.
                    </p>
                  </div>
                </div>
              )}

              <form className="cu-form" onSubmit={handleSubmit}>
                {/* Name + Email row */}
                <div className="cu-form-row">
                  <div className="cu-field">
                    <label className="cu-label" htmlFor="cu-name">
                      Full Name <span className="cu-required">*</span>
                    </label>
                    <div className="cu-input-wrap">
                      <svg
                        className="cu-input-icon"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <input
                        id="cu-name"
                        name="name"
                        type="text"
                        className="cu-input"
                        placeholder="Ahmad Al-Rashid"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="cu-field">
                    <label className="cu-label" htmlFor="cu-email">
                      Email Address <span className="cu-required">*</span>
                    </label>
                    <div className="cu-input-wrap">
                      <svg
                        className="cu-input-icon"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="5"
                          width="16"
                          height="11"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M2 7l8 5 8-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <input
                        id="cu-email"
                        name="email"
                        type="email"
                        className="cu-input"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone + Subject row */}
                <div className="cu-form-row">
                  <div className="cu-field">
                    <label className="cu-label" htmlFor="cu-phone">
                      Phone Number{' '}
                      <span className="cu-optional">(optional)</span>
                    </label>
                    <div className="cu-input-wrap">
                      <svg
                        className="cu-input-icon"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6.5 3h7C14.3 3 15 3.7 15 4.5v11c0 .8-.7 1.5-1.5 1.5h-7C5.7 17 5 16.3 5 15.5v-11C5 3.7 5.7 3 6.5 3z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="10"
                          cy="14.5"
                          r="0.75"
                          fill="currentColor"
                        />
                      </svg>
                      <input
                        id="cu-phone"
                        name="phone"
                        type="tel"
                        className="cu-input"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="cu-field">
                    <label className="cu-label" htmlFor="cu-subject">
                      Subject <span className="cu-required">*</span>
                    </label>
                    <div className="cu-input-wrap cu-input-wrap--select">
                      <svg
                        className="cu-input-icon"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M3 6h14M3 10h10M3 14h7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <select
                        id="cu-subject"
                        name="subject"
                        className="cu-input cu-select"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        <option value="general">General Enquiry</option>
                        <option value="masjid">Masjid Registration</option>
                        <option value="prayer">Prayer Times</option>
                        <option value="calculation">
                          Islamic Calculations
                        </option>
                        <option value="feedback">Feedback / Suggestions</option>
                        <option value="bug">Report a Bug</option>
                        <option value="partnership">
                          Partnership / Collaboration
                        </option>
                        <option value="other">Other</option>
                      </select>
                      <svg
                        className="cu-select-arrow"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 8l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="cu-field cu-field--full">
                  <label className="cu-label" htmlFor="cu-message">
                    Your Message <span className="cu-required">*</span>
                  </label>
                  <div className="cu-textarea-wrap">
                    <svg
                      className="cu-input-icon cu-input-icon--top"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4 4h12M4 8h12M4 12h8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <textarea
                      id="cu-message"
                      name="message"
                      className="cu-textarea"
                      placeholder="Write your message here... بارك الله فيكم"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <span className="cu-char-count">
                    {form.message.length} / 1000
                  </span>
                </div>

                {/* Disclaimer */}
                <p className="cu-disclaimer">
                  By submitting this form, you agree to let us contact you
                  regarding your enquiry. We never share your data.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="cu-submit-btn"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="cu-submit-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        width="18"
                        height="18"
                      >
                        <path
                          d="M3 10l14-7-7 14-2-5-5-2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {/* Decorative bismillah */}
              <div className="cu-form-footer-verse">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
