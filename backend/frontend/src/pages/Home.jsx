import Navbar from '../components/Navbar';
import PrayerCard from '../components/PrayerCard';
import QuranSection from '../components/QuranSection';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import JoinUsSection from '../components/JoinUsSection';
import Footer from '../components/Footer';
import '../css/Home.css';
import { useState } from 'react';

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex flex-col min-h-screen bg-surface-primary overflow-x-hidden">
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-overlay" />

        <div className="animate-fade-up flex flex-col items-center justify-center text-center px-4 py-24 md:py-36 gap-6 relative z-10">
          {/* Allah calligraphy */}
          <div className="font-aref text-7xl md:text-8xl text-text-primary animate-glow-pulse drop-shadow-[0_0_30px_rgba(230,187,81,0.5)]">
            ﷲ
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border-accent opacity-60" />
            <span className="text-text-gold text-xs font-cairo tracking-widest uppercase opacity-80">
              Quran 3:103
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border-accent opacity-60" />
          </div>

          {/* Hero quote */}
          <h1 className="font-scheherazade text-3xl md:text-5xl lg:text-6xl font-normal leading-relaxed text-text-primary max-w-4xl text-shadow-hero">
            "And hold firmly to the rope of Allah all together and do not become
            divided"
          </h1>

          <p className="font-tajawal text-lg md:text-xl text-text-secondary italic font-medium tracking-wide">
            Surah Al-Imran, Verse 103
          </p>

          {/* CTA */}
          <a href="#join" className="hero-cta-btn mt-2">
            Join Our Community
          </a>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-10" />
      </section>

      {/* ── Prayer Times + Calendar ──────────────────────────────── */}
      <section className="flex flex-col xl:flex-row items-start justify-center gap-6 px-4 md:px-8 py-10 max-w-[90rem] mx-auto w-full">
        {/* Prayer card takes most space */}
        <div className="flex-1 w-full">
          <PrayerCard
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        {/* Mini calendar — hidden on mobile, shows on xl */}
        <div className="hidden xl:block w-72 shrink-0 calender-container">
          {/* HijriCalendar component goes here when ready */}
        </div>
      </section>

      {/* ── Quran / Hadith ───────────────────────────────────────── */}
      <QuranSection />

      {/* ── Features showcase ────────────────────────────────────── */}
      <HeroSection />

      {/* ── About ────────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Join Us / Auth ───────────────────────────────────────── */}
      <JoinUsSection />

      <div className="flex-1" />
      <Footer />
    </div>
  );
}

export default Home;
