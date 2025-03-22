// app/teams/page.js
'use client'

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TeamCard from '@/components/TeamCard';
import { useToast } from '@/components/ui/use-toast';

const CACHE_KEY = 'teamsData';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setTeams(data);
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));

      setTeams(data);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error loading teams",
        description: err.message,
        variant: "destructive",
      });
      
      // Fallback to cached data if available
      if (cachedData) {
        setTeams(JSON.parse(cachedData).data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Cricket Teams</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <button 
              onClick={fetchTeams}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <TeamCard 
                key={team.id} 
                team={{
                  ...team,
                  // Fallback to default flag if missing
                  flag: team.flag || '🏏'
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}