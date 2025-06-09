import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Clock, User, ExternalLink, Phone } from 'lucide-react';
import { NewsArticle } from '../services/newsApi';
import SearchModal from '../components/SearchModal';
import { useAllNews } from '../hooks/useAllNews';

const SciencePage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleNews, setVisibleNews] = useState(6);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { allNews } = useAllNews();

  useEffect(() => {
    const fetchScienceNews = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
        
        const url = new URL(`${BASE_URL}/everything`);
        url.searchParams.append('apiKey', API_KEY);
        url.searchParams.append('q', 'наука OR образование OR исследования OR университет OR открытие OR научные достижения OR обучение OR академия');
        url.searchParams.append('language', 'ru');
        url.searchParams.append('sortBy', 'publishedAt');
        url.searchParams.append('pageSize', '20');

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`NewsAPI Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const filteredArticles = data.articles.filter((article: NewsArticle) => 
          article.title && 
          article.description && 
          !article.title.includes('[Removed]')
        );
        
        setNews(filteredArticles);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить новости науки и образования');
        console.error('Ошибка загрузки новостей:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScienceNews();
  }, []);

  const formatTimeAgo = (dateString: string): string => {
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
  };

  const loadMoreNews = () => {
    setVisibleNews(prev => prev + 6);
  };

  const scrollToContacts = () => {
    const contactsElement = document.getElementById('contacts');
    if (contactsElement) {
      contactsElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Cyberpunk background pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 79px, rgba(6,182,212,0.3) 79px, rgba(6,182,212,0.3) 81px, transparent 81px),
              linear-gradient(transparent 79px, rgba(168,85,247,0.3) 79px, rgba(168,85,247,0.3) 81px, transparent 81px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        {/* Header */}
        <header className="bg-gray-900 border-b border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/">
                  <h1 className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
                    <span className="text-purple-400">Точка</span>{' '}
                    <span className="text-cyan-400">зрения</span>
                  </h1>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] border-b-2 border-transparent hover:border-cyan-400"
                  >
                    Вернуться к новостям
                  </Link>
                  <Link
                    to="/weather"
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] border-b-2 border-transparent hover:border-cyan-400"
                  >
                    Погода
                  </Link>
                  <button
                    onClick={scrollToContacts}
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] border-b-2 border-transparent hover:border-cyan-400"
                  >
                    Контакты
                  </button>
                </div>
              </nav>

              {/* Search */}
              <div className="flex items-center">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-300 hover:text-cyan-400 p-2 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button className="md:hidden ml-2 text-gray-300 hover:text-cyan-400 p-2">
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          {/* Title Section */}
          <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Наука и образование
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </section>

          {/* News Content */}
          <section className="py-16 bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {loading ? (
                <div className="space-y-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 animate-pulse">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-6 bg-gray-700 rounded w-32"></div>
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
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4 text-xl">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Попробовать снова
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {news.slice(0, visibleNews).map((article, index) => (
                      <article
                        key={`${article.url}-${index}`}
                        className="group cursor-pointer bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-300 bg-green-900/30 rounded-full border border-green-500">
                            {article.title.toLowerCase().includes('образован') ? 'ОБРАЗОВАНИЕ' : 'НАУКА'}
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

                  {/* Load More Button */}
                  {visibleNews < news.length && (
                    <div className="text-center mt-12">
                      <button
                        onClick={loadMoreNews}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                      >
                        Еще новости
                      </button>
                    </div>
                  )}

                  {news.length === 0 && !loading && (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-xl">Новости не найдены</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contacts" className="bg-gray-900 border-t border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contacts */}
              <div className="flex items-center space-x-6">
                <h3 className="text-2xl font-semibold text-purple-400 uppercase tracking-wider">
                  Контакты
                </h3>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-cyan-400" />
                  <a
                    href="tel:+79999999999"
                    className="text-gray-300 hover:text-cyan-400 transition-colors text-2xl font-bold"
                  >
                    +79999999999
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-right">
                <h3 className="text-2xl font-semibold text-purple-400 mb-4 uppercase tracking-wider">
                  Мы в соцсетях
                </h3>
                <div className="flex justify-end space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <span className="text-white text-sm font-bold">VK</span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <span className="text-white text-sm font-bold">TG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attribution */}
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-xl">
                Создано вместе с{' '}
                <a
                  href="https://open-college.ru/?utm_medium=promo&utm_source=maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center space-x-2 hover:underline font-bold"
                >
                  <span>Московский городской открытый колледж</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allNews={allNews}
      />
    </>
  );
};

export default SciencePage;