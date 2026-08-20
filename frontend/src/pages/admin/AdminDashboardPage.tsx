import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiArrowUpRight,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiSliders,
  FiMessageSquare,
} from 'react-icons/fi';

const AdminDashboardPage = () => {
  const [allBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('bobby_studio_admin_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const totalRevAmount = allBookings
    .filter((b: any) => b.status === 'completed' || b.paymentStatus === 'paid')
    .reduce((sum: number, b: any) => sum + Number(b.estimatedPrice || 0), 0);

  const confirmedCount = allBookings.filter((b: any) => b.status === 'confirmed').length;
  const pendingCount = allBookings.filter((b: any) => b.status === 'pending').length;

  const stats = {
    totalRevenue: `₹${totalRevAmount.toLocaleString('en-IN')}`,
    revenueGrowth: totalRevAmount > 0 ? '+100%' : '0%',
    todayBookings: allBookings.length,
    confirmedCount,
    pendingCount,
    activeProjects: confirmedCount,
    pendingDeliveries: pendingCount,
  };

  const recentBookings = allBookings.map((b: any) => ({
    id: b.id,
    customer: b.customerName,
    service: b.service,
    date: b.eventDate,
    status: b.status,
    amount: `₹${Number(b.estimatedPrice || 25000).toLocaleString('en-IN')}`,
  }));



  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Executive Dashboard</h1>
          <p className="text-xs text-[#777777] mt-1">
            Real-time analytics, revenue performance & active booking status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/bookings"
            className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2"
          >
            <FiPlus size={14} /> New Manual Booking
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiDollarSign size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-black">{stats.totalRevenue}</h3>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <FiTrendingUp size={12} /> {stats.revenueGrowth} vs last month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Today's Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiCalendar size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-black">{stats.todayBookings}</h3>
            <p className="text-xs text-[#777777] mt-1">{stats.confirmedCount} confirmed, {stats.pendingCount} pending review</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Active Projects</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FiClock size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-black">{stats.activeProjects}</h3>
            <p className="text-xs text-[#777777] mt-1">Shoots currently in post-editing</p>
          </div>
        </div>
      </div>



      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-black">Recent Booking Requests</h3>
            <p className="text-xs text-[#777777] mt-0.5">Latest client session reservations</p>
          </div>
          <Link to="/admin/bookings" className="text-xs font-bold text-black hover:underline flex items-center gap-1">
            <span>View All Bookings</span>
            <FiArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EAEAEA] text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                <th className="pb-3 px-2">Booking ID</th>
                <th className="pb-3 px-2">Client Name</th>
                <th className="pb-3 px-2">Service</th>
                <th className="pb-3 px-2">Event Date</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Estimated Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] text-xs">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#F8F9FB] transition-colors">
                  <td className="py-3.5 px-2 font-mono font-bold text-black">{b.id}</td>
                  <td className="py-3.5 px-2 font-semibold text-black">{b.customer}</td>
                  <td className="py-3.5 px-2 text-[#555555]">{b.service}</td>
                  <td className="py-3.5 px-2 text-[#555555]">{b.date}</td>
                  <td className="py-3.5 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {b.status === 'confirmed' && <FiCheckCircle size={10} />}
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right font-bold text-black">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentBookings.length === 0 && (
            <div className="py-10 text-center text-[#888888] text-xs">
              No recent bookings recorded yet. Customer reservations placed on the website will appear here live!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
