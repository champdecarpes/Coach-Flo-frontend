export default function AllClients() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">TEST</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 w-64"
          placeholder="Search client"
        />
        {/* Placeholder for filter dropdowns */}
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-md px-2 py-2 text-sm">
            <option value="all">Category: All</option>
            <option value="Online">Online</option>
            <option value="In‑Person">In‑Person</option>
          </select>
          <select className="border border-gray-300 rounded-md px-2 py-2 text-sm">
            <option value="all">Status: All</option>
            <option value="Connected">Connected</option>
            <option value="Pending">Pending</option>
            <option value="Offline">Offline</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.lastActivity
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.last7dTraining
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.last30dTraining
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.last7dTasks
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.category
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              table.status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-secondary cursor-pointer transition-colors">
              <td className="px-4 py-2 whitespace-nowrap">Test</td>
              <td className="px-4 py-2 whitespace-nowrap">13w</td>
              <td className="px-4 py-2 whitespace-nowrap">test</td>
              <td className="px-4 py-2 whitespace-nowrap">test</td>
              <td className="px-4 py-2 whitespace-nowrap">test</td>
              <td className="px-4 py-2 whitespace-nowrap">test</td>
              <td className="px-4 py-2 whitespace-nowrap">test</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
