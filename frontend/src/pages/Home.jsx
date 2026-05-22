import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import vibcraftBg from '../assets/vibcraft-logo.png';
import adobeSuiteImg from '../assets/adobe-suite.jpg';
import timelineImg from '../assets/timeline.jpg';

const stats = [
  { value: '500+', label: 'PROJECTS COMPLETED' },
  { value: '98%', label: 'SATISFACTION RATE' },
  { value: '24h', label: 'AVERAGE TURNAROUND' },
];

const features = [
  { icon: '⚡', tag: 'PERFORMANCE', title: 'Fast Delivery', desc: 'Rapid turnaround without sacrificing the microscopic details of your edit.' },
  { icon: '🖌️', tag: 'AESTHETICS', title: 'Creative Excellence', desc: 'Color grading and stylistic choices that elevate your brand\'s visual identity.' },
  { icon: '🔄', tag: 'FLEXIBILITY', title: 'Unlimited Revisions', desc: 'We refine until it\'s perfect. No hidden fees for standard stylistic tweaks.' },
  { icon: '🎬', tag: 'OUTPUT', title: 'Master Fidelity', desc: 'Full 4K/8K delivery formatted for cinema, streaming, or social media platforms.' },
];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Trigger pop animations after mount
    const els = heroRef.current?.querySelectorAll('.pop-animate');
    els?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
      el.classList.add('pop-active');
    });
  }, []);

  return (
    <div>
      {/* ───── Hero ───── */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          /* 4th image as background */
          backgroundImage: `url(${vibcraftBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay so text stays legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(5,5,5,0.70) 50%, rgba(0,0,0,0.85) 100%)',
          zIndex: 0,
        }} />

        {/* Subtle red glow to blend with brand */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,30,38,0.18) 0%, transparent 65%)',
          zIndex: 1,
        }} />

        <div className="container" style={{
          position: 'relative', zIndex: 2,
          paddingTop: 120, paddingBottom: 120,
          textAlign: 'center',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          <div
            className="pop-animate"
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'var(--red)',
              marginBottom: 24,
              opacity: 0,
            }}
          >
            ENGINEERED FOR THE ELITE
          </div>

          <h1
            className="pop-animate"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: 28,
              letterSpacing: '-0.03em',
              opacity: 0,
              textShadow: '0 2px 24px rgba(0,0,0,0.8)',
            }}
          >
            Transform Your <br />
            <span style={{ color: 'var(--red)' }}>Vision</span> Into Reality
          </h1>

          <p
            className="pop-animate"
            style={{
              color: '#bbb',
              fontSize: '1.15rem',
              lineHeight: 1.7,
              marginBottom: 44,
              maxWidth: 620,
              marginInline: 'auto',
              opacity: 0,
            }}
          >
            Elite video post-production and high-fidelity color grading for creators
            who demand perfection. Your craft deserves the highest performance.
          </p>

          <div
            className="pop-animate"
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}
          >
            <Link to="/services" className="btn" style={{ background: 'rgba(255,255,255,0.92)', color: '#000', padding: '16px 36px', fontWeight: 700 }}>
              Explore Services
            </Link>
            <Link to="/register" className="btn btn-outline" style={{ padding: '16px 36px' }}>
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Stats ───── */}
      <section style={{ padding: '0 0 100px 0', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="grid-3">
            {stats.map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center', padding: '40px 24px', background: '#111' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--red)', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontFamily: '"Space Mono", monospace', color: '#888', fontSize: '0.7rem', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Workspace Showcase (timeline.jpg) ───── */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 14 }}>THE STUDIO</div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Inside Our <span style={{ color: 'var(--red)' }}>Edit Suite</span>
            </h2>
            <p style={{ color: '#888', marginTop: 14, fontSize: '1rem', maxWidth: 520, marginInline: 'auto', lineHeight: 1.6 }}>
              Precision-built Premiere Pro timelines with Lumetri Color science — every frame matters.
            </p>
          </div>

          {/* Timeline image */}
          <div style={{
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,45,70,0.25)',
            boxShadow: '0 0 60px rgba(255,30,38,0.20), 0 20px 60px rgba(0,0,0,0.6)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.015)'; e.currentTarget.style.boxShadow = '0 0 80px rgba(255,30,38,0.35), 0 30px 80px rgba(0,0,0,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(255,30,38,0.20), 0 20px 60px rgba(0,0,0,0.6)'; }}
          >
            <img
              src={timelineImg}
              alt="Premiere Pro Edit Timeline"
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            />
            {/* Subtle gradient bottom fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }} />
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section className="section" style={{ padding: '20px 0 100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 16 }}>OUR ADVANTAGE</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Built for the Professional Creator</h2>
          </div>
          <div className="grid-4">
            {features.map(f => (
              <div key={f.title} className="card" style={{ padding: '32px 24px' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 24 }}>
                  {f.icon}
                </div>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: '#888', letterSpacing: '0.1em', marginBottom: 8 }}>{f.tag}</div>
                <h3 style={{ fontWeight: 800, marginBottom: 12, fontSize: '1.2rem' }}>{f.title}</h3>
                <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Adobe Toolset (adobe-suite.jpg) ───── */}
      <section style={{ padding: '20px 0 100px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
            {/* Text side */}
            <div style={{ flex: '1 1 320px' }}>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 16 }}>INDUSTRY TOOLS</div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.2 }}>
                Powered by the <span style={{ color: 'var(--red)' }}>Adobe Creative Suite</span>
              </h2>
              <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
                From Premiere Pro timelines to After Effects VFX, Photoshop compositing to Illustrator motion graphics — we harness the full power of Adobe's professional ecosystem.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Lightroom', 'Bridge'].map(tool => (
                  <span key={tool} style={{
                    background: 'rgba(255,45,70,0.08)',
                    border: '1px solid rgba(255,45,70,0.2)',
                    color: '#ccc',
                    padding: '6px 14px',
                    borderRadius: 4,
                    fontSize: '0.78rem',
                    fontFamily: '"Space Mono", monospace',
                    letterSpacing: '0.05em',
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Image side */}
            <div style={{
              flex: '1 1 420px',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 0 50px rgba(0,180,255,0.10), 0 20px 50px rgba(0,0,0,0.5)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 0 70px rgba(0,200,255,0.18), 0 30px 70px rgba(0,0,0,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,180,255,0.10), 0 20px 50px rgba(0,0,0,0.5)'; }}
            >
              <img
                src={adobeSuiteImg}
                alt="Adobe Creative Suite Tools"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section style={{ paddingBottom: '120px' }}>
        <div className="container">
          <div className="card" style={{ padding: '80px 40px', textAlign: 'center', background: 'linear-gradient(180deg, #18181b 0%, #0a0a0a 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>Ready to Get Started?</h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: 40, maxWidth: 600, marginInline: 'auto', lineHeight: 1.6 }}>
              Join the ranks of elite filmmakers and content creators who trust VibCraft for their post-production needs. Let's make your next project legendary.
            </p>
            <Link to="/register" className="btn" style={{ background: 'rgba(255,45,70,0.85)', color: '#fff', padding: '16px 40px', fontSize: '1.1rem' }}>Start Your Project Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
