import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './md.scss';

import App from './components/App';

createRoot(document.getElementById('app')!).render(React.createElement(App));
