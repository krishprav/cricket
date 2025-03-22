'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import PlayerCard from '@/components/PlayerCard';

export default function TeamDetailsPage() {
  const params = useParams();
  const teamId = params.id;
  
  const [teamDetails, setTeamDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/api/teams/${teamId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch team details');
        }
        
        const data = await response.json();
        setTeamDetails(data);
      } catch (err) {
        console.error(`Error fetching team details for ID ${teamId}:`, err);
        setError('Failed to load team details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (teamId) {
      fetchTeamDetails();
    }
  }, [API_BASE_URL, teamId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error || !teamDetails) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error || 'Failed to load team details'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">{teamDetails.name}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Players</h2>
          
          {teamDetails.players && teamDetails.players.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamDetails.players.map((player, index) => (
                <PlayerCard key={index} player={{ name: player, id: `${teamId}-${index}` }} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No players information available</p>
          )}
        </div>
      </div>
    </div>
  );
}
