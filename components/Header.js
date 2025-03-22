// components/Header.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon, UserGroupIcon, FireIcon } from '@heroicons/react/24/solid';
import { BiSolidCricketBall } from 'react-icons/bi'; // Import Cricket Ball Icon

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo with Animated Cricket Ball */}
          <Link href="/" className="flex items-center space-x-2">
            {/* Bouncing Cricket Ball */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            >
              <BiSolidCricketBall className="h-8 w-8 text-red-600" />
            </motion.div>

            {/* "LiveCricket" Animated Text */}
            <motion.span 
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              LiveCricket
            </motion.span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="flex items-center hover:text-orange-400 transition-transform transform hover:scale-110"
            >
              <HomeIcon className="h-5 w-5 mr-1" />
              Matches
            </Link>
            <Link 
              href="/teams" 
              className="flex items-center hover:text-blue-400 transition-transform transform hover:scale-110"
            >
              <UserGroupIcon className="h-5 w-5 mr-1" />
              Teams
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
