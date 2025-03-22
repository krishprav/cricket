// app/players/[id]/page.js
'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PlayerDetailsPage() {
  const params = useParams();
  const playerId = params.id;
  
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/api/players/${playerId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch player details');
        }
        
        const data = await response.json();
        setPlayerDetails(data);
      } catch (err) {
        console.error(`Error fetching player details for ID ${playerId}:`, err);
        setError('Failed to load player details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerDetails();
    }
  }, [API_BASE_URL, playerId]);

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

  if (error || !playerDetails) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error || 'Failed to load player details'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">{playerDetails.name}</h1>
        {playerDetails.role && <p className="text-gray-600 mb-6">{playerDetails.role}</p>}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Career Statistics</h2>
          
          {playerDetails.stats && playerDetails.stats.batting ? (
            <div>
              <h3 className="text-lg font-medium mb-2">Batting Statistics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matches
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Runs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(playerDetails.stats.batting).map(([format, stats]) => (
                      <tr key={format}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {format}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stats.matches}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stats.runs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stats.average}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No statistics available</p>
          )}
          
          {playerDetails.stats && playerDetails.stats.bowling && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Bowling Statistics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matches
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wickets
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Economy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(playerDetails.stats.bowling).map(([format, stats]) => (
                      <tr key={format}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {format}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stats.matches}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stats.wickets}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stats.economy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
