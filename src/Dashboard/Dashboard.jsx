import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Chart from "react-apexcharts";
import Smith from "../assets/Smith.png";
import Bnb from "../assets/Bnb.svg";
import Eth from "../assets/Eth.svg";
import Usd from "../assets/Usd.svg";
import Btc from "../assets/Btc.svg";
import Doge from "../assets/Doge.svg";
import Tether from "../assets/Tether.svg";
import Trx from "../assets/Trx.svg";
import Uni from "../assets/Uni.svg";
import Etc from "../assets/Etc.svg";
import BtcGraph from "../assets/BtcGraph.svg";
import EthGraph from "../assets/EthGraph.svg";
import DogeGraph from "../assets/DogeGraph.svg";
import BnbGraph from "../assets/BnbGraph.svg";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Click from "../Dashboard/Click.svg";
import Id from "../Dashboard/Id.svg";
import Lock from "../Dashboard/Lock.svg";
import { ChevronRight, ChevronLeft, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC/USD');
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [newsTab, setNewsTab] = useState('Latest News');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Sorting Logic
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <TrendingUp className="w-4 h-4 inline ml-1 text-[#00d4aa]" /> : 
      <TrendingDown className="w-4 h-4 inline ml-1 text-[#00d4aa]" />;
  };

  const newsItems = [
    { title: 'As Bitcoin soars, major brands will find cry...', time: '2 minutes ago' },
    { title: 'Michael Saylor is willing to advise Trump...', time: '7 minutes ago' },
    { title: 'Moongate (MGT) Gets Listed on Zynai Was...', time: '8 minutes ago' },
    { title: 'Why crypto market\'s dip isn\'t the end of st...', time: '10 minutes ago' },
    { title: 'Why crypto market\'s dip isn\'t the end of te...', time: '8 minutes ago' }
  ];

  const marketData = [
    { name: 'Bitcoin', symbol: 'BTC', icon: Btc, price: '$98,004.77', change: '+6.26%', positive: true, currency: 'USD', graph: BtcGraph },
    { name: 'Ethereum', symbol: 'ETH', icon: Eth, price: '$3,635.80', change: '-1.3%', positive: false, currency: 'USD', graph: EthGraph },
    { name: 'Dogecoin', symbol: 'DOGE', icon: Doge, price: '$0.38', change: '+8.26%', positive: true, currency: 'USD', graph: DogeGraph },
    { name: 'Binance coin', symbol: 'BNB', icon: Bnb, price: '$705.22', change: '-2.1%', positive: false, currency: 'USD', graph: BnbGraph }
  ];

  const rawTransactions = [
    { icon: Btc, symbol: 'BTC', name: 'Bitcoin', id: '1SJshdcickk...', date: '2025-06-12', amount: '+$71.3 BTC', color: 'text-green-400' },
    { icon: Eth, symbol: 'ETH', name: 'Ethereum', id: '1SJshdcickk...', date: '2025-06-13', amount: '+$71.3 ETH', color: 'text-green-400' },
    { icon: Bnb, symbol: 'BNB', name: 'Binance', id: '1SJshdcickk...', date: '2025-06-14', amount: '+$71.3 BNB', color: 'text-green-400' },
    { icon: Tether, symbol: 'USD', name: 'Tether', id: '1SJshdcickk...', date: '2025-06-15', amount: '+$71.3 USDT', color: 'text-green-400' },
    { icon: Trx, symbol: 'TRX', name: 'Tron', id: '1SJshdcickk...', date: '2025-05-16', amount: '+$71.3 TRX', color: 'text-green-400' },
    { icon: Uni, symbol: 'UNI', name: 'Uniswap', id: '1SJshdcickk...', date: '2025-06-17', amount: '+$71.3 UNI', color: 'text-green-400' },
    { icon: Uni, symbol: 'UNI', name: 'Uniswap', id: '1SJshdcickk...', date: '2025-06-17', amount: '+$71.3 UNI', color: 'text-green-400' },
    { icon: Etc, symbol: 'ETC', name: 'Ethereum Classic', id: '1SJshdcickk...', date: '2025-05-18', amount: '+$71.3 ETC', color: 'text-green-400' },
    { icon: Btc, symbol: 'BTC', name: 'Bitcoin', id: '1SJshdcickk...', date: '2025-05-19', amount: '+$71.3 BTC', color: 'text-green-400' }
  ];

  const sortedTransactions = useMemo(() => {
    let list = [...rawTransactions];
    if (sortConfig.key) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === 'date') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rawTransactions, sortConfig]);

  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
      background: 'transparent',
      zoom: { enabled: false }
    },
    stroke: { width: 2, curve: 'smooth' },
    colors: ['#22C55E', '#EF4444'],
    xaxis: {
      categories: ['19:00', '19:10', '19:20', '19:30', '19:40', '19:50'],
      labels: { style: { colors: '#6B7280', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      min: 10000,
      max: 60000,
      tickAmount: 5,
      labels: { 
        style: { colors: '#6B7280', fontSize: '11px' },
        formatter: (val) => `${(val/1000).toFixed(0)}k`
      }
    },
    grid: { borderColor: '#374151', strokeDashArray: 3 },
    legend: { show: false },
    tooltip: { theme: 'dark' }
  };

  const chartSeries = [
    { name: 'BTC', data: [35000, 25000, 40000, 30000, 50000, 40000] },
    { name: 'ETH', data: [20000, 30000, 25000, 35000, 30000, 40000] }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Header - Now on TOP of everything (highest z-index) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Dashboard" />
      </div>

      {/* Desktop Sidebar - Starts below header */}
      <div className="hidden md:block w-[280px] fixed left-0 top-16 bottom-0 bg-[#0a0a0a] z-40 overflow-y-auto border-r border-gray-800">
        <Sidebar isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-0 left-0 h-full w-[280px] bg-[#0a0a0a] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content - Pushes down below header */}
      <div className="pt-16 md:pl-[280px] min-h-screen">
        <div className="p-[16px] sm:p-[20px] md:p-[24px] lg:p-[32px] overflow-y-auto">
          {/* User Info Card */}
          <div className="bg-[#141414] border border-gray-700/50 rounded-[20px] sm:rounded-[24px] p-[14px] sm:p-[16px] md:p-[18px] mb-[20px] sm:mb-[24px] md:mb-[28px]">
            <div className="flex items-center justify-between gap-[8px] sm:gap-[12px] overflow-x-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-gray-600/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              <div className="flex items-center gap-[10px] sm:gap-[12px] flex-shrink-0">
                <img src={Smith} alt="User" className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[48px] md:h-[48px] rounded-full object-cover" />
                <div>
                  <div className="text-[11px] sm:text-[12px] text-gray-400">User ID</div>
                  <div className="text-[13px] sm:text-[14px] text-white font-medium">88230293</div>
                </div>
              </div>

              <div className="h-[30px] sm:h-[35px] w-[1px] bg-gray-700/50 flex-shrink-0"></div>

              <div className="flex items-center gap-[6px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                <div>
                  <div className="text-[11px] sm:text-[12px] text-gray-400">Identity Verification</div>
                  <div className="text-[12px] sm:text-[13px] text-[#00d4aa] font-medium">Unverified</div>
                </div>
                <ChevronRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] text-gray-400 flex-shrink-0" />
              </div>

              <div className="h-[30px] sm:h-[35px] w-[1px] bg-gray-700/50 flex-shrink-0"></div>

              <div className="flex items-center gap-[6px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                <div>
                  <div className="text-[11px] sm:text-[12px] text-gray-400">Security</div>
                  <div className="text-[12px] sm:text-[13px] text-red-400 font-medium">Low</div>
                </div>
                <ChevronRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] text-gray-400 flex-shrink-0" />
              </div>

              <div className="h-[30px] sm:h-[35px] w-[1px] bg-gray-700/50 flex-shrink-0"></div>

              <div className="flex-shrink-0">
                <div className="text-[11px] sm:text-[12px] text-gray-400">Last login</div>
                <div className="text-[12px] sm:text-[13px] text-gray-300">09/16/2025, Austin, Texas</div>
              </div>

              <div className="h-[30px] sm:h-[35px] w-[1px] bg-gray-700/50 flex-shrink-0"></div>

              <div className="flex-shrink-0">
                <div className="text-[11px] sm:text-[12px] text-gray-400">Time Zone</div>
                <div className="text-[12px] sm:text-[13px] text-gray-300">Chicago (GMT-6)</div>
              </div>
            </div>
          </div>

          {/* Rest of your content - 100% unchanged */}
          <div className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
            <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-white mb-[16px] sm:mb-[18px] md:mb-[20px]">
              Start Your Crypto Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] sm:gap-[16px] md:gap-[18px] lg:gap-[20px]">
              <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] md:p-[22px]">
                <div className="text-[32px] sm:text-[36px] mb-[12px] sm:mb-[14px]"><img src={Id} alt="Id" /></div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold text-white mb-[8px] sm:mb-[10px]">
                  Complete Identity Verification
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-400 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                  Please Complete Advanced Identity Verification To Get Higher
                </p>
                <Link to="/verification" className="bg-[#00d4aa] px-[20px] sm:px-[24px] py-[8px] sm:py-[9px] md:py-[10px] rounded-[8px] text-[13px] sm:text-[14px] font-medium hover:opacity-90 transition-opacity inline-block text-black">
                  Verify Now
                </Link>
              </div>

              <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] md:p-[22px]">
                <div className="text-[32px] sm:text-[36px] mb-[12px] sm:mb-[14px]"><img src={Lock} alt="Lock" /></div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold text-white mb-[8px] sm:mb-[10px]">
                  2-factor Authentication (2FA)
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-400 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                  Please Get Verification Code From Google Authenticator To Enable
                </p>
                <Link to="/security/2fa" className="bg-transparent border border-[#00d4aa] text-[#00d4aa] px-[20px] sm:px-[24px] py-[8px] sm:py-[9px] md:py-[10px] rounded-[8px] text-[13px] sm:text-[14px] font-medium hover:opacity-90 transition-opacity inline-block">
                  Bid
                </Link>
              </div>

              <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] md:p-[22px]">
                <div className="text-[32px] sm:text-[36px] mb-[12px] sm:mb-[14px]"><img src={Click} alt="Click" /></div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold text-white mb-[8px] sm:mb-[10px]">
                  Buy Crypto With One-click
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-400 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                  Please Get Verification Code From Google Authenticator To Enable
                </p>
                <Link to="/buy-crypto" className="bg-transparent border border-[#00d4aa] text-[#00d4aa] px-[20px] sm:px-[24px] py-[8px] sm:py-[9px] md:py-[10px] rounded-[8px] text-[13px] sm:text-[14px] font-medium hover:opacity-90 transition-opacity inline-block">
                  Buy Crypto
                </Link>
              </div>
            </div>
          </div>

          {/* Chart + News */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[16px] sm:gap-[20px] md:gap-[24px] mb-[20px] sm:mb-[24px] md:mb-[28px]">
            <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] p-[18px] sm:p-[20px] md:p-[24px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px] sm:gap-[16px] mb-[16px] sm:mb-[20px]">
                <div className="flex flex-col items-center gap-[12px]">
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-white">Choose a Currency</h3>
                  <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="bg-transparent border border-gray-700 text-gray-300 px-[12px] py-[6px] rounded-[8px] text-[12px] sm:text-[13px] hover:bg-[#1a1a1a] transition-colors">
                    <option value="BTC/USD">BTC/USD</option>
                    <option value="ETH/USD">ETH/USD</option>
                    <option value="SOL/USD">SOL/USD</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-[8px]">
                  <button className="text-gray-400 hover:text-white text-[12px] sm:text-[13px]">Fire</button>
                  <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="bg-transparent border border-gray-700 text-gray-300 px-[12px] py-[6px] rounded-[8px] text-[12px] sm:text-[13px] hover:bg-[#1a1a1a] transition-colors">
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Daily">Daily</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mb-[16px] sm:mb-[20px]">
                <div>
                  <div className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-white mb-[4px]">$95,352.02</div>
                  <div className="text-[13px] sm:text-[14px] text-green-400">+15.95%</div>
                </div>
              </div>

              <div className="h-[280px] sm:h-[320px] md:h-[350px]">
                <Chart options={chartOptions} series={chartSeries} type="line" height="100%" />
              </div>
            </div>

            <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] p-[18px] sm:p-[20px] md:p-[24px]">
              <div className="flex items-center justify-between mb-[16px] sm:mb-[20px]">
                <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-white">News</h3>
                <Link to="/news" className="text-[#00d4aa] text-[12px] sm:text-[13px] font-medium hover:opacity-80 transition-opacity flex items-center gap-[4px]">
                  View More
                  <ChevronRight className="w-[14px] h-[14px]" />
                </Link>
              </div>

              <div className="flex gap-[8px] mb-[16px] sm:mb-[20px]">
                {['Latest News', 'Latest Event'].map((tab) => (
                  <button key={tab} onClick={() => setNewsTab(tab)} className={`px-[14px] sm:px-[16px] py-[6px] sm:py-[7px] rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-colors ${newsTab === tab ? 'bg-[#00d4aa] text-black' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-[12px] sm:space-y-[14px]">
                {newsItems.map((item, idx) => (
                  <div key={idx} className="pb-[12px] sm:pb-[14px] border-b border-gray-800 last:border-0">
                    <p className="text-[13px] sm:text-[14px] text-white mb-[6px] line-clamp-2">{item.title}</p>
                    <p className="text-[11px] sm:text-[12px] text-gray-400">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Section */}
          <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] p-[18px] sm:p-[20px] md:p-[24px] mb-[20px] sm:mb-[24px] md:mb-[28px]">
            <div className="flex items-center justify-between mb-[20px] sm:mb-[24px]">
              <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-white">Market</h3>
              <Link to="/market" className="text-[#00d4aa] text-[13px] sm:text-[14px] font-medium hover:opacity-80 transition-opacity flex items-center gap-[6px]">
                View More
                <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] sm:gap-[16px] md:gap-[18px]">
              {marketData.map((market, idx) => (
                <div key={idx} className="bg-[#0f0f0f] rounded-[16px] sm:rounded-[18px] p-[18px] sm:p-[20px] md:p-[22px] border border-gray-800/50">
                  <div className="flex items-start justify-between mb-[16px] sm:mb-[18px]">
                    <div className="flex items-center gap-[10px] sm:gap-[12px]">
                      <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] flex items-center justify-center flex-shrink-0">
                        <img src={market.icon} alt={market.name} className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px]" />
                      </div>
                      <div className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold text-white">{market.name}</div>
                    </div>
                    
                    <div className="flex items-center gap-[6px] bg-[#1a1a1a] px-[8px] py-[4px] rounded-[6px]">
                      <img src={Usd} alt="USD" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]" />
                      <span className="text-[11px] sm:text-[12px] text-gray-400 font-medium">{market.currency}</span>
                      <svg className="w-[12px] h-[12px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mb-[14px] sm:mb-[16px]">
                    <div className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-white mb-[6px]">{market.price}</div>
                    <div className={`text-[13px] sm:text-[14px] font-semibold ${market.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {market.change}
                    </div>
                  </div>

                  <div className="h-[60px] sm:h-[70px]">
                    <img src={market.graph} alt="Graph" className="w-full h-full object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-[#161616] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] p-[18px] sm:p-[20px] md:p-[24px]">
            <div className="flex items-center justify-between mb-[16px] sm:mb-[20px]">
              <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-white">
                Transaction History
              </h3>
              <Link to="/transactions" className="text-[#00d4aa] text-[13px] sm:text-[14px] font-medium hover:opacity-80 transition-opacity">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-[12px] sm:text-[13px] font-medium text-gray-400 pb-[12px] sm:pb-[14px] cursor-pointer" onClick={() => requestSort('symbol')}>
                      Crypto trade {getSortIcon('symbol')}
                    </th>
                    <th className="text-left text-[12px] sm:text-[13px] font-medium text-gray-400 pb-[12px] sm:pb-[14px] cursor-pointer" onClick={() => requestSort('id')}>
                      ID {getSortIcon('id')}
                    </th>
                    <th className="text-left text-[12px] sm:text-[13px] font-medium text-gray-400 pb-[12px] sm:pb-[14px] cursor-pointer" onClick={() => requestSort('date')}>
                      Date {getSortIcon('date')}
                    </th>
                    <th className="text-right text-[12px] sm:text-[13px] font-medium text-gray-400 pb-[12px] sm:pb-[14px]">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.map((tx, idx) => (
                    <tr key={idx} className="border-b border-gray-800/30 hover:bg-white/5 transition">
                      <td className="py-[14px] sm:py-[16px]">
                        <div className="flex items-center gap-[10px]">
                          <img src={tx.icon} alt={tx.symbol} className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]" />
                          <span className="text-[13px] sm:text-[14px] font-medium text-white">{tx.symbol}</span>
                        </div>
                      </td>
                      <td className="py-[14px] sm:py-[16px]">
                        <span className="text-[12px] sm:text-[13px] text-gray-400">{tx.id}</span>
                      </td>
                      <td className="py-[14px] sm:py-[16px]">
                        <span className="text-[12px] sm:text-[13px] text-gray-400">{tx.date}</span>
                      </td>
                      <td className="py-[14px] sm:py-[16px] text-right">
                        <span className="text-[13px] sm:text-[14px] font-medium text-green-400">{tx.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-[8px] mt-[20px] sm:mt-[24px]">
              <button className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] flex items-center justify-center rounded-[8px] bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                <ChevronLeft className="w-[16px] h-[16px]" />
              </button>
              {[1, 2, 3, '...', 10, 11].map((page, idx) => (
                <button key={idx} onClick={() => typeof page === 'number' && setCurrentPage(page)} className={`w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] flex items-center justify-center rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-colors ${currentPage === page ? 'bg-[#00d4aa] text-black' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}>
                  {page}
                </button>
              ))}
              <button className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] flex items-center justify-center rounded-[8px] bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                <ChevronRight className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}