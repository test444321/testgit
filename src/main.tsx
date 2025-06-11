import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';
import { initSentry } from './utils/sentry';

// Инициализируем Sentry
initSentry();

// Оборачиваем App в Sentry ErrorBoundary
const SentryApp = Sentry.withErrorBoundary(App, {
  fallback: ({ error, resetError }) => (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Произошла ошибка</h1>
        <p className="text-gray-300 mb-6">Мы уже знаем об этой проблеме и работаем над её исправлением.</p>
        <button 
          onClick={resetError}
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Попробовать снова
        </button>
        {import.meta.env.DEV && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-yellow-400">Детали ошибки (только в режиме разработки)</summary>
            <pre className="mt-2 p-4 bg-gray-800 rounded text-sm overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  ),
  showDialog: false,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SentryApp />
    </BrowserRouter>
  </StrictMode>
);