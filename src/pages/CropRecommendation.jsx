import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getT } from '../features/counterslice';

const API = 'http://localhost:8080';

async function apiFetch(path, opts = {}, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers: { ...headers, ...opts.headers } });
  if (!res.ok) { const e = await res.text(); throw new Error(e || `HTTP ${res.status}`); }
  const ct = res.headers.get('content-type');
  return ct?.includes('json') ? res.json() : res.text();
}

export default function CropRecommendation({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);

  const [form, setForm] = useState({
    temperature: '', humidity: '', rainfall: '', ph: '',
    nitrogen: '', phosphorus: '', potassium: '', location: '',
  });
  const [loading,   setLoading]   = useState(false);
  const [result,    setResult]    = useState(null);
  const [search,    setSearch]    = useState('');
  const [sResult,   setSResult]   = useState(null);
  const [searching, setSearching] = useState(false);

  const fields = [
    { k: 'temperature', l: T.temperature }, { k: 'humidity',   l: T.humidity   },
    { k: 'rainfall',    l: T.rainfall    }, { k: 'ph',         l: T.ph         },
    { k: 'nitrogen',    l: T.nitrogen    }, { k: 'phosphorus', l: T.phosphorus },
    { k: 'potassium',   l: T.potassium   }, { k: 'location',   l: T.location   },
  ];

  const submit = async () => {
    const payload = {};
    for (const f of fields) {
      if (f.k === 'location') { payload[f.k] = form[f.k]; continue; }
      if (!form[f.k]) { addToast(`Enter ${f.l}`, 'error'); return; }
      payload[f.k] = parseFloat(form[f.k]);
    }
    setLoading(true); setResult(null);
    try {
      const data = await apiFetch('/api/ml/recommend-crop', { method: 'POST', body: JSON.stringify(payload) }, token);
      setResult(data); addToast(T.cropReady, 'success');
    } catch (e) { addToast(e.message, 'error'); }
    finally { setLoading(false); }
  };

  const doSearch = async () => {
    if (!search.trim()) return;
    setSearching(true); setSResult(null);
    try {
      const data = await apiFetch(`/api/ml/crop/${search.trim()}`, {}, token);
      setSResult(data);
    } catch { addToast(T.cropNF, 'error'); }
    finally { setSearching(false); }
  };

  return (
    <div className="page-body">
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left */}
        <div>
          <div className="card card-p fade-up" style={{ marginBottom: 18 }}>
            <div className="section-head">
              <div>
                <h2 style={{ fontSize: 16 }}>{T.soilParams}</h2>
                <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{T.soilSub}</p>
              </div>
            </div>
            <div className="form-grid">
              {fields.map(f => (
                <div className="input-group" key={f.k}>
                  <label className="label">{f.l}</label>
                  <input className="input" placeholder="0.0"
                    value={form[f.k]}
                    onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-full" style={{ marginTop: 18 }} onClick={submit} disabled={loading}>
              {loading ? <><div className="spinner" /> {T.analyzing}</> : <>🌾 {T.getCrop}</>}
            </button>
          </div>

          {/* Search */}
          <div className="card card-p fade-up" style={{ animationDelay: '.1s' }}>
            <h3 style={{ fontSize: 14, marginBottom: 11 }}>{T.searchCrops}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" style={{ flex: 1 }} placeholder="rice, wheat…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch()}
              />
              <button className="btn btn-secondary" onClick={doSearch} disabled={searching}>
                {searching ? <div className="spinner" style={{ borderTopColor: 'var(--fern)', borderColor: 'rgba(78,106,56,.2)' }} /> : '🔍'}
              </button>
            </div>
            {sResult?.map((c, i) => (
              <div key={i} style={{ padding: '9px 0', borderBottom: '1px solid var(--border2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 13.5 }}>{c.cropName}</strong>
                  <span className="badge badge-green">{(c.cropConfidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          {result ? (
            <div className="fade-in">
              <div className="result-card" style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12.5, opacity: .8, marginBottom: 7 }}>{T.recCrop}</div>
                <div className="result-crop">🌾 {result.cropName}</div>
                <div style={{ fontSize: 13.5, opacity: .8 }}>{T.conf}: {(result.cropConfidence * 100).toFixed(1)}%</div>
                <div className="conf-bar"><div className="conf-fill" style={{ width: `${result.cropConfidence * 100}%` }} /></div>
              </div>
              {result.explanation && (
                <div className="card card-p">
                  <h3 style={{ fontSize: 14, marginBottom: 11 }}>🤖 {T.aiExp}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>{result.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">
                <div className="icon">🌱</div>
                <h3>{T.noPred}</h3>
                <p>{T.fillSoil}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
