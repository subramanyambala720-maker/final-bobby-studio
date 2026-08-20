import { useState } from 'react';
import { FiSearch, FiBell, FiMenu, FiUser, FiChevronDown, FiGlobe } from 'react-icons/fi';

interface AdminHeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

const AdminHeader = ({ isSidebarCollapsed, onToggleSidebar, onOpenSearch }: AdminHeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#EAEAEA] sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left: Sidebar Toggle & Search Bar */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-[#555555] hover:text-black hover:bg-[#F5F5F7] rounded-lg transition-colors"
          aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <FiMenu size={18} />
        </button>

        {/* Global Quick Search Input */}
        <button
          onClick={onOpenSearch}
          className="w-64 md:w-80 h-9 px-3 bg-[#F5F5F7] hover:bg-[#EAEAEA]/80 border border-[#E0E0E4] rounded-lg flex items-center justify-between text-xs text-[#777777] transition-all"
        >
          <span className="flex items-center gap-2">
            <FiSearch size={14} className="text-[#888888]" />
            <span>Search bookings, projects, blogs...</span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#666666] bg-[#FFFFFF] border border-[#CCCCCC] rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Links, Notifications, Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Live Site Preview */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-[#F5F5F7] hover:bg-[#EAEAEA] rounded-lg border border-[#E0E0E4] transition-colors"
        >
          <FiGlobe size={13} />
          <span>Live Site</span>
        </a>

        {/* Notifications Button */}
        <button className="relative p-2 text-[#555555] hover:text-black hover:bg-[#F5F5F7] rounded-lg transition-colors">
          <FiBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 hover:bg-[#F5F5F7] rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
              BS
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-black leading-none">Bala Subramanyam</span>
              <span className="text-[10px] text-[#777777] leading-none mt-1 font-medium">Super Admin</span>
            </div>
            <FiChevronDown size={14} className="text-[#888888]" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#EAEAEA] py-1.5 text-xs z-50">
              <div className="px-4 py-2 border-b border-[#EAEAEA]">
                <p className="font-bold text-black">Bala Subramanyam</p>
                <p className="text-[#777777] text-[11px] truncate">subramanyambala720@gmail.com</p>
              </div>
              <a
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2 text-[#444444] hover:bg-[#F5F5F7] hover:text-black transition-colors"
              >
                <FiUser size={14} /> Account Settings
              </a>
              <div className="border-t border-[#EAEAEA] my-1" />
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  window.location.href = '/admin/login';
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
