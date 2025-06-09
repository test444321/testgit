import React, { useState, useEffect } from 'react';
import { getTechNews, NewsArticle, getNewsCategory } from '../services/newsApi';
import { ExternalLink } from 'lucide-react';

const NewsGrid: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const articles = await getTechNews(6);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 animate-pulse">
            <div className="aspect-video bg-gray-700"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-700 rounded mb-2 w-20"></div>
              <div className="h-6 bg-gray-700 rounded"></div>
            </div>
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
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article, index) => (
        <article
          key={`${article.url}-${index}`}
          className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
          onClick={() => window.open(article.url, '_blank')}
        >
          <div className="aspect-video overflow-hidden relative">
            <img
              src={article.urlToImage || 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800&h=450'}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800&h=450';
              }}
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-5 w-5 text-white bg-black bg-opacity-50 rounded p-1" />
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-300 bg-purple-900/30 rounded border border-purple-500">
                {getNewsCategory(article)}
              </span>
              <span className="text-xs text-gray-400">
                {article.source.name}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {article.title}
            </h3>
            {article.description && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {article.description}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsGrid;