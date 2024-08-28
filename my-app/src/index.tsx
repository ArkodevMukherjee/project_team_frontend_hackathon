import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import Tailwind CSS
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);
