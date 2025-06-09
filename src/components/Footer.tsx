import React from 'react';
import { Phone, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contacts" className="bg-gray-900 border-t border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-4 uppercase tracking-wider">
              Контакты
            </h3>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-cyan-400" />
              <a
                href="tel:+79999999999"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-lg"
              >
                +79999999999
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-4 uppercase tracking-wider">
              Мы в соцсетях
            </h3>
            <div className="flex space-x-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VK</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">TG</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">FB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Создано вместе с{' '}
            <a
              href="https://open-college.ru/?utm_medium=promo&utm_source=maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center space-x-1 hover:underline"
            >
              <span>Московский городской открытый колледж</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;