import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getT } from '../features/counterslice';

const API = 'http://localhost:8080';

export default function Signup({ onSwitch, addToast }) {
  const { language } = useSelector(s => s.settings);
  const T = getT(language);

  const [form, setForm]       = useState({ username: '', email: '', password: '', role: 'ROLE_FARMER' });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) { addToast(T.fillFields, 'error'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: [form.role] }),
      });
      if (!res.ok) throw new Error('Registration failed');
      addToast(T.regSuccess, 'success');
      onSwitch();
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
          <div style={{ fontSize: 40, marginBottom: 10 }}>🌱</div>
          <h1>AgriSmart</h1>
          <p>{T.signup}</p>
        </div>
        <div className="auth-form">
          {[
            { key: 'username', lbl: T.username, type: 'text',     ph: 'farmer_name'    },
            { key: 'email',    lbl: T.emailLbl, type: 'email',    ph: 'you@example.com' },
            { key: 'password', lbl: T.password, type: 'password', ph: 'Min. 6 chars'   },
          ].map(f => (
            <div className="input-group" key={f.key}>
              <label className="label">{f.lbl}</label>
              <input
                className="input" type={f.type} placeholder={f.ph}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          <div className="input-group">
            <label className="label">{T.role}</label>
            <select
              className="input"
              value={form.role}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
            >
              <option value="ROLE_FARMER">{T.farmerRole}</option>
              <option value="ROLE_ADMIN">{T.adminRole}</option>
            </select>
          </div>
          <button className="btn btn-primary btn-full btn-lg" onClick={submit} disabled={loading}>
            {loading ? <><div className="spinner" /> {T.creating}</> : T.signup}
          </button>
        </div>
        <p className="auth-switch">
          {T.haveAccount} <button onClick={onSwitch}>{T.signin}</button>
        </p>
      </div>
    </div>
  );
}
