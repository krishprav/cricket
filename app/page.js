// app/page.js
'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LiveMatchCard from '@/components/LiveMatchCard';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('live');
  const [visitCount, setVisitCount] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Enhanced fetch function with error handling
  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const endpoint = activeTab === 'recent' ? 'recent' : 
                      activeTab === 'upcoming' ? 'upcoming' : 'live';
      
      const response = await fetch(`${API_BASE_URL}/api/matches/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch matches');
      }

      const data = await response.json();
      setMatches(data.matches || []);
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load match data 🏏');
    } finally {
      setIsLoading(false);
    }
  };

  // Track visits only in production
  const trackVisit = async () => {
    if (process.env.NODE_ENV === 'production') {
      try {
        await fetch(`${API_BASE_URL}/api/visits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Visit tracking failed:', error);
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await trackVisit();
      await fetchMatches();
    };
    initialize();

    const intervalId = setInterval(fetchMatches, 60000);
    return () => clearInterval(intervalId);
  }, [activeTab]);

  // Get visit count
  useEffect(() => {
    const getVisitCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/visits`);
        const data = await response.json();
        setVisitCount(data.count);
      } catch (error) {
        console.error('Failed to get visit count:', error);
      }
    };

    if (process.env.NODE_ENV === 'production') {
      getVisitCount();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-6 pt-24">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 p-4 rounded-lg mb-6 flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            <p className="text-red-300">{error}</p>
            <button 
              onClick={fetchMatches}
              className="ml-auto px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <motion.div 
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {matches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </motion.div>
        )}
      </main>

    </div>
  );
}