import React from 'react';
import Header from '../components/Header';
import NewsGrid from '../components/NewsGrid';
import TextNews from '../components/TextNews';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
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

      <Header />

      <main className="relative z-10">
        {/* Featured Article Section */}
        <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Актуальные новости 2025
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-cyan-400 mb-8 uppercase tracking-wider">
              Главные новости
            </h2>
            <NewsGrid />
          </div>
        </section>

        {/* Text News Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-400 mb-8 uppercase tracking-wider">
              Новости технологий
            </h2>
            <TextNews />
          </div>
        </section>

        {/* Important News Carousel */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;