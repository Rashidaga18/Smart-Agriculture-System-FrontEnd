import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, toggleTheme, setLanguage } from '../app/store';
import { getT } from '../features/counterslice';

export default function Navbar({ page, setPage, open, setOpen }) {
  const dispatch = useDispatch();
  const { user }     = useSelector(s => s.auth);
  const { theme, language } = useSelector(s => s.settings);
  const T = getT(language);

  const isDark = theme === 'dark';
  const initial = user?.username?.[0]?.toUpperCase() || 'U';
  const roles   = user?.roles?.map(r => r.replace('ROLE_', '')).join(', ') || '';
  const isAdmin = user?.roles?.some(r => r.includes('ADMIN'));

  const mainNav = [
    { id: 'dashboard', icon: '⊞',  label: T.dashboard },
    { id: 'crop',      icon: '🌾', label: T.crop      },
    { id: 'disease',   icon: '🔬', label: T.disease   },
    { id: 'ai',        icon: '🤖', label: T.ai        },
    { id: 'weather',   icon: '🌤️', label: T.weather   },
    { id: 'profile',   icon: '👤', label: T.profile   },
    { id: 'email',     icon: '✉️',  label: T.email     },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          width: 255px; min-height: 100vh;
          background: var(--sb-bg);
          display: flex; flex-direction: column;
          position: fixed; left: 0; top: 0; z-index: 100;
          transition: transform .26s cubic-bezier(.4,0,.2,1);
          border-right: 1px solid rgba(255,255,255,.04);
        }
        .sidebar.open { transform: translateX(0) !important; }

        .sb-logo {
          padding: 22px 18px 16px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          display: flex; align-items: center; gap: 11px;
        }
        .sb-logo-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--fern); display: flex; align-items: center;
          justify-content: center; font-size: 19px; flex-shrink: 0;
        }
        .sb-logo-text h2 { color: var(--sb-text); font-size: 15px; font-weight: 700; line-height: 1.1; }
        .sb-logo-text span { color: var(--sb-muted); font-size: 11px; }

        .sb-nav { flex: 1; padding: 14px 10px; overflow-y: auto; }
        .sb-section { margin-bottom: 22px; }
        .sb-section-title {
          font-size: 10px; font-weight: 700; letter-spacing: 1.4px;
          color: var(--sb-muted); padding: 0 10px 8px;
          text-transform: uppercase;
        }
        .nav-item {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 11px; border-radius: 9px; width: 100%;
          color: var(--sb-muted); font-size: 13.5px; font-weight: 400;
          cursor: pointer; transition: all .14s ease; margin-bottom: 2px;
          border: none; background: none; text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-item:hover { background: var(--sb-hover); color: var(--sb-text); }
        .nav-item.active {
          background: var(--fern); color: #fff; font-weight: 600;
          box-shadow: 0 3px 12px rgba(78,106,56,.4);
        }
        .nav-item .ni { font-size: 15px; width: 20px; text-align: center; flex-shrink: 0; }

        .sb-footer { padding: 14px 10px; border-top: 1px solid rgba(255,255,255,.07); }

        .sb-controls { display: flex; gap: 5px; margin-bottom: 10px; }
        .ctrl-btn {
          flex: 1; padding: 7px 5px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.06);
          color: var(--sb-muted); font-size: 11.5px; font-weight: 600;
          cursor: pointer; transition: all .14s;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 3px;
        }
        .ctrl-btn:hover { background: var(--fern); color: #fff; border-color: var(--fern); }
        .ctrl-btn.active-ctrl { background: var(--fern); color: #fff; border-color: var(--fern); }

        .user-chip {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 10px; border-radius: 9px;
          background: rgba(255,255,255,.05); margin-bottom: 5px;
        }
        .sb-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--fern); display: flex;
          align-items: center; justify-content: center;
          color: #fff; font-size: 13px; font-weight: 700; flex-shrink: 0;
        }
        .u-name { color: var(--sb-text); font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .u-role { color: var(--sb-muted); font-size: 11px; }

        .signout-btn {
          display: flex; align-items: center; gap: 8px; width: 100%;
          padding: 8px 10px; border-radius: 8px; border: none;
          background: none; cursor: pointer; color: #f87171;
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; transition: background .14s;
        }
        .signout-btn:hover { background: rgba(248,113,113,.1); }

        .sb-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.5);
          z-index: 99; display: none;
        }
        .mob-fab {
          display: none; position: fixed; bottom: 22px; left: 22px; z-index: 200;
          width: 46px; height: 46px; border-radius: 50%;
          background: var(--fern); border: none; color: #fff;
          font-size: 20px; cursor: pointer;
          box-shadow: 0 4px 16px rgba(78,106,56,.45);
          align-items: center; justify-content: center;
        }

        @media (max-width: 900px) {
          .sidebar { transform: translateX(-100%); }
          .sb-overlay { display: block; }
          .mob-fab { display: flex; }
        }
      `}</style>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sb-logo">
          <div className="sb-logo-icon">🌿</div>
          <div className="sb-logo-text">
            <h2>{T.appName}</h2>
            <span>{T.appSub}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          <div className="sb-section">
            <div className="sb-section-title">{T.mainSection}</div>
            {mainNav.map(item => (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? 'active' : ''}`}
                onClick={() => { setPage(item.id); setOpen(false); }}
              >
                <span className="ni">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          {isAdmin && (
            <div className="sb-section">
              <div className="sb-section-title">{T.adminSection}</div>
              <button
                className={`nav-item ${page === 'admin' ? 'active' : ''}`}
                onClick={() => { setPage('admin'); setOpen(false); }}
              >
                <span className="ni">👥</span>{T.admin}
              </button>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="sb-footer">
          {/* Controls: theme + language */}
          <div className="sb-controls">
            <button
              className="ctrl-btn"
              onClick={() => dispatch(toggleTheme())}
              title={isDark ? T.lightMode : T.darkMode}
            >
              {isDark ? '☀️' : '🌙'}
              <span>{isDark ? T.lightMode : T.darkMode}</span>
            </button>
            <button
              className={`ctrl-btn ${language === 'en' ? 'active-ctrl' : ''}`}
              onClick={() => dispatch(setLanguage('en'))}
            >EN</button>
            <button
              className={`ctrl-btn ${language === 'hi' ? 'active-ctrl' : ''}`}
              onClick={() => dispatch(setLanguage('hi'))}
            >हि</button>
          </div>

          {/* User chip */}
          <div className="user-chip">
            <div className="sb-avatar">{initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="u-name">{user?.username}</div>
              <div className="u-role">{roles}</div>
            </div>
          </div>

          <button className="signout-btn" onClick={() => dispatch(clearCredentials())}>
            ↩ {T.signout}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="sb-overlay" onClick={() => setOpen(false)} />}

      {/* Mobile FAB */}
      <button className="mob-fab" onClick={() => setOpen(p => !p)}>☰</button>
    </>
  );
}
