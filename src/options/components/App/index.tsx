import { useState, FC } from 'react';
import { CssBaseline } from '@mui/material';
import About from '../About';
import Settings from '../Settings';
import AppThemeProvider from '../AppThemeProvider';
import RootHost from '../RootHost';
import './index.scss';

const VERSION = window.EXT_VERSION;

const PAGES: Array<{
  id: string;
  title: string;
  component: FC<{
    version: string;
  }>;
}> = [
  {
    id: 'settings',
    title: chrome.i18n.getMessage('settings'),
    component: Settings,
  },
  {
    id: 'about',
    title: chrome.i18n.getMessage('about'),
    component: About,
  },
];

export default function App() {
  const [currentPageId, setCurrentPageId] = useState('settings');
  const Component = PAGES.find((item) => item.id === currentPageId)?.component;

  return (
    <AppThemeProvider>
      <main className="app">
        <CssBaseline />
        <div className="navigation">
          <div className="nav">
            <h1 className="nav-header">Menu fish</h1>
            <ul className="nav-list" id="nav-list">
              {PAGES.map(({ id, title }) => (
                <li key={id} className={currentPageId === id ? 'selected' : ''}>
                  <button type="button" onClick={() => setCurrentPageId(id)}>
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="main-container">
          {Component ? <Component version={VERSION} /> : null}
        </div>
      </main>
      <RootHost />
    </AppThemeProvider>
  );
}
