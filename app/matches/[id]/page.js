'use client'

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScoreCard from '@/components/ScoreCard';
import BattingScoreTable from '@/components/BattingScoreTable';
import BowlingScoreTable from '@/components/BowlingScoreTable';
import SocialShare from '@/components/SocialShare';

export default function MatchDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const matchId = params.id;
  const [matchDetails, setMatchDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const isShared = searchParams.get('shared');

  useEffect(() => {
    // Add watermark if shared
    if (isShared) {
      const watermark = document.createElement('div');
      watermark.style.position = 'fixed';
      watermark.style.bottom = '20px';
      watermark.style.right = '20px';
      watermark.style.opacity = '0.2';
      watermark.style.zIndex = '9999';
      watermark.style.fontSize = '24px';
      watermark.style.color = '#6b7280';
      watermark.textContent = 'iplscore.vercel.app';
      document.body.appendChild(watermark);

      return () => watermark.remove();
    }
  }, [isShared]);

  const fetchMatchDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/matches/${matchId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch match details');
      }

      const data = await response.json();
      setMatchDetails(data);
    } catch (err) {
      console.error(`Error fetching match details: ${err.message}`);
      setError(err.message || 'Failed to load match details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (matchId) {
      fetchMatchDetails();
      const intervalId = setInterval(fetchMatchDetails, 30000);
      return () => clearInterval(intervalId);
    }
  }, [matchId]);

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

  if (error || !matchDetails) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error || 'Failed to load match details'}</p>
            <button 
              onClick={fetchMatchDetails}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{matchDetails.title}</h1>
          <ScoreCard matchDetails={matchDetails} />
          
          <SocialShare 
            match={{
              id: matchId,
              title: matchDetails.title,
              status: matchDetails.status
            }} 
          />
        </div>

        {matchDetails.innings?.map((inning, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{inning.title}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Batting</h3>
                <BattingScoreTable battingScores={inning.batting} />
              </div>

              {inning.bowling && (
                <div>
                  <h3 className="text-lg font-medium mt-6 mb-2">Bowling</h3>
                  <BowlingScoreTable bowlingScores={inning.bowling} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}