import { Search, Earth, Wallet, Bell, Menu, ChevronDown } from "lucide-react";
import Smith from "../assets/Smith.png";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-[#0a0a0a] border-b border-gray-800 w-full max-w-full overflow-x-hidden">
      <div className="flex items-center justify-between px-[16px] sm:px-[20px] md:px-[24px] lg:px-[32px] xl:px-[40px] py-[14px] sm:py-[16px] md:py-[18px] lg:py-[20px]">
        
        {/* Left Section - Hamburger + Title */}
        <div className="flex items-center gap-[16px] sm:gap-[24px] flex-shrink-0 min-w-0">
          
          {/* Hamburger Menu - Only visible on mobile */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-[8px] rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-[20px] h-[20px] text-gray-300" />
          </button>

          {/* Page Title */}
           <div className="flex items-center gap-[8px] flex-shrink-0">
          <h1 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] font-bold text-white">
            Stellar <span className="text-[#00d4aa]">Point</span>
          </h1>
        </div>
        </div>

        {/* Right Section - Icons + Profile */}
        <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] lg:gap-[20px] xl:gap-[24px] flex-shrink-0">

          {/* Search Bar - Hidden on very small screens */}
          <div className="relative w-[200px] sm:w-[240px] md:w-[280px] hidden sm:block">
            <input
              type="text"
              placeholder="Search your coins..."
              className="w-full bg-[#1a1a1a] text-gray-300 placeholder-gray-500 rounded-full pl-[40px] pr-[16px] py-[8px] sm:py-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00d4aa]/30 border border-gray-800"
            />
            <Search className="absolute left-[12px] sm:left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-gray-500" />
          </div>

          {/* Search Icon Only - Mobile */}
          <button className="sm:hidden w-[38px] h-[38px] rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center flex-shrink-0 border border-gray-800">
            <Search className="w-[18px] h-[18px] text-gray-400" />
          </button>

          {/* Help / Language */}
          <button className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center flex-shrink-0 border border-gray-800">
            <Earth className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] text-gray-400" />
          </button>

          {/* Wallet */}
          <button className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center flex-shrink-0 border border-gray-800">
            <Wallet className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] text-gray-400" />
          </button>

          {/* Notification Bell */}
          <button className="relative w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center flex-shrink-0 border border-gray-800">
            <Bell className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] text-gray-400" />
            <span className="absolute top-[7px] right-[7px] w-[9px] h-[9px] bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-[8px] sm:gap-[10px] md:gap-[12px] hover:opacity-90 transition-opacity flex-shrink-0 bg-[#1a1a1a] rounded-full pl-[4px] pr-[12px] sm:pr-[16px] py-[4px] border border-gray-800">
            <img
              src={Smith}
              alt="Ricky Smith"
              className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] md:w-[40px] md:h-[40px] rounded-full object-cover border-2 border-[#00d4aa]/20"
            />
            <span className="text-[13px] sm:text-[14px] md:text-[15px] text-white font-medium hidden sm:inline">
              Ricky Smith
            </span>
            <ChevronDown className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] text-gray-400 hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}