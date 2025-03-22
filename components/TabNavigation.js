// components/TabNavigation.js
import { motion } from 'framer-motion';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'live', label: 'Live Matches', emoji: '🔥' },
    { id: 'recent', label: 'Recent Results', emoji: '🏆' },
    { id: 'upcoming', label: 'Upcoming', emoji: '⏳' }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900/20 backdrop-blur-lg mt-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === tab.id ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="text-lg">{tab.emoji}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}