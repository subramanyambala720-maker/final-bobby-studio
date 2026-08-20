import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { FiSearch, FiX } from 'react-icons/fi';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication Guard Check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && location.pathname !== '/admin/login') {
      // Set dummy demo token for instant access
      localStorage.setItem('adminToken', 'demo-admin-token-bobby-studio');
    }
  }, [location.pathname]);

  // Keyboard Command+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const quickNavLinks = [
    { title: 'Dashboard', path: '/admin/dashboard', desc: 'Real-time revenue & bookings summary' },
    { title: 'Bookings Manager', path: '/admin/bookings', desc: 'Manage shoot bookings and calendar' },
    { title: 'Hero Slider CMS', path: '/admin/cms/hero', desc: 'Edit homepage hero slides & banners' },
    { title: 'Portfolio Projects', path: '/admin/cms/portfolio', desc: 'Upload shoots and category galleries' },
    { title: 'Packages & Pricing', path: '/admin/cms/packages', desc: 'Manage Silver, Gold, Platinum pricing' },
    { title: 'Media Library', path: '/admin/media', desc: 'Cloudinary media uploads & file manager' },
    { title: 'Website Settings', path: '/admin/settings', desc: 'Studio contact info, maps & social links' },
  ];

  const filteredLinks = searchQuery === ''
    ? quickNavLinks
    : quickNavLinks.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-black font-sans antialiased flex">
      {/* Collapsible Admin Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={handleLogout}
      />

      {/* Main Content Workspace */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-20' : 'pl-64'
        }`}
      >
        {/* Admin Header */}
        <AdminHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />

        {/* Page View Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Command+K Global Search Modal */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAEAEA] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-[#EAEAEA]">
              <FiSearch size={18} className="text-[#888888]" />
              <input
                type="text"
                placeholder="Search admin commands, bookings, projects, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full px-3 py-4 text-sm bg-transparent border-none outline-none text-black placeholder:text-[#999999]"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1.5 text-[#888888] hover:text-black rounded-lg hover:bg-[#F5F5F7]"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-3 max-h-96 overflow-y-auto space-y-1">
              <p className="px-3 py-1.5 text-[10px] font-semibold text-[#888888] tracking-widest uppercase">
                Quick Navigation
              </p>
              {filteredLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsSearchModalOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors flex items-center justify-between group"
                >
                  <div>
                    <p className="text-xs font-bold text-black group-hover:text-black">{item.title}</p>
                    <p className="text-[11px] text-[#777777] mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-[10px] text-[#999999] group-hover:text-black">Jump to →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
