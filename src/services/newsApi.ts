// Интерфейсы для типизации данных NewsAPI
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

import { logError, logWarning, addBreadcrumb } from '../utils/sentry';

// Конфигурация API
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

// Проверка наличия API ключа
if (!API_KEY) {
  const error = new Error('NewsAPI ключ не найден в переменных окружения');
  logError(error, { context: 'newsApi_initialization' });
}

// Базовая функция для запросов к NewsAPI
async function fetchNews(endpoint: string, params: Record<string, string> = {}): Promise<NewsResponse> {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  
  // Добавляем API ключ и параметры
  url.searchParams.append('apiKey', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  addBreadcrumb(`Fetching news from ${endpoint}`, 'api_request');

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const error = new Error(`NewsAPI Error: ${response.status} ${response.statusText}`);
      logError(error, { 
        endpoint, 
        params, 
        status: response.status,
        statusText: response.statusText 
      });
      throw error;
    }
    
    const data: NewsResponse = await response.json();
    
    addBreadcrumb(`Successfully fetched ${data.articles.length} articles`, 'api_success');
    
    return data;
  } catch (error) {
    logError(error as Error, { 
      context: 'fetchNews', 
      endpoint, 
      params 
    });
    throw error;
  }
}

// Получение главных новостей (технологии)
export async function getTechNews(pageSize: number = 6): Promise<NewsArticle[]> {
  try {
    addBreadcrumb('Fetching tech news', 'news_category');
    
    const data = await fetchNews('everything', {
      q: 'технологии OR искусственный интеллект OR квантовые вычисления OR кибербезопасность OR инновации',
      language: 'ru',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString()
    });
    
    const filteredArticles = data.articles.filter(article => 
      article.title && 
      article.urlToImage && 
      !article.title.includes('[Removed]')
    );

    if (filteredArticles.length === 0) {
      logWarning('No tech news articles found after filtering', { 
        originalCount: data.articles.length,
        pageSize 
      });
    }
    
    return filteredArticles;
  } catch (error) {
    logError(error as Error, { 
      context: 'getTechNews', 
      pageSize 
    });
    return [];
  }
}

// Получение текстовых новостей (наука и технологии)
export async function getScienceNews(pageSize: number = 5): Promise<NewsArticle[]> {
  try {
    addBreadcrumb('Fetching science news', 'news_category');
    
    const data = await fetchNews('everything', {
      q: 'наука OR исследования OR открытие OR прорыв OR научные достижения OR образование',
      language: 'ru',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString()
    });
    
    const filteredArticles = data.articles.filter(article => 
      article.title && 
      article.description && 
      !article.title.includes('[Removed]')
    );

    if (filteredArticles.length === 0) {
      logWarning('No science news articles found after filtering', { 
        originalCount: data.articles.length,
        pageSize 
      });
    }
    
    return filteredArticles;
  } catch (error) {
    logError(error as Error, { 
      context: 'getScienceNews', 
      pageSize 
    });
    return [];
  }
}

// Получение важных новостей для карусели
export async function getImportantNews(pageSize: number = 5): Promise<NewsArticle[]> {
  try {
    addBreadcrumb('Fetching important news', 'news_category');
    
    const data = await fetchNews('top-headlines', {
      country: 'ru',
      pageSize: pageSize.toString()
    });
    
    const filteredArticles = data.articles.filter(article => 
      article.title && 
      article.urlToImage && 
      !article.title.includes('[Removed]')
    );

    if (filteredArticles.length === 0) {
      logWarning('No important news articles found after filtering', { 
        originalCount: data.articles.length,
        pageSize 
      });
    }
    
    return filteredArticles;
  } catch (error) {
    logError(error as Error, { 
      context: 'getImportantNews', 
      pageSize 
    });
    return [];
  }
}

// Утилитарные функции
export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Только что';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'час' : diffInHours < 5 ? 'часа' : 'часов'} назад`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'день' : diffInDays < 5 ? 'дня' : 'дней'} назад`;
    }
  } catch (error) {
    logError(error as Error, { 
      context: 'formatTimeAgo', 
      dateString 
    });
    return 'Неизвестно';
  }
}

export function getNewsCategory(article: NewsArticle): string {
  try {
    const title = article.title.toLowerCase();
    const description = (article.description || '').toLowerCase();
    const content = title + ' ' + description;
    
    if (content.includes('ии') || content.includes('искусственный интеллект') || content.includes('машинное обучение')) {
      return 'ИИ';
    } else if (content.includes('квант') || content.includes('вычисления')) {
      return 'КВАНТУМ';
    } else if (content.includes('космос') || content.includes('роскосмос') || content.includes('ракета')) {
      return 'КОСМОС';
    } else if (content.includes('кибер') || content.includes('безопасность') || content.includes('хакер')) {
      return 'КИБЕР';
    } else if (content.includes('блокчейн') || content.includes('криптовалют')) {
      return 'БЛОКЧЕЙН';
    } else if (content.includes('наука') || content.includes('исследован')) {
      return 'НАУКА';
    } else if (content.includes('образован') || content.includes('университет')) {
      return 'ОБРАЗОВАНИЕ';
    } else {
      return 'ТЕХНОЛОГИИ';
    }
  } catch (error) {
    logError(error as Error, { 
      context: 'getNewsCategory', 
      articleTitle: article.title 
    });
    return 'ТЕХНОЛОГИИ';
  }
}