import './globals.css';
import { Inter } from 'next/font/google';
import Stats from '@/components/Stats';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '🏏 Cricket Live - Real-Time Scores, Stats & Predictions',
  description: 'Stay updated with live cricket scores, match predictions, squads, stats, and highlights. Share real-time scorecards with AI-powered insights!',
  keywords: 'Live Cricket Scores, Cricket Match Updates, Cricket Stats, Cricket Highlights, Cricket Predictions, T20, IPL, World Cup, ODI, Test Cricket',
  authors: [{ name: 'Krishna Praveen Korimilli', url: 'https://krishnapraveen.tech' }],
  applicationName: 'Cricket Live',
  creator: 'Krishna Praveen Korimilli',
  openGraph: {
    title: '🏏 Cricket Live - Real-Time Scores & AI Match Predictions',
    description: 'Get live cricket match scores, team squads, and AI-powered predictions. Track points table, player stats, and highlights in real-time.',
    url: 'https://your-cricket-app.com',
    siteName: 'Cricket Live',
    images: [
      {
        url: 'https://your-cricket-app.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cricket Live - Real-Time Scores & AI Predictions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🏏 Cricket Live - Real-Time Scores & AI Predictions',
    description: 'Follow live cricket matches, squads, stats, and match predictions. Share scorecards on WhatsApp, X, LinkedIn, and more.',
    images: ['https://your-cricket-app.com/twitter-card.jpg'],
    site: '@iplscore',
  },
  robots: 'index, follow',
  themeColor: '#1DA1F2', 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen`}>
        {children}
        <Stats apiBaseUrl={process.env.NEXT_PUBLIC_API_URL} />
      </body>
    </html>
  );
}
