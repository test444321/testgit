import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { getImportantNews, NewsArticle, getNewsCategory } from '../services/newsApi';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const articles = await getImportantNews(5);
        setNews(articles);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить важные новости');
        console.error('Ошибка загрузки важных новостей:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-100 uppercase tracking-wider">
              Важное
            </h2>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden border-2 border-yellow-500 animate-pulse">
          <div className="aspect-video bg-gray-700"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-100 uppercase tracking-wider">
              Важное
            </h2>
          </div>
        </div>
        <div className="text-center py-8 bg-gray-800 rounded-lg border-2 border-yellow-500">
          <p className="text-red-400 mb-4">{error || 'Нет доступных новостей'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Star className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-gray-100 uppercase tracking-wider">
            Важное
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {news.map((article, index) => (
            <div key={`${article.url}-${index}`} className="w-full flex-shrink-0">
              <article 
                className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                onClick={() => window.open(article.url, '_blank')}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={article.urlToImage || 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=800&h=450'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=800&h=450';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-yellow-900 bg-yellow-400 rounded-full">
                      {getNewsCategory(article)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-white">LIVE</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white bg-black bg-opacity-50 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-yellow-400 transition-colors">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-gray-300 mt-2 text-sm line-clamp-2">
                      {article.description}
                    </p>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;