import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Инициализация Sentry
export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || '', // Добавьте ваш Sentry DSN в .env
    integrations: [
      new BrowserTracing({
        // Автоматическое отслеживание навигации
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
    
    // Настройки производительности
    tracesSampleRate: 1.0, // В продакшене установите меньшее значение, например 0.1
    
    // Настройки окружения
    environment: import.meta.env.MODE,
    
    // Дополнительные настройки
    beforeSend(event, hint) {
      // Фильтрация ошибок в development режиме
      if (import.meta.env.DEV) {
        console.log('Sentry Event:', event);
        console.log('Sentry Hint:', hint);
      }
      
      // Не отправляем ошибки в development
      if (import.meta.env.DEV) {
        return null;
      }
      
      return event;
    },
    
    // Настройки для отладки
    debug: import.meta.env.DEV,
  });
};

// Функция для логирования ошибок
export const logError = (error: Error, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    
    scope.setLevel('error');
    Sentry.captureException(error);
  });
  
  // Также логируем в консоль для разработки
  if (import.meta.env.DEV) {
    console.error('Error logged to Sentry:', error, context);
  }
};

// Функция для логирования предупреждений
export const logWarning = (message: string, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    
    scope.setLevel('warning');
    Sentry.captureMessage(message, 'warning');
  });
  
  if (import.meta.env.DEV) {
    console.warn('Warning logged to Sentry:', message, context);
  }
};

// Функция для логирования информационных сообщений
export const logInfo = (message: string, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    
    scope.setLevel('info');
    Sentry.captureMessage(message, 'info');
  });
  
  if (import.meta.env.DEV) {
    console.info('Info logged to Sentry:', message, context);
  }
};

// Функция для установки пользовательского контекста
export const setUserContext = (user: { id?: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Функция для добавления breadcrumb
export const addBreadcrumb = (message: string, category: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};

// React компонент для обработки ошибок
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Хук для отслеживания производительности
export const useSentryTransaction = (name: string) => {
  React.useEffect(() => {
    const transaction = Sentry.startTransaction({ name });
    
    return () => {
      transaction.finish();
    };
  }, [name]);
};