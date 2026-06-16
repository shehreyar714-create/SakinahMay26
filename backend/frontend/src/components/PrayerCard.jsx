import { useState, useEffect, useMemo } from 'react';
import '../css/Home.css';
import { useLocation } from '../hooks/useLocation';
import { usePrayerTimes } from '../hooks/usePrayerTimes';

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function PrayerCard({ selectedDate }) {
  const { coords } = useLocation();
  const [manualCoords, setManualCoords] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [countdown, setCountdown] = useState('');
  const [nextPrayerName, setNextPrayerName] = useState(null);

  const activeCoords = manualCoords || coords;
  const { data, loading, error } = usePrayerTimes(selectedDate, activeCoords);

  /* ── Next prayer logic ──────────────────────────────────────── */
  const nextPrayer = useMemo(() => {
    if (!data) return null;
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    for (const name of PRAYER_ORDER) {
      const [h, m] = data.timings[name].split(':').map(Number);
      if (h * 60 + m > current) return { name, time: data.timings[name] };
    }
    return null;
  }, [data]);

  useEffect(() => {
    if (!nextPrayer) return;
    setNextPrayerName(nextPrayer.name);

    const tick = () => {
      const now = new Date();
      const [h, m] = nextPrayer.time.split(':').map(Number);
      const target = new Date();
      target.setHours(h, m, 0, 0);

      const diff = target - now;
      if (diff <= 0) {
        setCountdown("It's time!");
        return;
      }

      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown(`${hrs}h ${mins}m ${secs}s`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextPrayer]);

  /* ── City search ────────────────────────────────────────────── */
  const searchLocation = async () => {
    if (!locationInput.trim()) return;
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${locationInput}&country=India&method=2`
      );
      const result = await res.json();
      setManualCoords({
        lat: result.data.meta.latitude,
        lng: result.data.meta.longitude,
      });
    } catch (err) {
      console.error('City search failed:', err);
    }
  };

  /* ── Render ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <section className="prayer-card-container">
        <div className="prayer-card-loading">
          <div className="font-aref text-4xl text-text-gold animate-glow-pulse mb-4">
            🕌
          </div>
          <p className="font-cairo text-lg text-text-secondary">
            Loading prayer times…
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="prayer-card-container">
        <div className="prayer-card-loading text-red-400">
          Unable to load prayer times. Check your connection.
        </div>
      </section>
    );
  }

  if (!data) return null;

  const { timings, date, meta } = data;

  return (
    <section className="prayer-card-container">
      <div className="prayer-card-inner">
        {/* ── Top row: location + dates ─────────────────────── */}
        <div className="prayer-top-row">
          <div>
            <p className="prayer-location-label">Prayer Times in</p>
            <h2 className="prayer-location-title">
              {meta?.timezone || 'Detected Location'}
            </h2>
          </div>

          <div className="prayer-date-block">
            <div className="prayer-gregorian-date">
              {date.gregorian.weekday.en}, {date.gregorian.date}{' '}
              {date.gregorian.month.en} {date.gregorian.year}
            </div>
            <div className="prayer-hijri-date">
              {date.hijri.date} {date.hijri.month.en} {date.hijri.year}
            </div>
          </div>
        </div>

        {/* ── Controls: search + badges ────────────────────── */}
        <div className="prayer-controls-row">
          <div className="prayer-search-box">
            <input
              type="text"
              className="prayer-search-input"
              placeholder="Search your city…"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
            />
            <button className="prayer-search-btn" onClick={searchLocation}>
              Search
            </button>
          </div>

          <div className="prayer-badges">
            <span className="prayer-badge">{meta.method.name}</span>
            <span className="prayer-badge">
              Imsak {timings.Imsak} · Sunrise {timings.Sunrise}
            </span>
          </div>
        </div>

        {/* ── Prayer times grid ────────────────────────────── */}
        <div className="prayer-times-grid">
          {PRAYER_ORDER.map((name) => {
            const isNext = name === nextPrayerName;
            return (
              <div
                key={name}
                className={`prayer-time-card ${isNext ? 'next-prayer' : ''}`}
              >
                {isNext && <span className="next-prayer-label">Next ▸</span>}

                <p className="prayer-name">{name}</p>
                <p className="prayer-time">{timings[name]}</p>

                {isNext && <p className="prayer-countdown">{countdown}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PrayerCard;
