import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Chart from "react-apexcharts";
import { TrendingUp, TrendingDown } from 'lucide-react';

import Deposit from "../Asset/Deposit.svg";
import Withdraw from "../Asset/Withdraw.svg";
import ExchangeIcon from "../Asset/Exchange.svg";
import TrxGraph from "../Asset/TrxGraph.svg";
import Ether from "../Asset/Ether.svg";
import Btc from "../../assets/Btc.svg";
import Eth from "../../assets/Eth.svg";
import Trx from "../../assets/Trx.svg";
import Usd from "../../assets/Usd.svg";
import Tether from "../../assets/Tether.svg";

import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";

export default function Asset() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('1D');
  const [tradeTab, setTradeTab] = useState('Trade History');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Exchange Panel State
  const [exchangeMode, setExchangeMode] = useState('exchange');
  const [sellCrypto, setSellCrypto] = useState('BTC');
  const [buyCrypto, setBuyCrypto] = useState('ETH');
  const [sellAmount, setSellAmount] = useState('0.1824');

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Price map for calculation
  const prices = { BTC: 95518, ETH: 3950.5, TRX: 0.655, BNB: 680, USDT: 1 };
  const icons = { BTC: Btc, ETH: Eth, TRX: Trx, BNB: Btc, USDT: Tether };

  const calculatedBuyAmount = sellAmount && prices[sellCrypto] && prices[buyCrypto]
    ? (parseFloat(sellAmount) * prices[sellCrypto] / prices[buyCrypto]).toFixed(6)
    : '0.000000';

  // Trade History Data
  const rawTrades = [
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Buy', price: 56.87, amount: 1.5, status: 'Pending' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Sell', price: 56.87, amount: 1.5, status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Buy', price: 56.87, amount: 1.5, status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Buy', price: 56.87, amount: 1.5, status: 'Completed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Sell', price: 56.87, amount: 1.5, status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Sell', price: 56.87, amount: 1.5, status: 'Failed' },
    { date: '15/04/24 - 15:50:29', pair: 'BNB/USDT', type: 'Sell', price: 56.87, amount: 1.5, status: 'Failed' },
  ];

  const sortedTrades = useMemo(() => {
    let list = [...rawTrades];
    if (sortConfig.key) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (['price', 'amount'].includes(sortConfig.key)) {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rawTrades, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ?
      <TrendingUp className="w-4 h-4 inline ml-1 text-[#00D4AA]" /> :
      <TrendingDown className="w-4 h-4 inline ml-1 text-[#00D4AA]" />;
  };

  // YOUR ORIGINAL CHARTS - 100% UNCHANGED
  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    colors: ['#40D4AA', '#008A9A', '#D32F2F', '#22C55E'],
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: { show: false },
            value: { fontSize: '32px', fontWeight: 700, color: '#FFFFFF', offsetY: 8 },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '14px',
              color: '#9CA3AF',
              formatter: () => ' $94,475'
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 },
    tooltip: { enabled: false }
  };
  const donutSeries = [24, 36, 16, 16];

  const balanceOptions = {
    chart: { type: 'area', height: 380, toolbar: { show: false }, background: 'transparent' },
    stroke: { curve: 'smooth', width: 3, colors: ['#4CAF50'] },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    grid: { borderColor: '#374151', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    xaxis: {
      categories: ['10 Dec','11 Dec','12 Dec','13 Dec','14 Dec','15 Dec','16 Dec','17 Dec','18 Dec','19 Dec','20 Dec','21 Dec'],
      labels: { style: { colors: '#9CA3AF', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      min: 0,
      max: 5000,
      tickAmount: 5,
      labels: {
        style: { colors: '#9CA3AF', fontSize: '11px' },
        formatter: (val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
      }
    },
    markers: {
      size: 6,
      colors: ['#00D4AA'],
      strokeColors: '#FFFFFF',
      strokeWidth: 3,
      hover: { size: 8 }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false }
  };
  const balanceSeries = [{ data: [3200,1200,1800,1400,2200,1100,3800,2100,3100,2900,4600,4475,2210] }];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Header - Fixed on top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Asset" />
      </div>

      {/* Desktop Sidebar - Starts below header */}
      <div className="hidden lg:block w-72 fixed left-0 top-16 bottom-0 bg-[#0a0a0a] border-r border-gray-800 z-40 overflow-y-auto">
        <Sidebar isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute left-0 top-0 h-full w-72 bg-[#0a0a0a] border-r border-gray-800" onClick={(e) => e.stopPropagation()}>
            <Sidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content - Pushes down under header */}
      <div className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-6 lg:p-8 space-y-6">
          {/* Alert */}
          <div className="bg-[#0c1f18] border border-[#1a3d32] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-[#00D4AA] flex items-center justify-center text-[#00D4AA] font-bold text-sm">!</div>
            <p className="text-sm text-gray-300">
              Please enable more verification options to secure your assets.{' '}
              <Link to="/security" className="text-[#00D4AA] hover:underline">Link </Link>
            </p>
          </div>

          {/* Top Cards - your original layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bitcoin Card */}
            <div className="lg:col-span-6 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <img src={Btc} alt="Bitcoin" className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-semibold">Bitcoin</h3>
                    <p className="text-[#00D4AA] text-sm font-medium">+14.25%</p>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <Link to="/deposit" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA] text-[#00D4AA] text-sm font-medium hover:bg-[#00D4AA] hover:text-black transition">
                    <img src={Deposit} className="w-4 h-4" /> Deposit
                  </Link>
                  <Link to="/withdraw" className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-600 text-gray-300 text-sm hover:border-gray-400 transition">
                    <img src={Withdraw} className="w-4 h-4" /> Withdraw
                  </Link>
                  <Link to="/exchange" className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-600 text-gray-300 text-sm hover:border-gray-400 transition">
                    <img src={ExchangeIcon} className="w-4 h-4" /> Exchange
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold">6,882 <span className="text-2xl text-gray-500 font-normal">BTC</span></h2>
                <p className="text-gray-500 text-sm mt-1">1 BTC = $95,518.00</p>
              </div>
            </div>

            {/* Tron Card */}
            <div className="lg:col-span-3 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img src={Trx} alt="Tron" className="w-10 h-10" />
                  <span className="font-semibold text-lg">Tron</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <img src={Usd} alt="USD" className="w-4 h-4" />
                  <span>USD</span>
                </div>
              </div>
              <div>
                <div className='flex justify-between items-end'>
                  <div className="text-2xl font-bold ">1,450 <span className="text-sm text-gray-500">TRX</span></div>
                  <p className="text-xs text-gray-500 ">1 BTC = $950,518.00</p>
                </div>
                <p className="text-[#00D4AA] text-sm mt-15">+6.25%</p>
                <img src={TrxGraph} alt="Tron Graph" className="w-full mt-5 h-16 object-contain" />
              </div>
            </div>

            {/* Ethereum Card */}
            <div className="lg:col-span-3 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img src={Eth} alt="Ethereum" className="w-10 h-10" />
                  <span className="font-semibold text-lg">Ethereum</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <img src={Usd} alt="USD" className="w-4 h-4" />
                  <span>USD</span>
                </div>
              </div>
              <div>
                <div className='flex justify-between items-end'>
                  <div className="text-2xl font-bold">5,356 <span className="text-sm text-gray-500">ETH</span></div>
                  <p className="text-xs text-gray-500 mt-1">1 ETH = $3,950.5...</p>
                </div>
                <p className="text-red-500 text-sm mt-15">-5.25%</p>
                <img src={Ether} alt="Ethereum Graph" className="w-full h-16 mt-5 object-contain" />
              </div>
            </div>
          </div>

          {/* Asset Overview + Total Balance - YOUR ORIGINAL CODE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-6">Asset Overview</h3>
              <div className="h-96 flex relative items-center justify-center">
                <Chart options={donutOptions} series={donutSeries} type="donut" height={380} />
                <div className="absolute text-center">
                  <p className="mb-20 text-2xl font-bold flex items-center justify-center gap-2">Total</p>
                  <p className="text-xl font-black text-gray-300 mt-6">12 assets</p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {/* Bitcoin */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full rounded-full bg-[#00D4AA]" style={{width:'24%'}} />
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="text-gray-300">Bitcoin </span>
                    <span className="text-[#00D4AA] text-xs">(BTC)</span>
                    <span className="font-medium ml-3">24%</span>
                  </div>
                </div>

                {/* Ethereum */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full rounded-full bg-[#008A9A]" style={{width:'36%'}} />
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="text-gray-300">Ethereum </span>
                    <span className="text-[#3B82F6] text-xs">(ETH)</span>
                    <span className="font-medium ml-3">36%</span>
                  </div>
                </div>

                {/* Tron */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full rounded-full bg-[#D32F2F]" style={{width:'16%'}} />
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="text-gray-300">Tron </span>
                    <span className="text-[#EF4444] text-xs">(TRX)</span>
                    <span className="font-medium ml-3">16%</span>
                  </div>
                </div>

                {/* Tether */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full rounded-full bg-[#22C55E]" style={{width:'16%'}} />
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="text-gray-300">Tether </span>
                    <span className="text-[#22C55E] text-xs">(USDT)</span>
                    <span className="font-medium ml-3">16%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Total balance</h3>
                <div className="flex gap-5 text-sm">
                  {['1D','7M','1M','3M','1Y','All'].map(t=>(
                    <button key={t} onClick={()=>setTimeFilter(t)}
                      className={`${timeFilter===t?'text-[#00D4AA]':'text-gray-500 hover:text-gray-300'} transition`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative h-96">
                <div className="absolute inset-x-0 top-10 flex justify-center z-10">
                  <div className="bg-[#1e3a2f] border border-[#00D4AA] rounded px-4 py-2 text-xs">
                    <span className="text-gray-400">Balance</span>
                    <span className="text-white font-bold ml-2">$94,475</span>
                  </div>
                </div>
                <Chart options={balanceOptions} series={balanceSeries} type="area" height={380} />
              </div>
            </div>
          </div>

          {/* Trade History + Exchange */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Trade History - Sortable */}
            <div className="lg:col-span-8 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-6">
                  {['Trade History','Open Orders','Orders History'].map(tab=>(
                    <button key={tab} onClick={()=>setTradeTab(tab)}
                      className={`text-sm font-medium ${tradeTab===tab?'text-[#00D4AA]':'text-gray-500'} hover:text-white`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <Link to="/orders" className="text-[#00D4AA] text-sm hover:underline">View All</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 text-xs border-b border-gray-800 pb-4">
                      <th className="text-left cursor-pointer" onClick={() => requestSort('date')}>Date/Time {getSortIcon('date')}</th>
                      <th className="text-left cursor-pointer" onClick={() => requestSort('pair')}>Pair {getSortIcon('pair')}</th>
                      <th className="text-left cursor-pointer" onClick={() => requestSort('type')}>Type {getSortIcon('type')}</th>
                      <th className="text-left cursor-pointer" onClick={() => requestSort('price')}>Price {getSortIcon('price')}</th>
                      <th className="text-left cursor-pointer" onClick={() => requestSort('amount')}>Amount {getSortIcon('amount')}</th>
                      <th className="text-right cursor-pointer" onClick={() => requestSort('status')}>Status {getSortIcon('status')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {sortedTrades.map((t,i)=>(
                      <tr key={i} className="hover:bg-white/5">
                        <td className="py-4 text-gray-400">{t.date}</td>
                        <td className="py-4">{t.pair}</td>
                        <td className={`py-4 font-medium ${t.type==='Buy'?'text-[#00D4AA]':'text-red-500'}`}>{t.type}</td>
                        <td className="py-4 text-gray-300">${t.price.toFixed(2)}</td>
                        <td className="py-4 text-gray-300">{t.amount}</td>
                        <td className={`py-4 text-right ${t.status==='Completed'?'text-green-500':t.status==='Failed'?'text-red-500':'text-yellow-500'}`}>
                          {t.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exchange/Buy Panel - Fixed dropdowns (dark background) */}
            <div className="lg:col-span-4 bg-[#141414] rounded-3xl p-6 border border-gray-800">
              <div className="flex bg-[#0a0a0a] rounded-full p-1 mb-8">
                <button onClick={() => setExchangeMode('exchange')} className={`flex-1 py-2.5 text-sm font-bold rounded-full ${exchangeMode==='exchange'?'bg-[#00D4AA] text-black':'text-gray-400'}`}>Exchange</button>
                <button onClick={() => setExchangeMode('buy')} className={`flex-1 py-2.5 text-sm font-bold rounded-full ${exchangeMode==='buy'?'bg-[#00D4AA] text-black':'text-gray-400'}`}>Buy</button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2"><span>Selling</span><span>{sellAmount || '0'} {sellCrypto}</span></div>
                  <div className="flex items-center bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-4">
                    <img src={icons[sellCrypto]} className="w-7 h-7" />
                    <select value={sellCrypto} onChange={e=>setSellCrypto(e.target.value)} className="mx-3 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00D4AA]">
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="TRX">TRX</option>
                      <option value="BNB">BNB</option>
                      <option value="USDT">USDT</option>
                    </select>
                    <input type="text" value={sellAmount} onChange={e=>setSellAmount(e.target.value)} className="ml-auto bg-transparent text-right w-28 outline-none font-medium" />
                  </div>
                </div>

                <div className="flex justify-center my-6">
                  <div className="w-12 h-12 bg-[#00D4AA] rounded-full flex items-center justify-center border-4 border-[#141414] z-10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                      <path d="M7 10v12" /><path d="M17 14v-12" /><path d="M7 22l-4-4" /><path d="M17 2l4 4" />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2"><span>Buying</span><span>{calculatedBuyAmount} {buyCrypto}</span></div>
                  <div className="flex items-center bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-4">
                    <img src={icons[buyCrypto]} className="w-7 h-7" />
                    <select value={buyCrypto} onChange={e=>setBuyCrypto(e.target.value)} className="mx-3 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00D4AA]">
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="TRX">TRX</option>
                      <option value="BNB">BNB</option>
                      <option value="USDT">USDT</option>
                    </select>
                    <input type="text" value={calculatedBuyAmount} readOnly className="ml-auto bg-transparent text-right w-28 outline-none font-medium" />
                  </div>
                </div>

                <div className="text-right text-xs text-gray-400 mt-6">Fee: <span className="text-white">$1.00</span></div>

                <Link to={exchangeMode==='exchange' ? '/exchange/confirm' : '/buy-crypto'} 
                  className="w-full mt-8 block text-center bg-[#00D4AA] text-black font-bold py-4 rounded-full hover:bg-[#00e6b3] transition text-lg">
                  {exchangeMode === 'exchange' ? 'Exchange' : 'Buy Now'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}