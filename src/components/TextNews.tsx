import React, { useState, useEffect } from 'react';
import { Clock, User, ExternalLink } from 'lucide-react';
import { getScienceNews, NewsArticle, formatTimeAgo, getNewsCategory } from '../services/newsApi';

const TextNews: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const articles = await getScienceNews(5);
        setNews(articles);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить новости');
        console.error('Ошибка загрузки новостей:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-gray-700 rounded w-20"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-700 rounded w-20"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded mt-2 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {news.map((article, index) => (
        <article
          key={`${article.url}-${index}`}
          className="group cursor-pointer bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]"
          onClick={() => window.open(article.url, '_blank')}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-green-300 bg-green-900/30 rounded-full border border-green-500">
              {getNewsCategory(article)}
            </span>
            <div className="flex items-center text-gray-400 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{article.author || article.source.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatTimeAgo(article.publishedAt)}</span>
              </div>
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-green-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {article.description || 'Описание недоступно'}
          </p>
        </article>
      ))}
    </div>
  );
};

export default TextNews;