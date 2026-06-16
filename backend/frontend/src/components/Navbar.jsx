import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const role = user?.role;
  const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN';
  const navigate = useNavigate();
  const calcRef = useRef(null);
  const userRef = useRef(null);

  const displayName =
    user?.firstName || user?.email?.split('@')[0] || 'Account';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (calcRef.current && !calcRef.current.contains(e.target))
        setCalcOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setCalcOpen(false);
    setUserOpen(false);
  };

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setSigningOut(false);
      closeAll();
    }
  }

  return (
    <header className={`navbar-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar">
        {/* ── LOGO ─────────────────────────────────── */}
        <Link to="/" className="nav-logo" onClick={closeAll}>
          <span className="nav-logo-icon" aria-hidden="true">
            {/* Geometric Islamic star SVG mark */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="18,2 21.5,14 34,14 23.5,21.5 27,34 18,27 9,34 12.5,21.5 2,14 14.5,14"
                fill="var(--color-primary-base)"
                opacity="0.15"
              />
              <polygon
                points="18,5 20.8,13.5 30,13.5 22.5,19 25.5,28 18,23 10.5,28 13.5,19 6,13.5 15.2,13.5"
                fill="none"
                stroke="var(--color-primary-base)"
                strokeWidth="1.2"
              />
              <circle cx="18" cy="18" r="4" fill="var(--color-primary-base)" />
            </svg>
          </span>
          <span className="nav-logo-text">
            <span className="nav-logo-main">Sakinah</span>
            <span className="nav-logo-tagline">سكينة</span>
          </span>
        </Link>

        {/* ── DESKTOP NAV LINKS ─────────────────────── */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" end onClick={closeAll}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/masajidtimings" onClick={closeAll}>
              Masajid Timings
            </NavLink>
          </li>
          <li>
            <NavLink to="/hijri-calendar" onClick={closeAll}>
              Hijri Calendar
            </NavLink>
          </li>

          {/* Calculations dropdown */}
          <li className="dropdown" ref={calcRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setCalcOpen((p) => !p)}
              aria-expanded={calcOpen}
            >
              Calculations
              <svg
                className={`chevron${calcOpen ? ' open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ul className={`dropdown-menu${calcOpen ? ' show' : ''}`}>
              <li>
                <NavLink to="/calculations/zakat" onClick={closeAll}>
                  Zakat
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculations/fitrah" onClick={closeAll}>
                  Fitrah
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculations/inheritence" onClick={closeAll}>
                  Inheritance
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculations/iddat" onClick={closeAll}>
                  Iddat
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculations/aqiqah" onClick={closeAll}>
                  Aqiqah
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/aboutus" onClick={closeAll}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactus" onClick={closeAll}>
              Contact Us
            </NavLink>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/calendar" onClick={closeAll}>
                  My Calendar
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink to="/dashboard" onClick={closeAll}>
                    Dashboard
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>

        {/* ── RIGHT SIDE: AUTH ─────────────────────── */}
        <div className="nav-auth">
          {isLoggedIn ? (
            <div className="dropdown user-dropdown" ref={userRef}>
              <button
                className="nav-user-btn"
                onClick={() => setUserOpen((p) => !p)}
                aria-expanded={userOpen}
              >
                <span className="nav-avatar">
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <span className="nav-user-name">{displayName}</span>
                <svg
                  className={`chevron${userOpen ? ' open' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-right${userOpen ? ' show' : ''}`}
              >
                {isAdmin && (
                  <li>
                    {isAdmin && (
                      <NavLink to="/dashboard" onClick={closeAll}>
                        Dashboard
                      </NavLink>
                    )}
                  </li>
                )}
                <li>
                  <NavLink to="/profile" onClick={closeAll}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle
                        cx="7.5"
                        cy="5"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M2.5 13c0-2.76 2.24-5 5-5s5 2.24 5 5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    My Profile
                  </NavLink>
                </li>
                <li className="dropdown-divider" />
                <li>
                  <button
                    className="nav-signout-btn"
                    onClick={handleSignOut}
                    disabled={signingOut}
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M6 2H3a1 1 0 00-1 1v9a1 1 0 001 1h3M10 10l3-3-3-3M13 7H6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {signingOut ? 'Signing out…' : 'Sign out'}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="nav-login-btn" onClick={closeAll}>
              Login
            </NavLink>
          )}
        </div>

        {/* ── HAMBURGER ────────────────────────────── */}
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── MOBILE OVERLAY ───────────────────────── */}
      <div
        className={`mobile-overlay${menuOpen ? ' show' : ''}`}
        onClick={closeAll}
      />

      {/* ── MOBILE DRAWER ────────────────────────── */}
      <aside className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        {/* Logo in drawer */}
        <div className="drawer-logo">
          <span className="nav-logo-main">Sakinah</span>
          <span className="nav-logo-tagline">سكينة</span>
        </div>

        <nav className="drawer-nav">
          <NavLink to="/" end onClick={closeAll}>
            Home
          </NavLink>
          <NavLink to="/masajidtimings" onClick={closeAll}>
            Masajid Timings
          </NavLink>
          <NavLink to="/hijri-calendar" onClick={closeAll}>
            Hijri Calendar
          </NavLink>

          {/* Mobile Calculations accordion */}
          <div className="drawer-section">
            <button
              className="drawer-section-toggle"
              onClick={() => setCalcOpen((p) => !p)}
            >
              Calculations
              <svg
                className={`chevron${calcOpen ? ' open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {calcOpen && (
              <div className="drawer-sub">
                <NavLink to="/calculations/zakat" onClick={closeAll}>
                  Zakat
                </NavLink>
                <NavLink to="/calculations/fitrah" onClick={closeAll}>
                  Fitrah
                </NavLink>
                <NavLink to="/calculations/inheritence" onClick={closeAll}>
                  Inheritance
                </NavLink>
                <NavLink to="/calculations/iddat" onClick={closeAll}>
                  Iddat
                </NavLink>
                <NavLink to="/calculations/aqiqah" onClick={closeAll}>
                  Aqiqah
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/aboutus" onClick={closeAll}>
            About Us
          </NavLink>
          <NavLink to="/contactus" onClick={closeAll}>
            Contact Us
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink to="/calendar" onClick={closeAll}>
                My Calendar
              </NavLink>
              <NavLink to="/dashboard" onClick={closeAll}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" onClick={closeAll}>
                My Profile
              </NavLink>
            </>
          )}
        </nav>

        <div className="drawer-footer">
          {isLoggedIn ? (
            <>
              <div className="drawer-user">
                <span className="nav-avatar">
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <span>{displayName}</span>
              </div>
              <button
                className="drawer-signout"
                onClick={handleSignOut}
                disabled={signingOut}
              >
                {signingOut ? 'Signing out…' : 'Sign out'}
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="nav-login-btn drawer-login"
              onClick={closeAll}
            >
              Login
            </NavLink>
          )}
        </div>
      </aside>
    </header>
  );
}

export default Navbar;
