import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import SearchModal from './SearchModal';
import { useAllNews } from '../hooks/useAllNews';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { allNews } = useAllNews();

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
      <header className="bg-gray-900 border-b border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
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
                  to="/science"
                  className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] border-b-2 border-transparent hover:border-cyan-400"
                >
                  Наука и образование
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

            {/* Search Icon */}
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

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allNews={allNews}
      />
    </>
  );
};

export default Header;