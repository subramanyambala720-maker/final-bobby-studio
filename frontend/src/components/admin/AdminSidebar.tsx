import { Link, useLocation } from 'react-router-dom';
import {
  FiGrid,
  FiCalendar,
  FiFolder,
  FiImage,
  FiBox,
  FiDollarSign,
  FiFileText,
  FiStar,
  FiHardDrive,
  FiSettings,
  FiUsers,
  FiExternalLink,
  FiLogOut,
  FiSliders,
  FiMessageSquare,
} from 'react-icons/fi';

interface NavGroup {
  title: string;
  items: {
    name: string;
    path: string;
    icon: any;
    badge?: string;
  }[];
}

const menuGroups: NavGroup[] = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
      { name: 'Bookings', path: '/admin/bookings', icon: FiCalendar, badge: 'Live' },
      { name: 'Contact Enquiries', path: '/admin/enquiries', icon: FiMessageSquare, badge: 'New' },
    ],
  },
  {
    title: 'CONTENT MANAGEMENT',
    items: [
      { name: 'Home / Hero CMS', path: '/admin/cms/hero', icon: FiSliders },
      { name: 'About Us CMS', path: '/admin/cms/about', icon: FiFolder },
      { name: 'Services CMS', path: '/admin/cms/services', icon: FiBox },
      { name: 'Gallery CMS', path: '/admin/cms/gallery', icon: FiImage },
      { name: 'Packages CMS', path: '/admin/cms/packages', icon: FiDollarSign },
      { name: 'Contact Us CMS', path: '/admin/enquiries', icon: FiMessageSquare, badge: 'New' },
    ],
  },
  {
    title: 'SYSTEM & MEDIA',
    items: [
      { name: 'Media Library', path: '/admin/media', icon: FiHardDrive },
      { name: 'Website Settings', path: '/admin/settings', icon: FiSettings },
      { name: 'Users & Roles', path: '/admin/users', icon: FiUsers },
    ],
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

const AdminSidebar = ({ isCollapsed, onLogout }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#FFFFFF] border-r border-[#EAEAEA] flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-[#EAEAEA] flex items-center justify-between flex-shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-base flex-shrink-0">
            B
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black tracking-wider leading-none">
                BOBBY STUDIO
              </span>
              <span className="text-[10px] text-[#777777] tracking-widest font-semibold mt-1">
                ADMIN PORTAL
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-semibold text-[#888888] tracking-[0.15em] uppercase mb-2">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#000000] text-[#FFFFFF] font-semibold shadow-sm'
                      : 'text-[#555555] hover:bg-[#F5F5F7] hover:text-[#000000]'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon
                    size={16}
                    className={`flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-[#777777] group-hover:text-black'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1">{item.name}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-[#F0F0F0] text-[#000000] group-hover:bg-[#E2E2E2]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-[#EAEAEA] flex flex-col gap-1 flex-shrink-0 bg-[#FAFAFA]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#555555] hover:text-black hover:bg-[#EAEAEA]/60 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="View Live Website"
        >
          <FiExternalLink size={15} />
          {!isCollapsed && <span>View Website</span>}
        </a>
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Logout"
        >
          <FiLogOut size={15} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
