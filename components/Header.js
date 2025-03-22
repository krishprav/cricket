// components/Header.js
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-gray-900/30 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🏏</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              LiveCricket
            </span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-green-400 transition-colors flex items-center group"
                >
                  <span className="mr-1 group-hover:scale-110 transition-transform">🔥</span>
                  Matches
                </Link>
              </li>
              <li>
                <Link 
                  href="/teams" 
                  className="hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="mr-1 group-hover:scale-110 transition-transform">🏆</span>
                  Teams
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}