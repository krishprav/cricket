// components/Stats.js
"use client";
import { useEffect, useState } from 'react';

export default function Stats({ apiBaseUrl }) {
  const [visitors, setVisitors] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [visitsRes, onlineRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/visits`),
          fetch(`${apiBaseUrl}/api/online`),
        ]);
        
        const visitsData = await visitsRes.json();
        const onlineData = await onlineRes.json();
        
        setVisitors(visitsData.count);
        setOnlineUsers(onlineData.count);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60 * 1000);
    return () => clearInterval(interval);
  }, [apiBaseUrl]);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex space-x-4 text-sm text-gray-300">
        {visitors !== null && (
          <div className="flex items-center">
            <span className="mr-1">👥</span>
            Visitors: {visitors.toLocaleString()}
          </div>
        )}
        {onlineUsers !== null && (
          <div className="flex items-center">
            <span className="mr-1">🌐</span>
            Online: {onlineUsers}
          </div>
        )}
      </div>
    </div>
  );
}