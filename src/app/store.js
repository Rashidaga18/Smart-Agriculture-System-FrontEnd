import { createSlice, configureStore } from '@reduxjs/toolkit';

// ── AUTH SLICE ─────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:  JSON.parse(sessionStorage.getItem('sas_user'))  || null,
    token: sessionStorage.getItem('sas_token') || null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user  = payload.user;
      state.token = payload.token;
      sessionStorage.setItem('sas_user',  JSON.stringify(payload.user));
      sessionStorage.setItem('sas_token', payload.token);
    },
    clearCredentials: (state) => {
      state.user  = null;
      state.token = null;
      sessionStorage.clear();
    },
  },
});

// ── SETTINGS SLICE ─────────────────────────────────────────────────────────
const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme:    localStorage.getItem('sas_theme')    || 'light',
    language: localStorage.getItem('sas_language') || 'en',
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('sas_theme', state.theme);
      document.documentElement.setAttribute('data-theme', state.theme);
    },
    setLanguage: (state, { payload }) => {
      state.language = payload;
      localStorage.setItem('sas_language', payload);
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const { toggleTheme, setLanguage }         = settingsSlice.actions;

export const store = configureStore({
  reducer: {
    auth:     authSlice.reducer,
    settings: settingsSlice.reducer,
  },
});
