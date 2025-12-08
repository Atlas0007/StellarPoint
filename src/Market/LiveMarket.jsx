import { useState, useMemo } from 'react';
import Chart from "react-apexcharts";
import { Search, ChevronDown, Maximize2, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

// Import assets
import Btc from "../assets/Btc.svg";
import Eth from "../assets/Eth.svg";
import Tether from "../assets/Tether.svg";
import Cdn from "../assets/Cdn.svg";
import Btch from "../assets/Btch.svg";
import Qtum from "../assets/Qtum.svg";
import Btm from "../assets/Btm.svg";
import Btcd from "../assets/Btcd.svg";
import Bts from "../assets/Bts.svg";
import Chips from "../assets/Chips.svg";
import Chain from "../assets/Chain.svg";
import Coqui from "../assets/Coqui.svg";
import Veri from "../assets/Veri.svg";
import Cmt from "../assets/Cmt.svg";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default function LiveMarket() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('1H');
  const [tradeType, setTradeType] = useState('Limit');
  const [orderTab, setOrderTab] = useState('Trade History');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const [marketSort, setMarketSort] = useState({ key: 'name', direction: 'asc' });
  const [activeTradingTab, setActiveTradingTab] = useState('Spot');

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Trade History Data
  const tradeHistory = [
    { date: '14/02/24 - 15:50:29', pair: 'BTC/USDT', type: 'Buy', price: '$56,878.27', amount: '2.000000', status: 'Pending' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Sell', price: '$56,878.27', amount: '1.500000', status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'TRX/USDT', type: 'Buy', price: '$56,878.27', amount: '1.500000', status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'TON/USDT', type: 'Buy', price: '$56,878.27', amount: '1.500000', status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'SOL/USDT', type: 'Sell', price: '$56,878.27', amount: '1.500000', status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'BUST/USDT', type: 'Sell', price: '$56,878.27', amount: '1.500000', status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'BTC/USDT', type: 'Buy', price: '$56,878.27', amount: '1.500000', status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'BUST/USDT', type: 'Buy', price: '$56,878.27', amount: '1.500000', status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Sell', price: '$56,878.27', amount: '1.500000', status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'BTC/USDT', type: 'Sell', price: '$56,878.27', amount: '1.500000', status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'BTC/USDT', type: 'Buy', price: '$56,878.27', amount: '1.500000', status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Buy', price: '$56,878.27', amount: '1.500000', status: 'Failed' }
  ];

  // Order Book Data
  const orderBookData = Array.from({ length: 20 }, (_, i) => ({
    price: `57,671.${String(30 + i).padStart(2, '0')}`,
    amount: (0.001 + Math.random() * 0.05).toFixed(6),
    total: (15 + Math.random() * 20).toFixed(4)
  }));

  // Candlestick Chart
  const generateRealCandles = () => {
    const data = [];
    let price = 98759.89;
    const now = Date.now();

    for (let i = 49; i >= 0; i--) {
      const time = now - i * 60 * 60 * 1000;
      const volatility = 300 + Math.random() * 700;
      const trend = Math.sin(i / 8) * 300;

      const open = price + (Math.random() - 0.5) * volatility;
      const close = open + trend + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * volatility * 0.6;
      const low = Math.min(open, close) - Math.random() * volatility * 0.6;

      data.push({
        x: time,
        y: [open.toFixed(2), high.toFixed(2), low.toFixed(2), close.toFixed(2)]
      });

      price = close;
    }
    return data.reverse();
  };

  const chartOptions = {
    chart: { type: 'candlestick', height: 480, toolbar: { show: false }, background: 'transparent' },
    plotOptions: { candlestick: { colors: { upward: '#22c55e', downward: '#ef4444' }, wick: { useFillColor: true } } },
    xaxis: { type: 'datetime', labels: { style: { colors: '#6b7280', fontSize: '11px' } } },
    yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: (val) => `$${val.toLocaleString()}` } },
    grid: { borderColor: '#1f2937', strokeDashArray: 4 },
    tooltip: { theme: 'dark' }
  };

  const chartSeries = [{ data: generateRealCandles() }];

  // Market List Data
  const fullCryptoList = [
    { name: 'BTC', icon: Btc, price: 98759.89, change: 1.53, positive: true },
    { name: 'ETH', icon: Eth, price: 4716.93, change: -0.82, positive: false },
    { name: 'USDT', icon: Tether, price: 1.0001, change: 0.01, positive: true },
    { name: 'CDN', icon: Cdn, price: 391800.93, change: -1.24, positive: false },
    { name: 'BTCH', icon: Btch, price: 768741.12, change: -2.15, positive: false },
    { name: 'QTUM', icon: Qtum, price: 29715.89, change: -0.95, positive: false },
    { name: 'BTM', icon: Btm, price: 3899.75, change: 2.43, positive: true },
    { name: 'BTCD', icon: Btcd, price: 743321.45, change: -1.67, positive: false },
    { name: 'BTS', icon: Bts, price: 8893.09, change: 3.21, positive: true },
    { name: 'CHIPS', icon: Chips, price: 65715.43, change: -0.54, positive: false },
    { name: 'CHAIN', icon: Chain, price: 96753.83, change: -1.89, positive: false },
    { name: 'COQUI', icon: Coqui, price: 29751.43, change: 1.76, positive: true },
    { name: 'VERI', icon: Veri, price: 80.09, change: 0.45, positive: true },
    { name: 'CMT', icon: Cmt, price: 96750.83, change: -0.92, positive: false }
  ];

  // Fixed: sortedTradeHistory was missing
  const sortedTradeHistory = useMemo(() => {
    let sortable = [...tradeHistory];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === 'amount') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [tradeHistory, sortConfig]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  // Fixed: getSortIcon now uses TrendingUp/TrendingDown consistently
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <TrendingUp className="w-3 h-3 ml-1 opacity-30 rotate-180" />;
    return sortConfig.direction === 'asc' ? (
      <TrendingUp className="w-3 h-3 ml-1 text-[#00d4aa]" />
    ) : (
      <TrendingDown className="w-3 h-3 ml-1 text-[#00d4aa]" />
    );
  };

  // Market List Sorting
  const filteredAndSortedMarketList = useMemo(() => {
    let list = [...fullCryptoList];
    if (searchTerm) list = list.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterTab !== 'All') list = list.filter(c => c.name === filterTab);
    if (marketSort.key) {
      list.sort((a, b) => {
        let aVal = a[marketSort.key];
        let bVal = b[marketSort.key];
        if (marketSort.key === 'price') { aVal = parseFloat(aVal); bVal = parseFloat(bVal); }
        if (marketSort.key === 'change') { aVal = a.change; bVal = b.change; }
        if (aVal < bVal) return marketSort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return marketSort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [searchTerm, filterTab, marketSort]);

  const requestMarketSort = (key) => {
    let direction = 'desc';
    if (marketSort.key === key && marketSort.direction === 'desc') direction = 'asc';
    setMarketSort({ key, direction });
  };

  const getMarketSortIcon = (key) => {
    if (marketSort.key !== key) return <TrendingUp className="w-3 h-3 ml-1 opacity-30 rotate-180" />;
    return marketSort.direction === 'asc' ? (
      <TrendingUp className="w-3 h-3 ml-1 text-[#00d4aa]" />
    ) : (
      <TrendingDown className="w-3 h-3 ml-1 text-[#00d4aa]" />
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Header - Fixed on top of everything */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Live Market" />
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

      {/* Main Content - Fixed pt-21 → pt-16 */}
      <div className="pt-20 lg:pl-72 min-h-screen">
        {/* Top Stats */}
        <div className="bg-[#141414] border-b border-gray-800 p-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-3">
              <img src={Btc} alt="BTC" className="w-8 h-8" />
              <div>
                <div className="font-bold text-white">BTC/USDT</div>
                <div className="text-xs text-gray-400">Bitcoin Price</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-xs">
              <div><div className="text-gray-400">98,759.89</div><div className="text-white">$98,759.89</div></div>
              <div><div className="text-gray-400">24h Change</div><div className="text-green-400">+1,355.80 +1.43%</div></div>
              <div><div className="text-gray-400">24h High</div><div className="text-white">98,962.45</div></div>
              <div><div className="text-gray-400">24h Low</div><div className="text-white">94,256.54</div></div>
              <div><div className="text-gray-400">24h Volume</div><div className="text-white">4.47B USDT</div></div>
            </div>
          </div>
        </div>

        {/* Rest of your component - 100% unchanged */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-0">
          {/* Left Side */}
          <div className="flex flex-col">
            {/* Chart */}
            <div className="bg-[#0a0a0a] p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">Time</span>
                  {['1s', '15m', '1H', '4H', '1D', '1W'].map((tf) => (
                    <button key={tf} onClick={() => setTimeframe(tf)} className={`px-4 py-2 rounded-lg font-medium transition ${timeframe === tf ? 'bg-[#1a1a1a] text-[#00d4aa]' : 'text-gray-400 hover:text-white'}`}>
                      {tf}
                    </button>
                  ))}
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                <button className="text-gray-400 hover:text-white transition">
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-8 text-sm mb-6 text-gray-300">
                <span>Open: <span className="text-green-400">98,759.89</span></span>
                <span>High: <span className="text-green-400">99,120.50</span></span>
                <span>Low: <span className="text-red-400">97,845.21</span></span>
                <span>Close: <span className="text-white">98,759.89</span></span>
              </div>

              <div className="h-96 lg:h-[500px]">
                <Chart options={chartOptions} series={chartSeries} type="candlestick" height="100%" />
              </div>
            </div>

            {/* Trading Tabs */}
            <div className="bg-[#0a0a0a] border-b border-gray-800 p-4">
              <div className="flex items-center gap-4 overflow-x-auto">
                {['Spot', 'Cross Margin', 'Spot Trading Bot', 'Grid'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTradingTab(tab)}
                    className={`px-6 py-3 rounded-full whitespace-nowrap transition ${
                      activeTradingTab === tab
                        ? 'bg-[#141414] text-[#00d4aa] border border-[#00d4aa]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Trading Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-800">
              {/* Buy Panel */}
              <div className="bg-[#0a0a0a] border-r border-gray-800 p-6 rounded-3xl">
                <div className="flex gap-6 mb-6 text-sm">
                  {['Limit', 'Market', 'Spot Limit', 'Grid Trading'].map((t) => (
                    <button key={t} onClick={() => setTradeType(t)} className={`px-4 py-2 ${tradeType === t ? 'text-[#00d4aa]' : 'text-gray-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Limit Price</div>
                    <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center justify-between">
                      <input type="text" defaultValue="31,164.55" className="bg-transparent text-white outline-none flex-1 text-right" />
                      <span className="text-gray-400 ml-2">USDT</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-2">Quantity</div>
                    <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center justify-between mb-3">
                      <input type="text" defaultValue="1" className="bg-transparent text-white outline-none flex-1 text-right" />
                      <span className="text-gray-400 ml-2">BTC</span>
                    </div>
                    <div className="relative">
                      <input type="range" min="0" max="100" defaultValue="25" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-2">Order Value</div>
                    <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center justify-between">
                      <input type="text" defaultValue="31,164.55" className="bg-transparent text-white outline-none flex-1 text-right" />
                      <span className="text-gray-400 ml-2">USDT</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#00d4aa] to-[#00b894] text-black font-bold py-4 rounded-2xl text-lg hover:opacity-90 transition">
                    Buy BTC
                  </button>
                </div>
              </div>

              {/* Sell Panel */}
              <div className="bg-[#0a0a0a] p-6 rounded-3xl">
                <div className="flex gap-6 mb-6 text-sm">
                  {['Limit', 'Market', 'Spot Limit', 'Grid Trading'].map((t) => (
                    <button key={t} onClick={() => setTradeType(t)} className={`px-4 py-2 ${tradeType === t ? 'text-[#00d4aa]' : 'text-gray-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 mt-12">
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Limit Price</div>
                    <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center justify-between">
                      <input type="text" defaultValue="31,164.55" className="bg-transparent text-white outline-none flex-1 text-right" />
                      <span className="text-gray-400 ml-2">USDT</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-2">Quantity</div>
                    <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center justify-between mb-3">
                      <input type="text" defaultValue="1" className="bg-transparent text-white outline-none flex-1 text-right" />
                      <span className="text-gray-400 ml-2">BTC</span>
                    </div>
                    <div className="relative">
                      <input type="range" min="0" max="100" defaultValue="25" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-2">Order Value</div>
                    <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center justify-between">
                      <input type="text" defaultValue="31,164.55" className="bg-transparent text-white outline-none flex-1 text-right" />
                      <span className="text-gray-400 ml-2">USDT</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white font-bold py-4 rounded-2xl text-lg hover:opacity-90 transition">
                    Sell BTC
                  </button>
                </div>
              </div>
            </div>

            {/* Trade History */}
            <div className="bg-[#0a0a0a] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-6 text-sm">
                  {['Trade History', 'Open Orders', 'Positions', 'Orders History'].map((tab) => (
                    <button key={tab} onClick={() => setOrderTab(tab)} className={`${orderTab === tab ? 'text-[#00d4aa]' : 'text-gray-400'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <Link to="/orders" className="text-[#00d4aa] text-sm flex items-center gap-1 hover:underline">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[1000px] table-fixed">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-800">
                      <th className="pb-4 w-[23%]">
                        <button onClick={() => requestSort('date')} className="flex items-center hover:text-white">
                          Date/Time {getSortIcon('date')}
                        </button>
                      </th>
                      <th className="pb-4 w-[20%]">
                        <button onClick={() => requestSort('pair')} className="flex items-center hover:text-white">
                          Pair {getSortIcon('pair')}
                        </button>
                      </th>
                      <th className="pb-4 w-[12%]">
                        <button onClick={() => requestSort('type')} className="flex items-center hover:text-white">
                          Type {getSortIcon('type')}
                        </button>
                      </th>
                      <th className="pb-4 w-[15%] text-right">Price</th>
                      <th className="pb-4 w-[15%] text-right">
                        <button onClick={() => requestSort('amount')} className="flex items-center hover:text-white justify-end w-full">
                          Amount {getSortIcon('amount')}
                        </button>
                      </th>
                      <th className="pb-4 w-[15%] text-right">
                        <button onClick={() => requestSort('status')} className="flex items-center hover:text-white justify-end w-full">
                          Status {getSortIcon('status')}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTradeHistory.map((t, i) => (
                      <tr key={i} className="border-b border-gray-800/30 hover:bg-white/5 transition">
                        <td className="py-3 text-gray-400 w-[23%]">{t.date}</td>
                        <td className="py-3 text-white w-[20%]">{t.pair}</td>
                        <td className={`py-3 w-[12%] ${t.type === 'Buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{t.type}</td>
                        <td className="py-3 text-white text-right w-[15%]">{t.price}</td>
                        <td className="py-3 text-white text-right w-[15%]">{t.amount}</td>
                        <td className={`py-3 text-right w-[15%] ${t.status === 'Completed' ? 'text-green-500' : t.status === 'Failed' ? 'text-red-500' : 'text-yellow-400'}`}>
                          {t.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="bg-[#0a0a0a] border-l border-gray-800 flex flex-col">
            <div className="flex border-b border-gray-800">
              <button className="flex-1 py-4 text-[#00d4aa] font-medium border-b-2 border-[#00d4aa]">SPOT</button>
              <button className="flex-1 py-4 text-gray-400">Futures</button>
            </div>

            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3 bg-[#141414] rounded-lg px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-white outline-none flex-1"
                />
              </div>
            </div>

            <div className="flex border-b border-gray-800 text-sm">
              {['All', 'USD', 'USDT'].map((tab) => (
                <button key={tab} onClick={() => setFilterTab(tab)} className={`flex-1 py-3 ${filterTab === tab ? 'text-white' : 'text-gray-400'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 text-xs text-gray-400 px-4 py-3 border-b border-gray-800">
                <button onClick={() => requestMarketSort('name')} className="flex items-center hover:text-white">
                  Market {getMarketSortIcon('name')}
                </button>
                <button onClick={() => requestMarketSort('price')} className="flex items-center justify-center hover:text-white">
                  Price {getMarketSortIcon('price')}
                </button>
                <button onClick={() => requestMarketSort('change')} className="flex items-center justify-end hover:text-white">
                  24h {getMarketSortIcon('change')}
                </button>
              </div>

              {filteredAndSortedMarketList.map((c, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3 hover:bg-[#141414] transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img src={c.icon} alt={c.name} className="w-6 h-6" />
                    <span className="text-white">{c.name}</span>
                  </div>
                  <span className="text-white text-center">${c.price.toLocaleString()}</span>
                  <span className={`text-right text-xs px-2 py-1 rounded ${c.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {c.positive ? '+' : ''}{c.change}%
                  </span>
                </div>
              ))}
            </div>

            {/* Order Book */}
            <div className="border-t border-gray-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Order Book</h3>
                <Link to="/trade/btcusdt" className="text-[#00d4aa] text-sm hover:underline">
                  More Trade
                </Link>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                </div>
                <span>0.01</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              <div className="text-xs grid grid-cols-3 text-gray-400 mb-2">
                <span>Price</span>
                <span className="text-right">Amount</span>
                <span className="text-right">Total</span>
              </div>

              {/* Sell Orders */}
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {orderBookData.slice(0, 8).map((o, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs">
                    <span className="text-red-400">{o.price}</span>
                    <span className="text-right text-gray-300">{o.amount}</span>
                    <span className="text-right text-gray-300">{o.total}</span>
                  </div>
                ))}
              </div>

              <div className="py-3 border-y border-gray-800 my-3 flex justify-between items-center">
                <span className="text-green-400 text-lg font-bold">98,759.88</span>
                <span className="text-gray-400 text-xs">$98,759.89</span>
              </div>

              {/* Buy Orders */}
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {orderBookData.slice(8).map((o, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs">
                    <span className="text-green-400">{o.price}</span>
                    <span className="text-right text-gray-300">{o.amount}</span>
                    <span className="text-right text-gray-300">{o.total}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex-1 h-1 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-400">61.1%</span>
                <div className="flex-1 h-1 bg-red-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}