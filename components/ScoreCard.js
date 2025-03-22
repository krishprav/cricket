export default function ScoreCard({ matchDetails }) {
    return (
      <div>
        <div className="flex flex-col space-y-2">
          {matchDetails.teams ? (
            matchDetails.teams.map((team, index) => (
              <div key={index} className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{team.name}</h3>
                <p className="text-xl font-semibold">{team.score}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Score information not available</p>
          )}
        </div>
        
        {matchDetails.status && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700">{matchDetails.status}</p>
          </div>
        )}
        
        {matchDetails.venue && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">{matchDetails.venue}</p>
          </div>
        )}
      </div>
    );
  }