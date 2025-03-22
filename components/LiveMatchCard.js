import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LiveMatchCard({ match }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="relative bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all overflow-hidden group"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/30 transition-colors duration-300" />
      
      <Link href={`/matches/${match.id}`}>
        <div className="relative space-y-4 cursor-pointer z-10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {match.format}
            </span>
            
            {/* Animated live indicator */}
            <motion.span 
              className="flex items-center text-sm font-medium"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="relative">
                {/* Glowing circle */}
                <motion.div
                  className="absolute inset-0 bg-blue-400/20 rounded-full blur-[6px]"
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <svg 
                  className="w-5 h-5 mr-1.5 text-blue-400 drop-shadow-glow"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live
              </span>
            </motion.span>
          </div>

          {/* Match title with subtle shine */}
          <h3 className="text-xl font-bold text-gray-100 font-orbitron drop-shadow-md">
            {match.title}
          </h3>

          {/* Teams with gradient borders */}
          <div className="space-y-3">
            {match.teams?.map((team, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -2 }}
                className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 hover:border-blue-400/50 transition-all"
              >
                <span className="text-gray-300 font-medium">{team.name}</span>
                <span className="font-mono text-green-400 drop-shadow-glow">
                  {team.score || '–'}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Status bar with metallic accent */}
          <div className="pt-4 border-t border-gray-700/50">
            <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {match.status}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}