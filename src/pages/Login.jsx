import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../app/store';
import { getT } from '../features/counterslice';

const API = 'http://localhost:8080';

export default function Login({ onSwitch, addToast }) {
  const dispatch = useDispatch();
  const { language } = useSelector(s => s.settings);
  const T = getT(language);

  const [form, setForm]       = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) { addToast(T.fillFields, 'error'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { addToast(T.invalidCreds, 'error'); return; }
      const data = await res.json();
      let jwt = data.jwtToken || '';
      if (jwt.includes('=')) jwt = jwt.split('=')[1]?.split(';')[0] || jwt;
      dispatch(setCredentials({
        user:  { id: data.id, username: data.username, roles: data.roles },
        token: jwt,
      }));
      addToast(`Welcome, ${data.username}!`, 'success');
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-up">
        <div className="auth-logo">
          <div style={{ fontSize: 40, marginBottom: 10 }}>🌿</div>
          <h1>AgriSmart</h1>
          <p>{T.signin}</p>
        </div>
        <div className="auth-form">
          {[
            { key: 'username', lbl: T.username,  type: 'text',     ph: 'your_username' },
            { key: 'password', lbl: T.password,  type: 'password', ph: '••••••••'       },
          ].map(f => (
            <div className="input-group" key={f.key}>
              <label className="label">{f.lbl}</label>
              <input
                className="input" type={f.type} placeholder={f.ph}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && submit()}
              />
            </div>
          ))}
          <button className="btn btn-primary btn-full btn-lg" onClick={submit} disabled={loading}>
            {loading ? <><div className="spinner" /> {T.signingIn}</> : T.signin}
          </button>
        </div>
        <p className="auth-switch">
          {T.noAccount} <button onClick={onSwitch}>{T.register}</button>
        </p>
      </div>
    </div>
  );
}
