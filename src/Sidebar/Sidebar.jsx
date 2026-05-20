import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Settings, Mail, Gift, ChevronUp, ChevronRight, Copy, TrendingUp, Menu } from "lucide-react"; // Added Menu
import Smith from "../assets/Smith.png";

const Sidebar = ({ isOpen: externalIsOpen, onClose }) => {
  const location = useLocation();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(true);
  const [ordersOpen, setOrdersOpen] = useState(true);
  const [marketOpen, setMarketOpen] = useState(true);
  const [settingOpen, setSettingOpen] = useState(true);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const toggleSidebar = () => {
    if (externalIsOpen !== undefined && onClose) {
      onClose();
    } else {
      setInternalIsOpen(prev => !prev); // Fixed: properly toggle internal state
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Hamburger Menu Button - Visible only on mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#0a0a0a] border border-gray-800 text-white hover:bg-[#1a1a1a] transition-all"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40 w-64 md:w-auto
        h-full bg-[#0a0a0a] flex flex-col text-white border-r border-gray-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isOpen ? 'block' : 'hidden md:block'}
      `}>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 sm:py-7 md:py-8 lg:py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-4 sm:px-5 md:px-6">
            <nav className="space-y-1 sm:space-y-1.5">
              {/* Dashboard */}
              <Link
                to="/" 
                className={`w-full flex items-center gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'bg-[#0d3a3a] text-[#00d4aa]' 
                    : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'
                }`}
              >
                <Home className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Dashboard</span>
              </Link>

              {/* Wallet Section */}
              <div className="space-y-0">
                <button 
                  onClick={() => setWalletOpen(!walletOpen)}
                  className={`w-full flex items-center justify-between gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${
                    isActive('/asset') || isActive('/deposit') || isActive('/withdraw')
                      ? 'text-[#00d4aa]'
                      : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
                    <Wallet className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Wallet</span>
                  </div>
                  <ChevronUp className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] transition-transform duration-200 ${walletOpen ? '' : 'rotate-180'}`} />
                </button>
                
                {walletOpen && (
                  <div className="ml-8 sm:ml-10 md:ml-12 space-y-0 mt-1">
                    <Link to="/asset" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/asset') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Asset</span></Link>
                    <Link to="/deposit" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/deposit') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Deposit</span></Link>
                    <Link to="/withdraw" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/withdraw') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Withdraw</span></Link>
                  </div>
                )}
              </div>

              {/* Orders Section */}
              <div className="space-y-0">
                <button 
                  onClick={() => setOrdersOpen(!ordersOpen)}
                  className={`w-full flex items-center justify-between gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${
                    isActive('/spot') || isActive('/transaction')
                      ? 'text-[#00d4aa]'
                      : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
                    <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Orders</span>
                  </div>
                  <ChevronUp className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] transition-transform duration-200 ${ordersOpen ? '' : 'rotate-180'}`} />
                </button>
                
                {ordersOpen && (
                  <div className="ml-8 sm:ml-10 md:ml-12 space-y-0 mt-1">
                    <Link to="/spot" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/spot') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Spot History</span></Link>
                    <Link to="/transaction" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/transaction') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Transaction History</span></Link>
                  </div>
                )}
              </div>

              {/* Copy Trading */}
              <Link to="/copy-trading" className={`w-full flex items-center gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${isActive('/copy-trading') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'}`}>
                <Copy className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Copy Trading</span>
              </Link>

              {/* Market Section */}
              <div className="space-y-0">
                <button 
                  onClick={() => setMarketOpen(!marketOpen)}
                  className={`w-full flex items-center justify-between gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${
                    isActive('/market') || isActive('/live-market')
                      ? 'text-[#00d4aa]'
                      : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
                    <TrendingUp className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Market</span>
                  </div>
                  <ChevronUp className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] transition-transform duration-200 ${marketOpen ? '' : 'rotate-180'}`} />
                </button>
                
                {marketOpen && (
                  <div className="ml-8 sm:ml-10 md:ml-12 space-y-0 mt-1">
                    <Link to="/market" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/market') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Market</span></Link>
                    <Link to="/live-market" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/live-market') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Live Market</span></Link>
                  </div>
                )}
              </div>

              {/* Setting Section */}
              <div className="space-y-0">
                <button 
                  onClick={() => setSettingOpen(!settingOpen)}
                  className={`w-full flex items-center justify-between gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${
                    isActive('/overview') || isActive('/security') || isActive('/identification') || isActive('/account')
                      ? 'text-[#00d4aa]'
                      : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
                    <Settings className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Setting</span>
                  </div>
                  <ChevronUp className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] transition-transform duration-200 ${settingOpen ? '' : 'rotate-180'}`} />
                </button>
                
                {settingOpen && (
                  <div className="ml-8 sm:ml-10 md:ml-12 space-y-0 mt-1">
                    <Link to="/overview" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/overview') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Overview</span></Link>
                    <Link to="/security" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/security') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Security</span></Link>
                    <Link to="/identification" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/identification') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Identification</span></Link>
                    <Link to="/account" className={`w-full text-left block px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-200 ${isActive('/account') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-400 hover:text-[#00d4aa] hover:bg-[#1a1a1a]'}`}><span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal">Account</span></Link>
                  </div>
                )}
              </div>

              {/* Ticket */}
              <Link to="/ticket" className={`w-full flex items-center gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${isActive('/ticket') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'}`}>
                <Mail className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Ticket</span>
              </Link>

              {/* Rewards */}
              <Link to="/rewards" className={`w-full flex items-center gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${isActive('/rewards') ? 'bg-[#0d3a3a] text-[#00d4aa]' : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00d4aa]'}`}>
                <Gift className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal">Rewards</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section - User Profile */}
        <div className="px-4 sm:px-5 md:px-6 pb-6 sm:pb-7 md:pb-8 border-t border-gray-800 pt-4 sm:pt-5 md:pt-6">
          <Link
            to="/account-setting"
            className={`w-full flex items-center justify-between gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-200 ${
              isActive('/account-setting') ? 'bg-[#0d3a3a]' : 'hover:bg-[#1a1a1a]'
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
              <img 
                src={Smith} 
                alt="Ricky Smith" 
                className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[52px] md:h-[52px] rounded-full object-cover flex-shrink-0"
              />
              <div className="text-left">
                <p className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-white">Ricky Smith</p>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#00d4aa] font-normal">Account Setting</p>
              </div>
            </div>
            <ChevronRight className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-gray-400 flex-shrink-0" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;