import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Navbar   from './components/Navbar';
import Login    from './pages/Login';
import Signup   from './pages/Signup';
import Home     from './pages/Home';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection   from './pages/DiseaseDetection';
import { getT } from './features/counterslice';

const API = 'http://localhost:8080';


async function apiFetch(path, opts = {}, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers: { ...headers, ...opts.headers } });
  if (!res.ok) { const e = await res.text(); throw new Error(e || `HTTP ${res.status}`); }
  const ct = res.headers.get('content-type');
  return ct?.includes('json') ? res.json() : res.text();
}

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      /* ── LIGHT THEME (default) ── */
      :root {
        --fern:    #4e6a38;
        --moss:    #3a4a2e;
        --leaf:    #6d9a3e;
        --sage:    #a8c07a;
        --amber:   #c8893a;
        --rust:    #8b3a2a;
        --sky:     #4a7fa8;
        --dew:     #e8f4ec;

        --bg:        #f5f0e8;
        --bg2:       #fffdf9;
        --card:      #fffdf9;
        --text:      #1a1209;
        --muted:     #6b6255;
        --border:    #d4c9b8;
        --border2:   #f0ebe4;
        --input-bg:  #fefcf9;
        --topbar:    #fffdf9;

        --sb-bg:    #1a1209;
        --sb-text:  rgba(255,255,255,.85);
        --sb-muted: rgba(255,255,255,.38);
        --sb-hover: rgba(255,255,255,.07);

        --shadow:    0 2px 16px rgba(26,18,9,.08);
        --shadow-lg: 0 8px 40px rgba(26,18,9,.14);
      }

      /* ── DARK THEME ── */
      [data-theme="dark"] {
        --bg:        #0f0e0c;
        --bg2:       #1a1814;
        --card:      #1f1d18;
        --text:      #ede8df;
        --muted:     #9c9080;
        --border:    #2e2a22;
        --border2:   #252219;
        --input-bg:  #16140f;
        --topbar:    #191710;

        --sb-bg:    #0a0906;
        --sb-text:  rgba(255,255,255,.82);
        --sb-muted: rgba(255,255,255,.32);
        --sb-hover: rgba(255,255,255,.05);

        --shadow:    0 2px 16px rgba(0,0,0,.38);
        --shadow-lg: 0 8px 40px rgba(0,0,0,.55);
      }

      html { scroll-behavior: smooth; }
      body {
        font-family: 'DM Sans', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        line-height: 1.6;
        transition: background .22s, color .22s;
      }
      h1,h2,h3,h4 { font-family: 'Syne', sans-serif; font-weight: 700; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

      @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
      @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      @keyframes spin    { to{transform:rotate(360deg)} }
      @keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

      .fade-up { animation: fadeUp .4s ease both; }
      .fade-in { animation: fadeIn .3s ease both; }

      /* ── BUTTONS ── */
      .btn {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 10px 20px; border-radius: 9px; border: none;
        font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
        cursor: pointer; transition: all .17s ease; white-space: nowrap;
      }
      .btn:active { transform: scale(.97); }
      .btn-primary   { background: var(--fern); color: #fff; box-shadow: 0 2px 10px rgba(78,106,56,.3); }
      .btn-primary:hover  { background: var(--moss); }
      .btn-secondary { background: transparent; color: var(--fern); border: 1.5px solid var(--fern); }
      .btn-secondary:hover { background: var(--dew); }
      .btn-ghost { background: transparent; color: var(--muted); border: 1.5px solid var(--border); }
      .btn-ghost:hover { background: var(--bg); color: var(--text); }
      .btn-danger { background: var(--rust); color: #fff; }
      .btn-danger:hover { opacity: .88; }
      .btn-sm   { padding: 7px 13px; font-size: 13px; }
      .btn-lg   { padding: 13px 26px; font-size: 15px; }
      .btn-full { width: 100%; justify-content: center; }
      .btn:disabled { opacity: .5; cursor: not-allowed; }

      /* ── CARDS ── */
      .card   { background: var(--card); border-radius: 14px; border: 1px solid var(--border); box-shadow: var(--shadow); transition: background .22s, border-color .22s; }
      .card-p { padding: 22px; }

      /* ── FORM ── */
      .input-group { display: flex; flex-direction: column; gap: 5px; }
      .label { font-size: 12.5px; font-weight: 500; color: var(--muted); }
      .input {
        padding: 10px 13px; border-radius: 9px;
        border: 1.5px solid var(--border);
        background: var(--input-bg);
        font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text);
        outline: none; width: 100%;
        transition: border-color .15s, box-shadow .15s, background .22s;
      }
      .input:focus { border-color: var(--fern); box-shadow: 0 0 0 3px rgba(78,106,56,.12); }
      .input::placeholder { color: var(--muted); opacity: .5; }

      /* ── BADGES ── */
      .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; }
      .badge-green { background: #e8f5e0; color: #3a6b1e; }
      .badge-muted { background: var(--bg); color: var(--muted); border: 1px solid var(--border); cursor: pointer; }
      [data-theme="dark"] .badge-green { background: rgba(110,180,60,.14); color: #8ecf50; }

      /* ── SPINNER ── */
      .spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,.25); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; flex-shrink: 0; }

      /* ── LAYOUT ── */
      .layout { display: flex; }
      .main-content { margin-left: 255px; flex: 1; min-height: 100vh; background: var(--bg); transition: background .22s; }

      /* ── TOPBAR ── */
      .topbar {
        background: var(--topbar); border-bottom: 1px solid var(--border);
        padding: 0 28px; height: 62px;
        display: flex; align-items: center; justify-content: space-between;
        position: sticky; top: 0; z-index: 50;
        transition: background .22s, border-color .22s;
      }
      .topbar-title { font-size: 17px; font-weight: 700; color: var(--text); }
      .topbar-sub   { font-size: 12.5px; color: var(--muted); }
      .page-body    { padding: 26px 28px; }

      /* ── GRIDS ── */
      .grid-2    { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
      .grid-3    { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
      .grid-4    { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }

      /* ── STAT CARD ── */
      .stat-card { padding: 19px; border-radius: 12px; background: var(--card); border: 1px solid var(--border); transition: background .22s, border-color .22s; }
      .stat-icon { width: 40px; height: 40px; border-radius: 9px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 19px; }

      /* ── MISC ── */
      .divider { height: 1px; background: var(--border); margin: 16px 0; }
      .section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
      .empty-state { text-align: center; padding: 48px 20px; color: var(--muted); }
      .empty-state .icon { font-size: 42px; margin-bottom: 13px; opacity: .4; }
      .empty-state h3 { font-size: 17px; color: var(--text); margin-bottom: 5px; }

      /* ── RESULT CARD ── */
      .result-card { background: linear-gradient(135deg, var(--moss), var(--fern)); border-radius: 14px; padding: 24px; color: #fff; }
      .result-crop { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
      .conf-bar  { height: 7px; background: rgba(255,255,255,.2); border-radius: 99px; overflow: hidden; margin-top: 9px; }
      .conf-fill { height: 100%; background: #fff; border-radius: 99px; }

      /* ── ADVISORY ── */
      .advisory-block {
        background: var(--bg); border-radius: 10px; padding: 15px;
        border-left: 4px solid var(--fern); margin-top: 13px;
        transition: background .22s;
      }
      .advisory-block h4 { font-size: 13px; color: var(--fern); margin-bottom: 6px; }
      .advisory-block p  { font-size: 13.5px; line-height: 1.65; color: var(--text); }

      /* ── UPLOAD ZONE ── */
      .upload-zone {
        border: 2px dashed var(--border); border-radius: 12px;
        padding: 34px 18px; text-align: center; cursor: pointer;
        transition: all .2s; background: var(--bg2);
      }
      .upload-zone:hover, .upload-zone.dragging { border-color: var(--fern); background: var(--dew); }
      [data-theme="dark"] .upload-zone:hover,
      [data-theme="dark"] .upload-zone.dragging { background: rgba(78,106,56,.1); }

      /* ── WEATHER ── */
      .weather-hero { background: linear-gradient(135deg, #1a4a6b, #2d7aa8); border-radius: 14px; padding: 26px; color: #fff; margin-bottom: 18px; }
      .weather-temp { font-size: 50px; font-weight: 800; line-height: 1; }
      .weather-city { font-size: 17px; opacity: .8; margin-bottom: 3px; }

      /* ── HERO BAND ── */
      .hero-band {
        background: linear-gradient(120deg, var(--moss), var(--fern), var(--leaf));
        padding: 26px; border-radius: 14px; color: #fff; margin-bottom: 22px;
        position: relative; overflow: hidden;
      }
      .hero-band::after { content: '🌾'; position: absolute; right: 24px; top: 50%; transform: translateY(-50%); font-size: 56px; opacity: .2; animation: bounce 3s ease-in-out infinite; }
      .hero-band h1 { font-size: 23px; margin-bottom: 5px; }
      .hero-band p  { font-size: 13.5px; opacity: .85; max-width: 460px; }

      /* ── AUTH ── */
      .auth-page {
        min-height: 100vh; display: flex; align-items: center; justify-content: center;
        background: var(--sb-bg);
        background-image:
          radial-gradient(ellipse at 20% 50%, rgba(78,106,56,.28) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(200,137,58,.12) 0%, transparent 50%);
        padding: 20px;
      }
      .auth-card {
        background: var(--card); border-radius: 18px; padding: 36px;
        width: 100%; max-width: 420px;
        box-shadow: var(--shadow-lg); border: 1px solid var(--border);
      }
      .auth-logo { text-align: center; margin-bottom: 26px; }
      .auth-logo h1 { font-size: 21px; color: var(--text); }
      .auth-logo p  { font-size: 13.5px; color: var(--muted); margin-top: 3px; }
      .auth-form { display: flex; flex-direction: column; gap: 13px; }
      .auth-switch { text-align: center; font-size: 13.5px; color: var(--muted); margin-top: 16px; }
      .auth-switch button { background: none; border: none; color: var(--fern); font-weight: 600; cursor: pointer; }

      /* ── TABLE ── */
      .table-wrapper { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th { font-size: 11.5px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--border); background: var(--bg); }
      td { padding: 12px 14px; font-size: 13.5px; border-bottom: 1px solid var(--border2); color: var(--text); }
      tr:last-child td { border-bottom: none; }
      tr:hover td { background: var(--bg); }

      /* ── TOAST ── */
      .toast-wrap { position: fixed; bottom: 22px; right: 22px; display: flex; flex-direction: column; gap: 8px; z-index: 9999; pointer-events: none; }
      .toast { pointer-events: all; padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; display: flex; align-items: center; gap: 9px; box-shadow: var(--shadow-lg); animation: fadeUp .3s ease both; max-width: 320px; }
      .toast-success { background: var(--moss); color: #fff; }
      .toast-error   { background: var(--rust); color: #fff; }
      .toast-info    { background: var(--sky);  color: #fff; }

      /* ── RESPONSIVE ── */
      @media (max-width: 900px) {
        .main-content { margin-left: 0; }
        .grid-4 { grid-template-columns: 1fr 1fr; }
        .form-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 600px) {
        .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
        .page-body { padding: 14px; }
        .topbar { padding: 0 14px; }
        .auth-card { padding: 24px 16px; }
      }
    `}</style>
  );
}

function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span style={{ fontWeight: 800 }}>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'i'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}


function AiAdvisory({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);
  const [mode,    setMode]    = useState('disease');
  const [disease, setDisease] = useState('');
  const [crop,    setCrop]    = useState('');
  const [sensor,  setSensor]  = useState({ temperature: '', humidity: '', nitrogen: '', phosphorus: '', potassium: '', Rainfall: '' });
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);

  const submit = async () => {
    setLoading(true); setResult(null);
    try {
      let data;
      if (mode === 'disease') {
        if (!disease.trim()) { addToast(`Enter ${T.diseaseName}`, 'error'); setLoading(false); return; }
        const res = await fetch(`${API}/api/ai/disease?disease=${encodeURIComponent(disease)}`, {
          method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        data = await res.json();
      } else {
        if (!crop.trim()) { addToast(`Enter ${T.cropName}`, 'error'); setLoading(false); return; }
        const body = {}; Object.keys(sensor).forEach(k => { body[k] = parseFloat(sensor[k]) || 0; });
        const res = await fetch(`${API}/api/ai/crop?crop=${encodeURIComponent(crop)}`, {
          method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        data = await res.json();
      }
      setResult(data); addToast(T.advReady, 'success');
    } catch (e) { addToast(e.message, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-body">
      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card card-p fade-up">
          <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
            {[['disease', T.diseaseAdv], ['crop', T.cropAdv]].map(([m, lbl]) => (
              <button key={m} className={`btn btn-sm ${mode === m ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => { setMode(m); setResult(null); }}>{lbl}</button>
            ))}
          </div>
          {mode === 'disease' ? (
            <div className="input-group">
              <label className="label">{T.diseaseName}</label>
              <input className="input" placeholder="e.g. Leaf Rust…" value={disease} onChange={e => setDisease(e.target.value)} />
            </div>
          ) : (
            <>
              <div className="input-group" style={{ marginBottom: 12 }}>
                <label className="label">{T.cropName}</label>
                <input className="input" placeholder="e.g. Wheat…" value={crop} onChange={e => setCrop(e.target.value)} />
              </div>
              <div className="form-grid">
                {Object.keys(sensor).map(k => (
                  <div className="input-group" key={k}>
                    <label className="label">{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                    <input className="input" placeholder="0.0" value={sensor[k]}
                      onChange={e => setSensor(p => ({ ...p, [k]: e.target.value }))} />
                  </div>
                ))}
              </div>
            </>
          )}
          <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={submit} disabled={loading}>
            {loading ? <><div className="spinner" /> {T.generating}</> : <>🤖 {T.getAdv}</>}
          </button>
        </div>
        <div>
          {result ? (
            <div className="card card-p fade-in">
              <h3 style={{ fontSize: 15, marginBottom: 13 }}>🤖 {T.aiResult}</h3>
              {[['fertilizerRecommendation', '🌿', T.fertRec, 'var(--fern)'],
                ['pesticideRecommendation',  '⚗️', T.pestRec, 'var(--amber)'],
                ['explanation',              '💡', T.expLabel, 'var(--sky)'],
              ].map(([key, em, lbl, color]) => result[key] && (
                <div key={key} className="advisory-block" style={{ borderLeftColor: color }}>
                  <h4 style={{ color }}>{em} {lbl}</h4><p>{result[key]}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ minHeight: 270, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state"><div className="icon">🤖</div><h3>{T.readyQ}</h3><p>{T.enterDetails}</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Weather
function Weather({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);
  const [city, setCity]     = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData]     = useState(null);

  const fetchW = async () => {
    if (!city.trim()) { addToast(T.enterCityErr, 'error'); return; }
    setLoading(true);
    try {
      const res = await apiFetch(`/api/weather/city/${encodeURIComponent(city.trim())}`, {}, token);
      setData(res);
    } catch { addToast(T.cityNF, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-body">
      <div style={{ maxWidth: 560 }}>
        <div className="card card-p fade-up" style={{ marginBottom: 18 }}>
          <h3 style={{ fontSize: 14, marginBottom: 11 }}>{T.searchWeather}</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" style={{ flex: 1 }} placeholder={T.enterCity}
              value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchW()} />
            <button className="btn btn-primary" onClick={fetchW} disabled={loading}>
              {loading ? <div className="spinner" /> : '🔍'}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {['Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Nagpur', 'Jaipur'].map(c => (
              <button key={c} className="badge badge-muted" onClick={() => setCity(c)}>{c}</button>
            ))}
          </div>
        </div>
        {data && (
          <div className="fade-in">
            <div className="weather-hero">
              <div className="weather-city">{data.name}, {data.sys?.country}</div>
              <div className="weather-temp">{Math.round(data.main?.temp)}°C</div>
              <div style={{ fontSize: 13.5, opacity: .75, textTransform: 'capitalize', marginTop: 4 }}>{data.weather?.[0]?.description}</div>
              <div style={{ display: 'flex', gap: 22, marginTop: 16 }}>
                {[[T.humLbl, `${data.main?.humidity}%`], [T.pressLbl, `${data.main?.pressure} hPa`], [T.windLbl, `${data.wind?.speed} m/s`]].map(([lbl, val]) => (
                  <div key={lbl} style={{ fontSize: 13, opacity: .8 }}>
                    <strong style={{ display: 'block', fontSize: 17, fontWeight: 700, opacity: 1 }}>{val}</strong>{lbl}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid-3">
              {[['💧', T.humLbl, `${data.main?.humidity}%`], ['🌬️', T.windLbl, `${data.wind?.speed} m/s`], ['🌡️', T.pressLbl, `${data.main?.pressure} hPa`]].map(([icon, lbl, val]) => (
                <div key={lbl} className="stat-card">
                  <div className="stat-icon" style={{ background: 'var(--bg)', fontSize: 18 }}>{icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{val}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Farmer Profile
function FarmerProfile({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const blank = { fullname: '', contactNumber: '', address: '', village: '', district: '', state: '', pincode: '', farmLocation: '' };
  const [form, setForm] = useState(blank);

  const fields = [
    { k: 'fullname',      l: T.fullname }, { k: 'contactNumber', l: T.contact  },
    { k: 'address',       l: T.address  }, { k: 'village',       l: T.village  },
    { k: 'district',      l: T.district }, { k: 'state',         l: T.state    },
    { k: 'pincode',       l: T.pincode  }, { k: 'farmLocation',  l: T.farmLoc  },
  ];

  useEffect(() => {
    apiFetch('/api/farmer/profile', {}, token)
      .then(d => { setProfile(d); setForm(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const save = async () => {
    setSaving(true);
    try {
      const data = await apiFetch('/api/farmer/profile', { method: profile ? 'PUT' : 'POST', body: JSON.stringify(form) }, token);
      setProfile(data); setEditing(false); addToast(T.profileSaved, 'success');
    } catch (e) { addToast(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const del = async () => {
    if (!confirm(T.confirmDel)) return;
    try {
      await apiFetch('/api/farmer/profile', { method: 'DELETE' }, token);
      setProfile(null); setForm(blank); addToast(T.profileDel, 'info');
    } catch (e) { addToast(e.message, 'error'); }
  };

  if (loading) return <div className="page-body"><div style={{ height: 260, borderRadius: 12, background: 'var(--border)', opacity: .35 }} /></div>;

  return (
    <div className="page-body">
      <div style={{ maxWidth: 660 }}>
        {(!profile || editing) ? (
          <div className="card card-p fade-up">
            <div className="section-head">
              <div><h2 style={{ fontSize: 16 }}>{profile ? T.editProfile : T.createProfile}</h2></div>
              {editing && <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>{T.cancel}</button>}
            </div>
            <div className="form-grid">
              {fields.map(f => (
                <div className="input-group" key={f.k}>
                  <label className="label">{f.l}</label>
                  <input className="input" value={form[f.k] || ''} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} />
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={save} disabled={saving}>
              {saving ? <><div className="spinner" /> {T.saving}</> : <>✓ {T.saveProfile}</>}
            </button>
          </div>
        ) : (
          <div className="card fade-in">
            <div style={{ padding: '24px 24px 16px', background: 'linear-gradient(120deg,var(--moss),var(--fern))', borderRadius: '13px 13px 0 0', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 700 }}>
                  {profile.fullname?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 700 }}>{profile.fullname}</div>
                  <div style={{ opacity: .8, fontSize: 12.5 }}>@{profile.username} · {profile.email}</div>
                </div>
              </div>
            </div>
            <div className="card-p">
              <div className="form-grid">
                {fields.filter(f => f.k !== 'fullname').map(f => (
                  <div key={f.k}>
                    <div className="label">{f.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2, color: 'var(--text)' }}>{profile[f.k] || '—'}</div>
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div style={{ display: 'flex', gap: 9 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>✏ {T.edit}</button>
                <button className="btn btn-danger btn-sm" onClick={del}>🗑 {T.del}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Email Alerts
function EmailAlerts({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);
  const [form, setForm]     = useState({ subject: '', body: '' });
  const [loading, setLoading] = useState(false);
  const [type, setType]     = useState('alert');

  const send = async () => {
    if (!form.subject || !form.body) { addToast(T.fillEmail, 'error'); return; }
    setLoading(true);
    try {
      await apiFetch(`/api/email/${type}`, { method: 'POST', body: JSON.stringify(form) }, token);
      addToast(T.emailSent, 'success'); setForm({ subject: '', body: '' });
    } catch (e) { addToast(e.message, 'error'); }
    finally { setLoading(false); }
  };

  const quickActions = [
    { icon: '🎉', title: T.welcomeEmail, desc: T.welcomeDesc,
      action: async () => { setLoading(true); try { await apiFetch('/api/email/welcome', { method: 'POST' }, token); addToast(T.emailSent, 'success'); } catch(e){addToast(e.message,'error');} finally{setLoading(false);} }
    },
    { icon: '⚠️', title: T.pestAlert, desc: T.pestDesc,
      action: () => setForm({ subject: 'Pest Alert', body: 'Pest activity detected in your region. Please inspect your crops immediately.' })
    },
    { icon: '🌧️', title: T.rainAlert, desc: T.rainDesc,
      action: () => setForm({ subject: 'Rainfall Advisory', body: 'Heavy rainfall expected. Take necessary precautions for your crops.' })
    },
  ];

  return (
    <div className="page-body">
      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card card-p fade-up">
          <h3 style={{ fontSize: 15, marginBottom: 13 }}>{T.composeEmail}</h3>
          <div style={{ display: 'flex', gap: 7, marginBottom: 13 }}>
            {[['alert', 'Alert'], ['send', 'Custom']].map(([v, l]) => (
              <button key={v} className={`btn btn-sm ${type === v ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setType(v)}>{l}</button>
            ))}
          </div>
          <div className="input-group" style={{ marginBottom: 11 }}>
            <label className="label">{T.subject}</label>
            <input className="input" placeholder="Email subject…" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} />
          </div>
          <div className="input-group" style={{ marginBottom: 13 }}>
            <label className="label">{T.message}</label>
            <textarea className="input" rows={5} value={form.body}
              onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
              style={{ resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <button className="btn btn-primary btn-full" onClick={send} disabled={loading}>
            {loading ? <><div className="spinner" /> {T.sending}</> : <>✉ {T.sendEmail}</>}
          </button>
        </div>
        <div className="card card-p fade-up" style={{ animationDelay: '.1s' }}>
          <h3 style={{ fontSize: 15, marginBottom: 13 }}>{T.quickAct}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quickActions.map((item, i) => (
              <div key={i} className="stat-card" style={{ cursor: 'pointer' }} onClick={item.action}>
                <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                  <div className="stat-icon" style={{ background: 'var(--bg)', fontSize: 20, marginBottom: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Farmers
function AdminFarmers({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);
  const [farmers,  setFarmers]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try { setFarmers(await apiFetch('/api/admin/farmers', {}, token)); }
    catch (e) { addToast(e.message, 'error'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm(T.confirmDelF)) return;
    try { await apiFetch(`/api/admin/farmers/${id}`, { method: 'DELETE' }, token); addToast(T.farmerDel, 'info'); load(); }
    catch (e) { addToast(e.message, 'error'); }
  };

  return (
    <div className="page-body">
      <div className="card fade-up">
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 16 }}>{T.regFarmers}</h2>
            <p style={{ fontSize: 12.5, color: 'var(--muted)' }}>{farmers.length} {T.totalF}</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={load}>↻ {T.refresh}</button>
        </div>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div className="spinner" style={{ borderTopColor: 'var(--fern)', borderColor: 'rgba(78,106,56,.2)', margin: 'auto', width: 24, height: 24 }} />
          </div>
        ) : farmers.length === 0 ? (
          <div className="empty-state"><div className="icon">👨‍🌾</div><h3>{T.noFarmers}</h3><p>{T.noFarmersSub}</p></div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr>
                <th>{T.nameLbl}</th><th>Username</th><th>Email</th>
                <th>{T.locLbl}</th><th>Contact</th><th>{T.actionsLbl}</th>
              </tr></thead>
              <tbody>
                {farmers.map(f => (
                  <tr key={f.userId}>
                    <td><strong>{f.fullname}</strong></td>
                    <td style={{ color: 'var(--muted)' }}>@{f.username}</td>
                    <td>{f.email}</td>
                    <td>{f.district ? `${f.district}, ${f.state}` : '—'}</td>
                    <td>{f.contactNumber || '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 7 }}>
                        <button className="btn btn-ghost btn-sm" onClick={async () => { try { setSelected(await apiFetch(`/api/admin/farmers/${f.userId}`, {}, token)); } catch(e){addToast(e.message,'error');} }}>👁</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(f.userId)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.52)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 20 }}
          onClick={() => setSelected(null)}>
          <div className="card" style={{ maxWidth: 450, width: '100%', padding: 24 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ color: 'var(--text)' }}>{selected.fullname}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="form-grid" style={{ rowGap: 12 }}>
              {[['Username', selected.username], ['Email', selected.email], ['Contact', selected.contactNumber],
                ['Address', selected.address], ['Village', selected.village], ['District', selected.district],
                ['State', selected.state], ['Pincode', selected.pincode], ['Farm', selected.farmLocation],
              ].filter(([, v]) => v).map(([l, v]) => (
                <div key={l}><div className="label">{l}</div><div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{v}</div></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ page }) {
  const { language } = useSelector(s => s.settings);
  const T = getT(language);
  const meta = {
    dashboard: [T.dashboard, 'Overview of your farm'],
    crop:      [T.crop,      'ML-powered crop prediction'],
    disease:   [T.disease,   'Upload leaf images for analysis'],
    ai:        [T.ai,        'Expert AI-generated guidance'],
    weather:   [T.weather,   'Live weather for your location'],
    profile:   [T.profile,   'Manage farmer information'],
    email:     [T.email,     'Send notifications & alerts'],
    admin:     [T.admin,     'View & manage all farmers'],
  }[page] || [page, ''];

  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{meta[0]}</div>
        <div className="topbar-sub">{meta[1]}</div>
      </div>
    </header>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const { user }     = useSelector(s => s.auth);
  const { theme }    = useSelector(s => s.settings);

  const [authMode,    setAuthMode]    = useState('login');
  const [page,        setPage]        = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts,      setToasts]      = useState([]);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3400);
  };

  // Auth screens
  if (!user) {
    return (
      <>
        <GlobalStyle />
        <Toasts toasts={toasts} />
        {authMode === 'login'
          ? <Login  onSwitch={() => setAuthMode('signup')} addToast={addToast} />
          : <Signup onSwitch={() => setAuthMode('login')}  addToast={addToast} />
        }
      </>
    );
  }

  const pages = {
    dashboard: <Home       setPage={setPage} />,
    crop:      <CropRecommendation addToast={addToast} />,
    disease:   <DiseaseDetection   addToast={addToast} />,
    ai:        <AiAdvisory         addToast={addToast} />,
    weather:   <Weather            addToast={addToast} />,
    profile:   <FarmerProfile      addToast={addToast} />,
    email:     <EmailAlerts        addToast={addToast} />,
    admin:     <AdminFarmers       addToast={addToast} />,
  };

  return (
    <>
      <GlobalStyle />
      <Toasts toasts={toasts} />
      <div className="layout">
        <Navbar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="main-content">
          <Topbar page={page} />
          {pages[page] || (
            <div className="page-body">
              <div className="empty-state"><div className="icon">🔍</div><h3>Page not found</h3></div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
