// components/PlayerCard.js
import Link from 'next/link';

export default function PlayerCard({ player }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="bg-gray-500 rounded-lg p-4 hover:bg-gray-900 transition-colors cursor-pointer">
        <h3 className="font-medium font-">{player.name}</h3>
      </div>
    </Link>
  );
}