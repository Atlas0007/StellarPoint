import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Btc from "../../assets/Btc.svg";
import Eth from "../../assets/Eth.svg";
import Uni from "../../assets/Uni.svg";
import Trx from "../../assets/Trx.svg";
import Bnb from "../../assets/Bnb.svg";
import Tether from "../../assets/Tether.svg";
import Sol from "../../assets/Sol.svg";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";
import Export from "../../Orders/Export.svg";
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Withdraw() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20 (Tron)');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [addressType, setAddressType] = useState('address');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const cryptoOptions = [
    { symbol: 'USDT', name: 'Tether', icon: Tether },
    { symbol: 'BTC', name: 'Bitcoin', icon: Btc },
    { symbol: 'ETH', name: 'Ethereum', icon: Eth },
    { symbol: 'TRX', name: 'Tron', icon: Trx },
    { symbol: 'SOL', name: 'Solana', icon: Sol },
    { symbol: 'BNB', name: 'BNB', icon: Bnb },
  ];

  const networkOptions = {
    USDT: ['TRC20 (Tron)', 'ERC20 (Ethereum)', 'BEP20 (BSC)'],
    BTC: ['BTC'],
    ETH: ['ERC20 (Ethereum)'],
    TRX: ['TRC20 (Tron)'],
    SOL: ['SOL (Solana)'],
    BNB: ['BEP20 (BSC)'],
  };

  const selectedCryptoData = cryptoOptions.find(c => c.symbol === selectedCrypto);

  // Reset network when crypto changes
  useEffect(() => {
    const availableNetworks = networkOptions[selectedCrypto];
    if (availableNetworks && !availableNetworks.includes(selectedNetwork)) {
      setSelectedNetwork(availableNetworks[0]);
    }
  }, [selectedCrypto, selectedNetwork]);

  const rawTransactions = [
    { icon: Btc, symbol: 'BTC', txid: '1sJhSdscicXk2385s...', date: '2025-06-12', amount: '+$71.3 BTC', amountNum: 71.3 },
    { icon: Eth, symbol: 'ETH', txid: '1sJhSdscicXk2385s...', date: '2025-06-13', amount: '+$71.3 ETH', amountNum: 71.3 },
    { icon: Bnb, symbol: 'BNB', txid: '1sJhSdscicXk2385s...', date: '2025-06-14', amount: '+$71.3 BNB', amountNum: 71.3 },
    { icon: Tether, symbol: 'USDT', txid: '1sJhSdscicXk2385s...', date: '2025-06-15', amount: '+$71.3 USDT', amountNum: 71.3 },
    { icon: Trx, symbol: 'TRX', txid: '1sJhSdscicXk2385s...', date: '2025-06-16', amount: '+$71.3 TRX', amountNum: 71.3 },
    { icon: Uni, symbol: 'UNI', txid: '1sJhSdscicXk2385s...', date: '2025-06-17', amount: '+$71.3 UNI', amountNum: 71.3 },
    { icon: Sol, symbol: 'ETC', txid: '1sJhSdscicXk2385s...', date: '2025-06-18', amount: '+$71.3 ETC', amountNum: 71.3 },
    { icon: Btc, symbol: 'BTC', txid: '1sJhSdscicXk2385s...', date: '2025-06-19', amount: '+$71.3 BTC', amountNum: 71.3 },
  ];

  const sortedTransactions = useMemo(() => {
    let list = [...rawTransactions];
    if (sortConfig.key) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === 'date') {
          aVal = new Date(a.date);
          bVal = new Date(b.date);
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rawTransactions, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
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

  const handleExport = () => {
    const headers = ['Symbol', 'Transaction ID', 'Date', 'Amount'];
    const rows = sortedTransactions.map(t => [t.symbol, t.txid, t.date, t.amount]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'withdrawal_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Only allow numbers & decimal
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Header - Fixed on top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
        <Header onToggleSidebar={toggleSidebar} title="Withdraw" />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Withdraw Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#141414] rounded-3xl border border-gray-800 p-8">
                <h2 className="text-2xl font-bold mb-10">Withdraw</h2>

                {/* Step 1 */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] flex items-center justify-center font-bold text-lg">1</div>
                    <h3 className="text-xl font-medium">Select Crypto</h3>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                      className="w-full bg-[#1a1a1a] hover:bg-[#222222] rounded-2xl px-6 py-5 flex items-center justify-between text-lg font-medium transition"
                    >
                      <div className="flex items-center gap-4">
                        <img src={selectedCryptoData?.icon} alt={selectedCrypto} className="w-10 h-10" />
                        <span>{selectedCryptoData?.name} ({selectedCrypto})</span>
                      </div>
                      <svg className={`w-6 h-6 text-gray-400 transition-transform ${showCryptoDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showCryptoDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl z-50">
                        {cryptoOptions.map(coin => (
                          <button
                            key={coin.symbol}
                            onClick={() => {
                              setSelectedCrypto(coin.symbol);
                              setShowCryptoDropdown(false);
                            }}
                            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-[#222222] transition text-left"
                          >
                            <img src={coin.icon} alt={coin.symbol} className="w-10 h-10" />
                            <div>
                              <div className="font-semibold">{coin.name}</div>
                              <div className="text-sm text-gray-400">{coin.symbol}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center font-bold text-lg">2</div>
                    <h3 className="text-xl font-medium">Withdraw To</h3>
                  </div>

                  {/* Address Tabs */}
                  <div className="mb-6">
                    <div className="flex gap-8 border-b border-gray-700 mb-6">
                      <button
                        onClick={() => setAddressType('address')}
                        className={`pb-3 text-lg font-medium transition-colors relative ${addressType === 'address' ? 'text-white' : 'text-gray-500'}`}
                      >
                        Address
                        {addressType === 'address' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
                      </button>
                      <button
                        onClick={() => setAddressType('zyrix')}
                        className={`pb-3 text-lg font-medium transition-colors relative ${addressType === 'zyrix' ? 'text-white' : 'text-gray-500'}`}
                      >
                        Zyrix users
                        {addressType === 'zyrix' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={addressType === 'zyrix' ? "Enter Zyrix username or email" : "Enter withdrawal address"}
                      className="w-full bg-[#1a1a1a] rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA]"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Network</label>
                    <select
                      value={selectedNetwork}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                      className="w-full bg-[#1a1a1a] rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA]"
                    >
                      {networkOptions[selectedCrypto]?.map(net => (
                        <option key={net} value={net}>{net}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm mt-6">
                    <div><p className="text-gray-500">USDT Account Equity</p><p className="font-semibold text-lg">0 USDT</p></div>
                    <div><p className="text-gray-500">Withdrawal Fees</p><p className="font-semibold text-lg">0 - 5 USDT</p></div>
                    <div><p className="text-gray-500">24H Withdrawal Limit</p><p className="font-semibold text-lg">0 / 15 BTC</p></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center font-bold text-lg">3</div>
                    <h3 className="text-xl font-medium">Withdraw Amount</h3>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="Minimum withdrawal amount: 5"
                      className="w-full bg-[#1a1a1a] rounded-2xl px-6 py-6 text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-[#00D4AA] pr-24"
                    />
                    <button onClick={() => setAmount('3400')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00D4AA] text-sm font-medium hover:underline">
                      Select all
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">Available Balance: <span className="text-white font-medium">3400 USDT</span></p>

                  <Link
                    to={{
                      pathname: "/withdraw/confirm",
                      state: { amount, selectedCrypto, address, selectedNetwork, addressType }
                    }}
                    className="block w-full mt-10 bg-gradient-to-r from-[#00D4AA] to-[#00B89A] text-black font-bold py-6 rounded-2xl text-xl text-center hover:opacity-90 transition"
                  >
                    Submit
                  </Link>

                  <div className="flex justify-between items-center mt-6 text-sm">
                    <span className="text-gray-500">24-hour withdrawal limit: 0/15 BTC</span>
                    <span className="text-[#00D4AA] font-medium">Fee: 1 USDT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#141414] rounded-2xl p-6 border border-gray-800">
                <h4 className="font-bold text-lg mb-4">Withdrawal Notification</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Enjoy 0 transition fees and fast speed for withdrawals made to "Stellar Users"<br /><br />
                  Please do not withdraw funds to an ICO address or for crowdfunding. Stellar will not be responsible for distributing the future tokens you may receive.
                </p>
              </div>

              <div className="bg-[#141414] rounded-2xl p-6 border border-gray-800">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="font-bold text-lg">Withdrawal FAQ</h4>
                  <Link to="/faq" className="text-[#00D4AA] text-sm font-medium hover:underline">View More</Link>
                </div>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="hover:text-white cursor-pointer transition">How to Withdraw on Stellar?</li>
                  <li className="hover:text-white cursor-pointer transition">Not receiving Withdraw Issue?</li>
                  <li className="hover:text-white cursor-pointer transition">Withdraw to the wrong address or filled in the wrong Memo/Tag?</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-[#00D4AA]">Transaction History</h3>
              <button onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-[#1a1a1a] rounded-xl border border-gray-700 hover:bg-[#222222] transition">
                <img src={Export} alt="Export" className="w-5 h-5" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>

            <div className="bg-[#141414] rounded-3xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h4 className="font-semibold text-lg">Crypto trade</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b border-gray-800">
                      <th className="py-4 px-6 w-32"></th>
                      <th className="py-4 px-6 w-80 cursor-pointer select-none" onClick={() => handleSort('txid')}>
                        <div className="inline-flex items-center">
                          ID {getSortIcon('txid')}
                        </div>
                      </th>
                      <th className="py-4 px-6 w-48 cursor-pointer select-none" onClick={() => handleSort('date')}>
                        <div className="inline-flex items-center">
                          Date {getSortIcon('date')}
                        </div>
                      </th>
                      <th className="py-4 px-6 w-56 text-right cursor-pointer select-none" onClick={() => handleSort('amountNum')}>
                        <div className="inline-flex items-center justify-end w-full">
                          Amount {getSortIcon('amountNum')}
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
                            <svg className="w-5 h-5 cursor-pointer hover:opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="font-mono text-gray-400">{tx.txid}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-base">{tx.date}</td>
                        <td className="py-5 px-6 text-right text-[#00D4AA] font-medium text-lg">{tx.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}