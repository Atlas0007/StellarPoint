import { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import Btc from "../../assets/Btc.svg";
import Eth from "../../assets/Eth.svg";
import Uni from "../../assets/Uni.svg";
import Trx from "../../assets/Trx.svg";
import Bnb from "../../assets/Bnb.svg";
import Tether from "../../assets/Tether.svg";
import Sol from "../../assets/Sol.svg";
import Info from "../Asset/Info.svg";
import Scan from "../Deposit/Scan.svg";

// Components
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";

// Transaction data
const transactions = [
  { id: '1sJhSdscicXk2385s001', icon: Btc, symbol: 'BTC', date: '2025-06-12', amount: '+571.3 BTC' },
  { id: '1sJhSdscicXk2385s002', icon: Eth, symbol: 'ETH', date: '2025-06-13', amount: '+571.3 ETH' },
  { id: '1sJhSdscicXk2385s003', icon: Bnb, symbol: 'BNB', date: '2025-06-14', amount: '+571.3 BNB' },
  { id: '1sJhSdscicXk2385s004', icon: Tether, symbol: 'USDT', date: '2025-06-15', amount: '+571.3 USDT' },
  { id: '1sJhSdscicXk2385s005', icon: Trx, symbol: 'TRX', date: '2025-06-16', amount: '+571.3 TRX' },
  { id: '1sJhSdscicXk2385s006', icon: Uni, symbol: 'UNI', date: '2025-06-17', amount: '+571.3 UNI' },
  { id: '1sJhSdscicXk2385s007', icon: Uni, symbol: 'UNI', date: '2025-06-17', amount: '+571.3 UNI' },
  { id: '1sJhSdscicXk2385s008', icon: Sol, symbol: 'ETC', date: '2025-06-18', amount: '+571.3 ETC' },
  { id: '1sJhSdscicXk2385s009', icon: Btc, symbol: 'BTC', date: '2025-06-19', amount: '+571.3 BTC' },
];

export default function Deposit() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('TONCOIN (TON)');

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const cryptoOptions = [
    { symbol: 'USDT', name: 'Tether', icon: Tether },
    { symbol: 'BTC', name: 'Bitcoin', icon: Btc },
    { symbol: 'ETH', name: 'Ethereum', icon: Eth },
    { symbol: 'TRX', name: 'Tron', icon: Trx },
    { symbol: 'SOL', name: 'Solana', icon: Sol },
    { symbol: 'BNB', name: 'BNB', icon: Bnb },
  ];

  const networkOptions = [
    'TONCOIN (TON)',
    'TRC20 (Tron)',
    'ERC20 (Ethereum)',
    'BEP20 (BSC)',
    'SOL (Solana)',
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-gray-800">
        <Header onToggleSidebar={toggleSidebar} title="Deposit" />
      </div>

      {/* Desktop Sidebar - Always visible */}
      <div className="hidden lg:block w-72 fixed left-0 top-16 bottom-0 bg-[#0a0a0a] border-r border-gray-800 z-40 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div 
            className="absolute left-0 top-0 h-full w-72 bg-[#0a0a0a] border-r border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

          {/* 4-Step Guide */}
          <div className="bg-[#141414] rounded-2xl border border-gray-800 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map((step) => (
                <div key={step} className="text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg ${
                    step === 1 ? 'bg-[#00D4AA]/20 text-[#00D4AA]' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {step}
                  </div>
                  <h4 className="font-semibold mb-2">
                    {step === 1 && "Select Token & Copy Address"}
                    {step === 2 && "Withdraw to Wallet Address"}
                    {step === 3 && "Transfer Confirmation"}
                    {step === 4 && "Deposit Successful"}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {step === 1 && "Select the token and network you want to deposit and copy the wallet address shown on this page."}
                    {step === 2 && "Paste the copied wallet address on other exchange platforms and submit a withdrawal application."}
                    {step === 3 && "Wait for the blockchain network to confirm the transfer."}
                    {step === 4 && "After the blockchain network has confirmed the transfer, Stellar will transfer the asset to your wallet address."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="bg-[#141414] rounded-2xl p-5 border border-gray-800 flex items-center gap-3">
            <img src={Info} alt="Info" className="w-5 h-5" />
            <p className="text-sm text-gray-300">
              Deposit 100 USDT & Trade 100 USDT in Futures, Reward 10 USDT
            </p>
            <Link to="/promo/deposit-100" className="ml-auto text-[#00D4AA] text-sm font-medium hover:underline">
              Details
            </Link>
          </div>

          {/* Deposit Form + Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Deposit Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#141414] rounded-3xl border border-gray-800 p-8 lg:p-10">
                <h2 className="text-2xl font-bold mb-10">Deposit</h2>

                {/* Select Crypto */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] flex items-center justify-center font-bold text-lg">1</div>
                    <h3 className="text-xl font-medium">Select the cryptocurrency to deposit</h3>
                  </div>
                  <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full bg-[#1a1a1a] rounded-2xl px-6 py-5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#00D4AA]"
                  >
                    {cryptoOptions.map(coin => (
                      <option key={coin.symbol} value={coin.symbol}>
                        {coin.name} ({coin.symbol})
                      </option>
                    ))}
                  </select>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {cryptoOptions.map(coin => (
                      <button
                        key={coin.symbol}
                        onClick={() => setSelectedCrypto(coin.symbol)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition ${
                          selectedCrypto === coin.symbol
                            ? 'bg-[#00D4AA]/10 border-[#00D4AA] text-[#00D4AA]'
                            : 'border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        <img src={coin.icon} alt={coin.symbol} className="w-6 h-6" />
                        <span className="font-medium">{coin.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Network */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center font-bold text-lg">2</div>
                    <h3 className="text-xl font-medium">Select Network</h3>
                  </div>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full bg-[#1a1a1a] rounded-2xl px-6 py-5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#00D4AA]"
                  >
                    {networkOptions.map(net => (
                      <option key={net} value={net}>{net}</option>
                    ))}
                  </select>
                </div>

                {/* Deposit Address */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center font-bold text-lg">3</div>
                    <h3 className="text-xl font-medium">Deposit details</h3>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-3xl p-10 border border-gray-700 text-center">
                    <img src={Scan} alt="QR Code" className="w-64 h-64 mx-auto mb-8" />
                    <p className="text-sm text-gray-400 mb-3">{selectedNetwork} Address</p>
                    <p className="text-xl font-mono break-all text-[#00D4AA] mb-8">
                      TV5aRTnjZSvvprX5f7jhJkWwfVvD8...
                    </p>
                    <button className="mx-auto flex items-center gap-3 px-10 py-4 bg-[#00D4AA]/10 border-2 border-[#00D4AA] text-[#00D4AA] rounded-2xl hover:bg-[#00D4AA] hover:text-black transition font-semibold text-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Address
                    </button>

                    <p className="text-red-500 text-sm mt-10 max-w-lg mx-auto font-medium">
                      Note: Please make sure that the address you copied matches the deposit address on this page.
                    </p>

                    <div className="grid grid-cols-2 gap-10 mt-10 text-left">
                      <div>
                        <p className="text-gray-500 text-sm">Min Deposit</p>
                        <p className="font-semibold text-lg">0.01 USDT</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Expected Arrival</p>
                        <p className="font-semibold text-lg">1 network confirmations</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Contract Address</p>
                        <p className="font-semibold text-lg">Ending with jUst</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-[#141414] rounded-2xl p-6 border border-gray-800">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-3">
                  <img src={Info} alt="Tips" className="w-6 h-6" />
                  Tips
                </h4>
                <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
                  <li>• This address only supports deposits of USDT assets. Do not deposit other assets to this address as the asset will not be credited or recoverable.</li>
                  <li>• Please note, if the single deposit amount is less than the minimum deposit amount, it will be credited. The platform will not be liable for any loss of assets resulting from this.</li>
                </ul>
              </div>

              <div className="bg-[#141414] rounded-2xl p-6 border border-gray-800">
                <h4 className="font-bold text-lg mb-5">Deposit FAQ</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="hover:text-white cursor-pointer transition">How to Deposit on Stellar?</li>
                  <li className="hover:text-white cursor-pointer transition">Have an uncredited deposit? Apply for return</li>
                  <li className="hover:text-white cursor-pointer transition">View all deposit & withdrawal status</li>
                </ul>
                <Link to="/faq/deposit" className="text-[#00D4AA] text-sm font-medium mt-5 inline-block hover:underline">
                  View More
                </Link>
              </div>

              <div className="bg-[#141414] rounded-2xl p-6 border border-gray-800">
                <h4 className="font-bold text-lg mb-4">Buy Crypto</h4>
                <p className="text-sm text-gray-400 mb-5">
                  Supports buying crypto with Visa, Mastercard, PayPal and bank transfer
                </p>
                <Link to="/buy-crypto" className="text-[#00D4AA] font-medium hover:underline text-lg">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-[#00D4AA]">Transaction History</h3>
            <div className="bg-[#141414] rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h4 className="font-semibold text-lg">Crypto Deposits</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b border-gray-800">
                      <th className="py-4 px-6"></th>
                      <th className="py-4 px-6">TxID</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/5 transition">
                        <td className="py-5 px-6">
                          <img src={tx.icon} alt={tx.symbol} className="w-8 h-8" />
                        </td>
                        <td className="py-5 px-6 text-sm text-gray-400 font-mono">
                          {tx.id.slice(0, 14)}...
                        </td>
                        <td className="py-5 px-6 text-sm">{tx.date}</td>
                        <td className="py-5 px-6 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[#00D4AA] font-medium">{tx.amount}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-800 flex justify-between items-center text-sm">
                <span className="text-gray-500">Showing 1-10 of 128</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-lg bg-[#00D4AA] text-black font-bold">1</button>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">2</button>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">3</button>
                  <span className="text-gray-500 self-center">...</span>
                  <button className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700">10</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}