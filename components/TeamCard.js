import Link from 'next/link';

export default function TeamCard({ team }) {
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{team.flag}</span>
          <h2 className="font-semibold text-lg">{team.name}</h2>
        </div>
      </div>
    </Link>
  );
}