import { useState, useMemo } from 'react';
import Btc from "../../assets/Btc.svg";
import Eth from "../../assets/Eth.svg";
import Uni from "../../assets/Uni.svg";
import Usd from "../../assets/Usd.svg";
import Trx from "../../assets/Trx.svg";
import Gas from "../../assets/Gas.svg";
import Etc from "../../assets/Etc.svg";
import Bat from "../../assets/Bat.svg";
import Bnb from "../../assets/Bnb.svg";
import Cny from "../../assets/Cny.svg";
import Cdn from "../../assets/Cdn.svg";
import Tether from "../../assets/Tether.svg";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";
import Export from "../../Orders/Export.svg";
import Click from "../../Orders/Click.svg";
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';

export default function Transaction() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const transactions = [
    { icon: Btc, symbol: 'BTC', txid: '1sJhSdscicXk2385s...', date: '2025-06-12', amount: '+$71.3 BTC', amountNum: 71.3, positive: true, status: 'Pending', statusColor: 'text-[#00D4AA]' },
    { icon: Eth, symbol: 'ETH', txid: '1sJhSdscicXk2385s...', date: '2025-06-13', amount: '+$71.3 ETH', amountNum: 71.3, positive: true, status: 'Completed', statusColor: 'text-green-500' },
    { icon: Bnb, symbol: 'BNB', txid: '1sJhSdscicXk2385s...', date: '2025-06-14', amount: '+$71.3 BNB', amountNum: 71.3, positive: true, status: 'Failed', statusColor: 'text-red-500' },
    { icon: Tether, symbol: 'USDT', txid: '1sJhSdscicXk2385s...', date: '2025-06-15', amount: '-$71.3 USDT', amountNum: -71.3, positive: false, status: 'Completed', statusColor: 'text-green-500' },
    { icon: Trx, symbol: 'TRX', txid: '1sJhSdscicXk2385s...', date: '2025-06-16', amount: '+$71.3 TRX', amountNum: 71.3, positive: true, status: 'Failed', statusColor: 'text-red-500' },
    { icon: Uni, symbol: 'UNI', txid: '1sJhSdscicXk2385s...', date: '2025-06-17', amount: '+$71.3 UNI', amountNum: 71.3, positive: true, status: 'Completed', statusColor: 'text-green-500' },
    { icon: Etc, symbol: 'ETC', txid: '1sJhSdscicXk2385s...', date: '2025-06-18', amount: '-$51.3 ETC', amountNum: -51.3, positive: false, status: 'Failed', statusColor: 'text-red-500' },
    { icon: Gas, symbol: 'GAS', txid: '1sJhSdscicXk2385s...', date: '2025-06-19', amount: '+$71.3 GAS', amountNum: 71.3, positive: true, status: 'Failed', statusColor: 'text-red-500' },
    { icon: Bat, symbol: 'BAT', txid: '1sJhSdscicXk2385s...', date: '2025-06-19', amount: '+$71.3 BAT', amountNum: 71.3, positive: true, status: 'Failed', statusColor: 'text-red-500' },
    { icon: Cny, symbol: 'CNY', txid: '1sJhSdscicXk2385s...', date: '2025-06-19', amount: '+$71.3 CNY', amountNum: 71.3, positive: true, status: 'Completed', statusColor: 'text-green-500' },
  ];

  const sortedTransactions = useMemo(() => {
    let list = [...transactions];
    if (sortConfig.key) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === 'amountNum') { aVal = a.amountNum; bVal = b.amountNum; }
        if (sortConfig.key === 'date') { aVal = new Date(a.date); bVal = new Date(b.date); }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [transactions, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronDown className="w-4 h-4 ml-1 opacity-30" />;
    return sortConfig.direction === 'asc' ? (
      <TrendingUp className="w-4 h-4 ml-1 text-[#00D4AA]" />
    ) : (
      <TrendingDown className="w-4 h-4 ml-1 text-[#00D4AA]" />
    );
  };

  const handleExport = () => {
    const headers = ['Symbol', 'Transaction ID', 'Date', 'Amount', 'Status'];
    const rows = sortedTransactions.map(t => [t.symbol, t.txid, t.date, t.amount, t.status]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Header - Fixed on top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Transaction History" />
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
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-[#00D4AA]">Transaction History</h1>
            <button onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-[#1a1a1a] rounded-xl border border-gray-700 hover:bg-[#222222] transition">
              <img src={Export} alt="Export" className="w-5 h-5" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-5 py-3">
              <input type="date" defaultValue="2025-06-12" className="bg-transparent outline-none text-sm" />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <span className="self-center text-gray-500">to</span>
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-5 py-3">
              <input type="date" defaultValue="2025-06-19" className="bg-transparent outline-none text-sm" />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-[#141414] rounded-3xl border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold">Crypto trade</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b border-gray-800">
                    <th className="py-4 px-6 w-[140px] cursor-pointer select-none" onClick={() => handleSort('symbol')}>
                      <div className="inline-flex items-center">
                        ID {getSortIcon('symbol')}
                      </div>
                    </th>
                    <th className="py-4 px-6 w-[380px] cursor-pointer select-none" onClick={() => handleSort('txid')}>
                      <div className="inline-flex items-center">
                        ID {getSortIcon('txid')}
                      </div>
                    </th>
                    <th className="py-4 px-6 w-[160px] cursor-pointer select-none" onClick={() => handleSort('date')}>
                      <div className="inline-flex items-center">
                        Date {getSortIcon('date')}
                      </div>
                    </th>
                    <th className="py-4 px-6 w-[200px] text-right cursor-pointer select-none" onClick={() => handleSort('amountNum')}>
                      <div className="inline-flex items-center justify-end w-full">
                        Amount {getSortIcon('amountNum')}
                      </div>
                    </th>
                    <th className="py-4 px-6 w-[140px] cursor-pointer select-none" onClick={() => handleSort('status')}>
                      <div className="inline-flex items-center">
                        Status {getSortIcon('status')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sortedTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-white/5 transition">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <img src={tx.icon} alt={tx.symbol} className="w-10 h-10" />
                          <span className="font-medium text-lg">{tx.symbol}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <img src={Click} alt="Copy" className="w-5 h-5 cursor-pointer hover:opacity-70 transition" />
                          <span className="font-mono text-gray-400">{tx.txid}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-base">{tx.date}</td>
                      <td className={`py-5 px-6 text-right font-medium text-lg ${tx.positive ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                        {tx.amount}
                      </td>
                      <td className={`py-5 px-6 text-base font-medium ${tx.statusColor}`}>
                        {tx.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-gray-500">Showing 1-10 of 128</span>
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