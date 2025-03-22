export default function BattingScoreTable({ battingScores }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batter
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Runs
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balls
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                4s
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                6s
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {battingScores.length > 0 ? (
              battingScores.map((score, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{score.player}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {score.runs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.balls}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.fours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.sixes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.strikeRate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No batting data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }