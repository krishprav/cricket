// components/Stats.js
"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Stats({ apiBaseUrl }) {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [visitsRes, onlineRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/visits`),
        ]);
        
        const visitsData = await visitsRes.json();
        
        setVisitors(visitsData.count);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60 * 1000);
    return () => clearInterval(interval);
  }, [apiBaseUrl]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-gradient-to-br from-gray-800/60 to-gray-900/50 p-3 rounded-xl backdrop-blur-lg border border-gray-700/30 shadow-2xl"
    >
      <div className="flex flex-col space-y-3 text-sm">
        {visitors !== null && (
          <div className="flex items-center space-x-2 group">
            <motion.div 
              className="text-blue-400 relative"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </motion.div>
            <span className="text-gray-300 font-medium">
              Visitors: <span className="text-blue-400 ml-1">{visitors.toLocaleString()}</span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}