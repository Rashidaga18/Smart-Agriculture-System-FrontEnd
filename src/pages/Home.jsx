import { useSelector } from 'react-redux';
import { getT } from '../features/counterslice';
import SoilGraph from "../components/SoilGraph";

export default function Home({ setPage }) {
  const { user }     = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);

  const cards = [
    { id: 'crop',    icon: '🌱', label: T.crop,    color: '#e8f5e0', accent: '#3a6b1e' },
    { id: 'disease', icon: '🔬', label: T.disease, color: '#fde8e5', accent: '#7a2010' },
    { id: 'ai',      icon: '🤖', label: T.ai,      color: '#e5f0f8', accent: '#1e5a8b' },
    { id: 'weather', icon: '🌤️', label: T.weather, color: '#fdf3e0', accent: '#8b5e0f' },
  ];

  return (
    <div className="page-body">
      {/* Hero */}
      <div className="hero-band fade-up">
        <h1>{T.goodDay}, {user?.username}! 👋</h1>
        <p>{T.dashSub}</p>
      </div>

      {/* Quick action cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {cards.map((c, i) => (
          <div
            key={c.id}
            className="stat-card fade-up"
            style={{ animationDelay: `${i * .07}s`, cursor: 'pointer' }}
            onClick={() => setPage(c.id)}
          >
            <div className="stat-icon" style={{ background: c.color }}>{c.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.accent }}>{c.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{T.clickOpen}</div>
          </div>
        ))}
      </div>

      {/* Tips + How it works */}
      <div className="grid-2">
        <div className="card card-p fade-up" style={{ animationDelay: '.2s' }}>
          <h3 style={{ fontSize: 15, marginBottom: 14 }}>💡 {T.quickTips}</h3>
          {[T.tip1, T.tip2, T.tip3].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 10, fontSize: 13, color: 'var(--muted)', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--leaf)', flexShrink: 0, marginTop: 2 }}>•</span>
              {tip}
            </div>
          ))}
        </div>

        <div className="grid-2">
                <SoilGraph/>
         </div>
         
        <div className="card card-p fade-up" style={{ animationDelay: '.25s' }}>
          <h3 style={{ fontSize: 15, marginBottom: 14 }}>⚙️ {T.howWorks}</h3>
          {[[T.s1t, T.s1d], [T.s2t, T.s2d], [T.s3t, T.s3d]].map(([title, desc], i) => (
            <div key={i} style={{ display: 'flex', gap: 11, marginBottom: 13, alignItems: 'flex-start' }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: 'var(--fern)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
