import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getT } from '../features/counterslice';

const API = 'http://localhost:8080';

export default function DiseaseDetection({ addToast }) {
  const { token }    = useSelector(s => s.auth);
  const { language } = useSelector(s => s.settings);
  const T = getT(language);

  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [drag,    setDrag]    = useState(false);
  const ref = useRef();

  const pick = f => {
    if (!f) return;
    setFile(f); setResult(null);
    const r = new FileReader();
    r.onload = e => setPreview(e.target.result);
    r.readAsDataURL(f);
  };

  const submit = async () => {
    if (!file) { addToast(T.pleaseUpload, 'error'); return; }
    setLoading(true); setResult(null);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${API}/api/disease/detect`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error('Detection failed');
      setResult(await res.json());
      addToast(T.analysisOk, 'success');
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Upload */}
        <div className="card card-p fade-up">
          <div className="section-head">
            <div>
              <h2 style={{ fontSize: 16 }}>{T.uploadLeaf}</h2>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{T.uploadSub}</p>
            </div>
          </div>

          <div
            className={`upload-zone ${drag ? 'dragging' : ''}`}
            onClick={() => ref.current?.click()}
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
          >
            {preview
              ? <img src={preview} alt="preview" style={{ width: '100%', maxHeight: 190, objectFit: 'contain', borderRadius: 8 }} />
              : <>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📸</div>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)' }}>
                    {T.dropImg} <strong style={{ color: 'var(--fern)' }}>{T.browse}</strong>
                  </p>
                  <p style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 5, opacity: .7 }}>{T.imgHint}</p>
                </>
            }
          </div>

          <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => pick(e.target.files[0])} />
          {file && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 7 }}>📎 {file.name}</p>}

          <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
            {file && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setFile(null); setPreview(null); setResult(null); }}>
                {T.clear}
              </button>
            )}
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={submit} disabled={loading || !file}>
              {loading ? <><div className="spinner" /> {T.detecting}</> : <>🔬 {T.detect}</>}
            </button>
          </div>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div className="fade-in">
              {result.predicted?.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ background: 'linear-gradient(135deg,#7a2010,#b03020)', borderRadius: 14, padding: 22, color: '#fff' }}>
                    <div style={{ fontSize: 12.5, opacity: .8, marginBottom: 5 }}>{T.detectedDisease}</div>
                    <div style={{ fontSize: 24, fontWeight: 800 }}>🔬 {p.diseaseName?.replace(/_/g, ' ')}</div>
                    <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>{T.conf}: {(p.confidence * 100).toFixed(1)}%</div>
                    <div className="conf-bar" style={{ marginTop: 9 }}>
                      <div className="conf-fill" style={{ width: `${p.confidence * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="card card-p">
                {result.fertilizerSuggestion && (
                  <div className="advisory-block" style={{ borderLeftColor: 'var(--leaf)', marginTop: 0 }}>
                    <h4>🌿 {T.fertSugg}</h4><p>{result.fertilizerSuggestion}</p>
                  </div>
                )}
                {result.pesticideSuggestion && (
                  <div className="advisory-block" style={{ borderLeftColor: 'var(--amber)' }}>
                    <h4 style={{ color: 'var(--amber)' }}>⚗️ {T.pestSugg}</h4><p>{result.pesticideSuggestion}</p>
                  </div>
                )}
                {result.explanation && (
                  <div className="advisory-block" style={{ borderLeftColor: 'var(--sky)' }}>
                    <h4 style={{ color: 'var(--sky)' }}>🤖 AI</h4><p>{result.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card" style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">
                <div className="icon">🔬</div>
                <h3>{T.noAnalysis}</h3>
                <p>{T.uploadFirst}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
