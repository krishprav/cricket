export default function BowlingScoreTable({ bowlingScores }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Bowler
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Overs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Maidens
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Runs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Wickets
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Economy
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {bowlingScores.length > 0 ? (
            bowlingScores.map((score, index) => (
              <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-100">
                  {score.bowler}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {score.overs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {score.maidens}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {score.runs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {score.wickets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400 font-semibold">
                  {score.economy}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                No bowling data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}