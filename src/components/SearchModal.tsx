import React, { useState, useEffect } from 'react';
import { Search, X, ExternalLink, Clock, User } from 'lucide-react';
import { NewsArticle, getNewsCategory, formatTimeAgo } from '../services/newsApi';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNews: NewsArticle[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, allNews }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNews([]);
      return;
    }

    const filtered = allNews.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.source.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredNews(filtered.slice(0, 10)); // Limit to 10 results
  }, [searchTerm, allNews]);

  const handleClose = () => {
    setSearchTerm('');
    setFilteredNews([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-start justify-center pt-20">
      <div className="bg-gray-800 rounded-lg border border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)] w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Search className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-gray-100">Поиск новостей</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Введите запрос для поиска..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:outline-none text-lg"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-96">
          {searchTerm.trim() === '' ? (
            <div className="p-8 text-center text-gray-400">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Начните вводить для поиска новостей</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p>Новости по запросу "{searchTerm}" не найдены</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredNews.map((article, index) => (
                <article
                  key={`${article.url}-${index}`}
                  className="group cursor-pointer bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  onClick={() => {
                    window.open(article.url, '_blank');
                    handleClose();
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-cyan-300 bg-cyan-900/30 rounded border border-cyan-500">
                          {getNewsCategory(article)}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h4>
                      {article.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                          {article.description}
                        </p>
                      )}
                      <div className="flex items-center text-gray-500 text-xs space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{article.source.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;