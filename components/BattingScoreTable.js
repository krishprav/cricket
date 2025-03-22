export default function BattingScoreTable({ battingScores }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Batter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Runs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Balls
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              4s
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              6s
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              SR
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {battingScores.length > 0 ? (
            battingScores.map((score, index) => (
              <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-100">
                  {score.player}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                  {score.runs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {score.balls}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-400">
                  {score.fours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-400">
                  {score.sixes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400 font-semibold">
                  {score.strikeRate}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                No batting data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}