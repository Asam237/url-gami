import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UrlShortener from './components/UrlShortener';
import UrlHistory from './components/UrlHistory';
import Stats from './components/Stats';
import { SavedUrl } from './types/url.types';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUrlCreated = (url: SavedUrl) => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-20">
        {/* URL Shortener Section */}
        <section>
          <UrlShortener onUrlCreated={handleUrlCreated} />
        </section>

        {/* Stats Section */}
        <section>
          <Stats refreshTrigger={refreshTrigger} />
        </section>

        {/* History Section */}
        <section>
          <UrlHistory refreshTrigger={refreshTrigger} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;