// components/LiveMatchCard.js
import Link from 'next/link';
import { motion } from 'framer-motion';

const statusEmoji = {
  'live': '🔥',
  'completed': '🏁',
  'upcoming': '⏳'
};

export default function LiveMatchCard({ match, index }) {
  const getStatusType = (status) => {
    if (status.toLowerCase().includes('won')) return 'completed';
    if (status.toLowerCase().includes('live')) return 'live';
    return 'upcoming';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/matches/${match.id}`}>
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/50 transition-all cursor-pointer shadow-xl hover:shadow-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">{match.format}</span>
            <span className="text-2xl">
              {statusEmoji[getStatusType(match.status)] || '🏏'}
            </span>
          </div>
          
          {match.teams.map((team, idx) => (
            <div key={idx} className="py-2 border-b border-gray-700 last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{idx === 0 ? '🏏' : '🎯'}</span>
                  <h3 className="font-medium text-lg">{team.name}</h3>
                </div>
                <p className="text-xl font-mono">{team.score || '-'}</p>
              </div>
            </div>
          ))}
          
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className={`text-sm ${
              getStatusType(match.status) === 'live' ? 'text-green-400' : 
              getStatusType(match.status) === 'completed' ? 'text-blue-400' : 'text-gray-400'
            }`}>
              {match.status}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}