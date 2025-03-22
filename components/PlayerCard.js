// components/PlayerCard.js
import Link from 'next/link';

export default function PlayerCard({ player }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
        <h3 className="font-medium">{player.name}</h3>
      </div>
    </Link>
  );
}