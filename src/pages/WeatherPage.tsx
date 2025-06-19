import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Cloud, 
  CloudRain,
  Phone,
  ExternalLink,
  Search,
  Menu
} from 'lucide-react';
import SearchModal from '../components/SearchModal';
import { useAllNews } from '../hooks/useAllNews';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    vis_km: number;
    uv: number;
    feelslike_c: number;
  };
}

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { allNews } = useAllNews();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          'http://api.weatherapi.com/v1/current.json?key=fb6b416878414b1692b100814250806&q=Moscow&aqi=no'
        );
        
        if (!response.ok) {
          throw new Error(`Weather API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        const errorMessage = 'Ошибка загрузки данных о погоде';
        setError(errorMessage);
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    try {
      const lowerCondition = condition.toLowerCase();
      if (lowerCondition.includes('rain') || lowerCondition.includes('дождь')) {
        return <CloudRain className="h-16 w-16 text-blue-400" />;
      } else if (lowerCondition.includes('cloud') || lowerCondition.includes('облач')) {
        return <Cloud className="h-16 w-16 text-gray-400" />;
      } else {
        return <Sun className="h-16 w-16 text-yellow-400" />;
      }
    } catch (error) {
      console.error('Error getting weather icon:', error);
      return <Sun className="h-16 w-16 text-yellow-400" />;
    }
  };

  const scrollToContacts = () => {
    try {
      const contactsElement = document.getElementById('contacts');
      if (contactsElement) {
        contactsElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.error('Error scrolling to contacts:', error);
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
                    to="/science"
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] border-b-2 border-transparent hover:border-cyan-400"
                  >
                    Наука и образование
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
                Погода в Москве
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </section>

          {/* Weather Content */}
          <section className="py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {loading ? (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
                  <p className="mt-4 text-xl text-gray-300">Загрузка данных о погоде...</p>
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
              ) : weather ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Main Weather Card */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300">
                    <div className="text-center">
                      <div className="flex justify-center mb-6">
                        {getWeatherIcon(weather.current.condition.text)}
                      </div>
                      <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                        {weather.location.name}
                      </h2>
                      <p className="text-gray-400 mb-6">{weather.current.condition.text}</p>
                      <div className="text-6xl font-bold text-white mb-4">
                        {Math.round(weather.current.temp_c)}°C
                      </div>
                      <p className="text-gray-300">
                        Ощущается как {Math.round(weather.current.feelslike_c)}°C
                      </p>
                    </div>
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Humidity */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <Droplets className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform" />
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{weather.current.humidity}%</p>
                          <p className="text-blue-300 text-sm">Влажность</p>
                        </div>
                      </div>
                    </div>

                    {/* Wind */}
                    <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <Wind className="h-8 w-8 text-green-400 group-hover:scale-110 transition-transform" />
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{Math.round(weather.current.wind_kph)}</p>
                          <p className="text-green-300 text-sm">км/ч {weather.current.wind_dir}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pressure */}
                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <Gauge className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{weather.current.pressure_mb}</p>
                          <p className="text-purple-300 text-sm">мбар</p>
                        </div>
                      </div>
                    </div>

                    {/* Visibility */}
                    <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-xl p-6 border border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <Eye className="h-8 w-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{weather.current.vis_km}</p>
                          <p className="text-yellow-300 text-sm">км</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
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

export default WeatherPage;