import { useState, useMemo } from 'react';
import Chart from "react-apexcharts";
import { ChevronRight, Star, Search, SlidersHorizontal, TrendingUp, TrendingDown,ChevronUpSquare,ChevronDownSquare} from "lucide-react";

// Assets
import Btc from "../assets/Btc.svg";
import Eth from "../assets/Eth.svg";
import Doge from "../assets/Doge.svg";
import Bnb from "../assets/Bnb.svg";
import Bix from "../assets/Bix.svg";
import Eca from "../assets/Eca.svg";
import Bze from "../assets/Bze.svg";
import Cvc from "../assets/Cvc.svg";
import LinkIcon from "../assets/Li.svg";
import Green from "../Market/Green.svg";
import Red from "../Market/Red.svg";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from 'react-router-dom';

export default function Market() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([0, 1]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleFavorite = (i) => setFavorites(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <TrendingUp className="w-3.5 h-3.5 ml-1 text-[#00d4aa]" />
    ) : (
      <TrendingDown className="w-3.5 h-3.5 ml-1 text-[#00d4aa]" />
    );
  };

  // Fear & Greed Chart
  const fearGreedOptions = {
    chart: { type: 'radialBar', height: 380 },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '75%', background: 'transparent' },
        track: { background: '#1f2937', strokeWidth: '100%' },
        dataLabels: { name: { show: false }, value: { show: false } }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#22c55e'],
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: '#ef4444' },
          { offset: 25, color: '#f59e0b' },
          { offset: 50, color: '#eab308' },
          { offset: 75, color: '#84cc16' },
          { offset: 100, color: '#22c55e' }
        ]
      }
    },
    stroke: { lineCap: 'round' }
  };

  const fearGreedSeries = [72];

  // Market Cap Chart
  const marketCapOptions = {
    chart: { type: 'area', height: 100, sparkline: { enabled: true }, toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 2, colors: ['#22c55e'] },
    fill: { colors: ['#22c55e'], type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0 } },
    tooltip: { enabled: false },
    grid: { show: false }
  };

  const marketCapSeries = [{ data: [30, 40, 35, 50, 60, 75, 70, 90, 85, 110] }];

  const rawMarketList = [
    { name: 'BTC', fullName: 'Bitcoin', icon: Btc, price: '$101,470.30', change: '+2.76%', positive: true, volume: '$183.32M', graph: Green },
    { name: 'ETH', fullName: 'Ethereum', icon: Eth, price: '$101,470.30', change: '-2.76%', positive: false, volume: '$183.32M', graph: Red },
    { name: 'DOGE', fullName: 'Dogecoin', icon: Doge, price: '$101,470.30', change: '-2.76%', positive: false, volume: '$183.32M', graph: Red },
    { name: 'BNB', fullName: 'Binance Coin', icon: Bnb, price: '$101,470.30', change: '+2.76%', positive: true, volume: '$183.32M', graph: Green },
    { name: 'Bix', fullName: 'Bibox', icon: Bix, price: '$101,470.30', change: '-2.76%', positive: false, volume: '$183.32M', graph: Red },
    { name: 'ECA', fullName: 'Electra', icon: Eca, price: '$101,470.30', change: '-2.76%', positive: false, volume: '$183.32M', graph: Red },
    { name: 'Bze', fullName: 'Beezee', icon: Bze, price: '$101,470.30', change: '-2.76%', positive: false, volume: '$183.32M', graph: Red },
    { name: 'Cvc', fullName: 'Civic', icon: Cvc, price: '$101,470.30', change: '-2.76%', positive: false, volume: '$183.32M', graph: Red }
  ];

  const filteredAndSortedList = useMemo(() => {
    let list = rawMarketList;
    if (activeTab === 'Favorites') list = list.filter((_, i) => favorites.includes(i));
    if (searchQuery) {
      list = list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig.key) {
      list = [...list].sort((a, b) => {
        let aVal = a[sortConfig.key], bVal = b[sortConfig.key];
        if (sortConfig.key === 'price' || sortConfig.key === 'volume') {
          aVal = parseFloat(aVal.replace(/[$,M]/g, ''));
          bVal = parseFloat(bVal.replace(/[$,M]/g, ''));
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [activeTab, searchQuery, favorites, sortConfig]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Header - Fixed on top of everything */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Markets Overview" />
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

      {/* Main Content - Starts below header */}
      <div className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-6 lg:p-8">
          <h1 className="text-4xl font-bold mb-10">Markets Overview</h1>

          {/* Fear & Greed */}
          <div className="bg-[#141414] rounded-3xl p-10 border border-gray-800 mb-8">
            <h3 className="text-2xl font-bold text-[#00d4aa] text-center mb-12">Fear & Greed</h3>
            
            <div className="relative flex justify-center items-center h-96">
              <Chart options={fearGreedOptions} series={fearGreedSeries} type="radialBar" height={380} />
              
              <div className="absolute text-center">
                <p className="text-green-400 text-2xl mt-32 font-bold flex items-center justify-center gap-2">
                  <TrendingUp className="w-7 h-7 rotate-180" />
                  1.37%
                </p>
                <p className="text-6xl font-black text-gray-300 mt-6">72</p>
                <p className="text-4xl font-bold text-green-400 mt-6">Greed</p>
                <p className="text-xl text-gray-500 mt-4">Index</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm">
              {[
                { color: 'bg-red-500', label: '0 Extreme Fear' },
                { color: 'bg-orange-500', label: '25 Fear' },
                { color: 'bg-yellow-500', label: '50 Neutral' },
                { color: 'bg-lime-500', label: '75 Greed' },
                { color: 'bg-green-500', label: '100 Extreme Greed' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${item.color} rounded-full`} />
                  <span className="text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Cap + Trending */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Market Cap */}
            <div className="bg-[#141414] rounded-3xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Market Cap</h3>
              <div className="flex justify-between items-center mb-6">
                <p className="text-5xl font-bold">$3.66T</p>
                <p className="text-green-400 text-3xl flex items-center gap-2">
                  <TrendingUp className="w-8 h-8 rotate-180" />
                  1.37%
                </p>
              </div>
              <Chart options={marketCapOptions} series={marketCapSeries} type="area" height={100} />
            </div>

            {/* Trending */}
            <div className="bg-[#141414] rounded-3xl p-8 border border-gray-800">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Trending</h3>
                <button className="text-[#00d4aa] flex items-center gap-1 text-sm hover:underline">
                  View More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'BTC', price: '$95,145.71', change: '-1.29%', positive: false, icon: Btc },
                  { name: 'ETH', price: '$3,552.40', change: '+2.32%', positive: true, icon: Eth },
                  { name: 'LINK', price: '$19.21', change: '-3.12%', positive: false, icon: LinkIcon }
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 items-center">
                    <div className="flex items-center gap-4">
                      <img src={item.icon} alt={item.name} className="w-12 h-12" />
                      <span className="font-bold text-xl">{item.name}</span>
                    </div>
                    <div className="text-center text-xl font-medium">{item.price}</div>
                    <div className={`text-right text-xl font-medium ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Gainer */}
          <div className="bg-[#141414] rounded-3xl p-8 border border-gray-800 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Top Gainer</h3>
              <button className="text-[#00d4aa] flex items-center gap-1 text-sm hover:underline">
                View More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'BTC',icon:Btc, change: '+2.76%', graph: Green, price: '$95,145.71', change2: '-1.29%', positive: true },
                { name: 'ETH',icon:Eth, change: '-2.76%', graph: Red, price: '$3,552.40', change2: '+2.32%', positive: false },
                { name: 'LINK',icon:LinkIcon, change: '-2.76%', graph: Red, price: '$19.21', change2: '+1.32%', positive: false }
              ].map((item, i) => (
                <div key={i} className="bg-[#1a1a1a]/60 rounded-2xl p-6 grid grid-cols-5 items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img src={item.icon} alt="coin" className="w-12 h-12" />
                    <span className="font-bold text-xl">{item.name}</span>
                  </div>
                  <div className={`text-xl font-bold ${item.positive ? 'text-green-400'  : 'text-red-400'}`}>
                    {item.change}
                  </div>
                  <div className="flex justify-center">
                    <img src={item.graph} alt="graph" className="w-24 h-12 object-contain" />
                  </div>
                  <div className="text-xl font-medium text-right">{item.price}</div>
                  <div className={`text-xl font-medium text-right ${item.change2.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change2}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Table */}
          <div className="bg-[#141414] rounded-3xl p-8 border border-gray-800">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="flex gap-3 flex-wrap">
                {['All', 'Favorites', 'Spot', 'New Listing', 'Features'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === tab ? 'bg-[#00d4aa] text-black' : 'text-gray-400 hover:text-white'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="flex-1 lg:flex-initial flex items-center bg-[#1a1a1a] rounded-xl px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" placeholder="Search a coin" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-white" />
                </div>
                <button className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-4 py-3 hover:bg-[#222] transition">
                  <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="text-left text-gray-400 text-sm border-b border-gray-800">
                  <tr>
                    <th className="pb-4 cursor-pointer" onClick={() => handleSort('name')}>Market {getSortIcon('name')}</th>
                    <th className="pb-4 cursor-pointer" onClick={() => handleSort('price')}>Price {getSortIcon('price')}</th>
                    <th className="pb-4 cursor-pointer" onClick={() => handleSort('change')}>Change {getSortIcon('change')}</th>
                    <th className="pb-4">Markets</th>
                    <th className="pb-4 cursor-pointer" onClick={() => handleSort('volume')}>24h Volume {getSortIcon('volume')}</th>
                    <th className="pb-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedList.map((coin, idx) => (
                    <tr key={idx} className="border-b border-gray-800/30 hover:bg-[#1a1a1a] transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => toggleFavorite(idx)}>
                            <Star className={`w-5 h-5 ${favorites.includes(idx) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} />
                          </button>
                          <img src={coin.icon} alt={coin.name} className="w-10 h-10" />
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-gray-500">{coin.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{coin.price}</td>
                      <td className={`py-4 ${coin.positive ? 'text-green-400' : 'text-red-400'}`}>{coin.change}</td>
                      <td className="py-4">
                        <img src={coin.graph} alt="graph" className="w-20 h-10 object-contain" />
                      </td>
                      <td className="py-4 text-gray-300">{coin.volume}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-4">
                          <button className="text-gray-400 hover:text-white text-sm">Details</button>
                          <Link to="/trade" >
                          
                          <button className="bg-[#00d4aa] text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">Trade</button>
                        </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}