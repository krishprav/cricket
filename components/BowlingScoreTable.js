export default function BowlingScoreTable({ bowlingScores }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bowler
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overs
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Maidens
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Runs
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wickets
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Economy
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bowlingScores.length > 0 ? (
              bowlingScores.map((score, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{score.bowler}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.overs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.maidens}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.runs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.wickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {score.economy}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No bowling data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }