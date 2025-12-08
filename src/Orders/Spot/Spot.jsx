import { useState, useMemo } from 'react';
import Export from "../../Orders/Export.svg";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Spot() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const rawSpotHistory = [
    { date: '14/02/24 - 15:50:29', pair: 'BTC/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 56878.27, amount: 1.5,  status: 'Pending',    statusColor: 'text-[#00D4AA]' },
    { date: '16/05/24 - 20:54:29', pair: 'ETH/USDT', type: 'Sell', typeColor: 'text-red-500',   price: 40878.27, amount: 2.5,  status: 'Completed', statusColor: 'text-green-500' },
    { date: '17/06/24 - 18:54:29', pair: 'ETH/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 40878.27, amount: 5,    status: 'Failed',    statusColor: 'text-red-500' },
    { date: '18/07/24 - 16:54:29', pair: 'ETH/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 40878.27, amount: 15,   status: 'Failed',    statusColor: 'text-red-500' },
    { date: '18/07/24 - 19:54:29', pair: 'ETH/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 40878.27, amount: 9,    status: 'Completed', statusColor: 'text-green-500' },
    { date: '20/09/24 - 16:54:29', pair: 'ETH/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 40878.27, amount: 1,    status: 'Completed', statusColor: 'text-green-500' },
    { date: '21/10/24 - 16:54:29', pair: 'ETH/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 40878.27, amount: 30,   status: 'Failed',    statusColor: 'text-red-500' },
    { date: '22/11/24 - 16:54:29', pair: 'ETH/USDT', type: 'Sell', typeColor: 'text-red-500',   price: 40878.27, amount: 8,    status: 'Failed',    statusColor: 'text-red-500' },
    { date: '22/11/24 - 18:54:29', pair: 'ETH/USDT', type: 'Sell', typeColor: 'text-red-500',   price: 40878.27, amount: 1.7,  status: 'Failed',    statusColor: 'text-red-500' },
    { date: '22/11/24 - 16:54:29', pair: 'ETH/USDT', type: 'Buy',  typeColor: 'text-[#00D4AA]', price: 40878.27, amount: 1,    status: 'Completed', statusColor: 'text-green-500' },
  ];

  // Sorting Logic
  const sortedSpotHistory = useMemo(() => {
    let sortable = [...rawSpotHistory];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === 'date') {
          const [dayA, monthA, yearA, timeA] = a.date.split(/[/ -]/);
          const [dayB, monthB, yearB, timeB] = b.date.split(/[/ -]/);
          aVal = new Date(`20${yearA}-${monthA}-${dayA} ${timeA}`);
          bVal = new Date(`20${yearB}-${monthB}-${dayB} ${timeB}`);
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [rawSpotHistory, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <TrendingUp className="w-4 h-4 ml-1 text-[#00D4AA]" />
    ) : (
      <TrendingDown className="w-4 h-4 ml-1 text-[#00D4AA]" />
    );
  };

  // Export to CSV
  const handleExport = () => {
    const headers = ['Date/Time', 'Pair', 'Type', 'Price', 'Amount', 'Status'];
    const rows = sortedSpotHistory.map(t => [
      t.date,
      t.pair,
      t.type,
      `$${t.price.toLocaleString()}`,
      t.amount,
      t.status
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(field => `"${field}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spot_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Header - Fixed on top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Spot History" />
      </div>

      {/* Desktop Sidebar - Starts below header */}
      <div className="hidden lg:block w-72 fixed left-0 top-16 bottom-0 bg-[#0a0a0a] border-r border-gray-800 z-40 overflow-y-auto">
        <Sidebar isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute left-0 top-0 h-full w-72 bg-[#0a0a0a] border-r border-gray-800" onClick={e => e.stopPropagation()}>
            <Sidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content - Pushes down under header */}
      <div className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-[#00D4AA]">Spot History</h1>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-3 bg-[#1a1a1a] rounded-xl border border-gray-700 hover:bg-[#222222] transition"
            >
              <img src={Export} alt="Export" className="w-5 h-5" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-5 py-3">
              <span className="text-sm text-gray-400">Trading Pair</span>
              <select className="bg-transparent outline-none text-sm">
                <option>All</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-5 py-3">
              <span className="text-sm text-gray-400">Direction</span>
              <select className="bg-transparent outline-none text-sm">
                <option>All</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-5 py-3">
              <span className="text-sm text-gray-400">Type</span>
              <select className="bg-transparent outline-none text-sm">
                <option>All</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#141414] rounded-3xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b border-gray-800">
                    <th className="py-4 px-6 cursor-pointer select-none" onClick={() => handleSort('date')}>
                      <div className="inline-flex items-center">
                        Date/Time {getSortIcon('date')}
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer select-none" onClick={() => handleSort('pair')}>
                      <div className="inline-flex items-center">
                        Pair {getSortIcon('pair')}
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer select-none" onClick={() => handleSort('type')}>
                      <div className="inline-flex items-center">
                        Type {getSortIcon('type')}
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer select-none" onClick={() => handleSort('price')}>
                      <div className="inline-flex items-center">
                        Price {getSortIcon('price')}
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer select-none" onClick={() => handleSort('amount')}>
                      <div className="inline-flex items-center">
                        Amount {getSortIcon('amount')}
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer select-none" onClick={() => handleSort('status')}>
                      <div className="inline-flex items-center">
                        Status {getSortIcon('status')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sortedSpotHistory.map((trade, i) => (
                    <tr key={i} className="hover:bg-white/5 transition">
                      <td className="py-5 px-6 text-sm text-gray-400">{trade.date}</td>
                      <td className="py-5 px-6 font-medium">{trade.pair}</td>
                      <td className="py-5 px-6 font-medium ${trade.typeColor}">{trade.type}</td>
                      <td className="py-5 px-6 text-gray-300">${trade.price.toLocaleString()}</td>
                      <td className="py-5 px-6 text-gray-300">{trade.amount}</td>
                      <td className={`py-5 px-6 font-medium ${trade.statusColor}`}>{trade.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-gray-500">Showing 1-15 of 128</span>
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white transition">Previous</button>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-lg bg-[#00D4AA] text-black font-bold">1</button>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">2</button>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">3</button>
                  <span className="text-gray-500 self-center">...</span>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">10</button>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">11</button>
                </div>
                <button className="text-gray-400 hover:text-white transition">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}