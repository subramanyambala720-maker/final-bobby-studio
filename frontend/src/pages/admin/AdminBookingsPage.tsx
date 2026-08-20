import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiCheckCircle, FiClock, FiXCircle, FiEdit2, FiTrash2, FiUserCheck, FiPhone, FiMail } from 'react-icons/fi';

interface BookingItem {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  timeSlot: string;
  packageChoice: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  assignedPhotographer: string;
  notes: string;
}

const initialBookings: BookingItem[] = [];

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_admin_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('bobby_studio_admin_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: BookingItem['status']) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: newStatus,
              paymentStatus: newStatus === 'completed' ? 'paid' : b.paymentStatus,
            }
          : b
      )
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({
        ...selectedBooking,
        status: newStatus,
        paymentStatus: newStatus === 'completed' ? 'paid' : selectedBooking.paymentStatus,
      });
    }
  };

  const handleAssignPhotographer = (id: string, photographer: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, assignedPhotographer: photographer } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, assignedPhotographer: photographer });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Booking Requests & Calendar</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage customer session reservations, assign lead photographers, and track payment statuses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {bookings.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Clear all bookings list?')) {
                  setBookings([]);
                  localStorage.removeItem('bobby_studio_admin_bookings');
                }
              }}
              className="px-3.5 py-2.5 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1.5"
            >
              <FiTrash2 size={14} /> Clear All
            </button>
          )}
          <button
            onClick={() => {
              const newId = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
              const dummy: BookingItem = {
                id: newId,
                customerName: 'New Client Request',
                email: 'client@example.com',
                phone: '+91 9999988888',
                service: 'Wedding Photography',
                eventDate: '2026-10-15',
                timeSlot: '11:00 AM',
                packageChoice: 'Gold Package',
                estimatedPrice: 79999,
                status: 'pending',
                paymentStatus: 'unpaid',
                assignedPhotographer: 'Bobby (Lead)',
                notes: 'Manual booking entry',
              };
              setBookings([dummy, ...bookings]);
            }}
            className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2"
          >
            <FiPlus size={14} /> Add Booking
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#666666] hover:bg-[#EAEAEA] hover:text-black'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
          <input
            type="text"
            placeholder="Search by client, ID, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-lg text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Table & Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Event Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-xs">
                {filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className={`cursor-pointer transition-colors ${
                      selectedBooking?.id === b.id ? 'bg-amber-50/50 font-medium' : 'hover:bg-[#F8F9FB]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-black">{b.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-black">
                      {b.customerName}
                      <span className="block text-[10px] font-normal text-[#777777]">{b.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#555555]">{b.service}</td>
                    <td className="py-3.5 px-4 text-[#555555]">
                      {b.eventDate}
                      <span className="block text-[10px] text-[#888888]">{b.timeSlot}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : b.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : b.status === 'completed'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {b.status === 'confirmed' && <FiCheckCircle size={10} />}
                        {b.status === 'pending' && <FiClock size={10} />}
                        {b.status === 'cancelled' && <FiXCircle size={10} />}
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-black">
                      ₹{b.estimatedPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel (1 col) */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-6 space-y-5">
          {selectedBooking ? (
            <>
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider">
                    {selectedBooking.id}
                  </span>
                  <h3 className="text-base font-bold text-black mt-0.5">{selectedBooking.customerName}</h3>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-black text-white uppercase tracking-wider">
                  {selectedBooking.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-xs">
                <p className="flex items-center gap-2 text-[#555555]">
                  <FiMail size={14} className="text-[#888888]" />
                  <span>{selectedBooking.email}</span>
                </p>
                <p className="flex items-center gap-2 text-[#555555]">
                  <FiPhone size={14} className="text-[#888888]" />
                  <span>{selectedBooking.phone}</span>
                </p>
              </div>

              {/* Booking Parameters */}
              <div className="p-3.5 bg-[#F8F9FB] border border-[#EAEAEA] rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Service:</span>
                  <span className="font-bold text-black">{selectedBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Package:</span>
                  <span className="font-semibold text-black">{selectedBooking.packageChoice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Date & Time:</span>
                  <span className="font-semibold text-black">{selectedBooking.eventDate} ({selectedBooking.timeSlot})</span>
                </div>
                <div className="flex justify-between border-t border-[#EAEAEA] pt-2">
                  <span className="text-[#777777]">Price Estimate:</span>
                  <span className="font-bold text-black">₹{selectedBooking.estimatedPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Photographer Assignment */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-black flex items-center gap-1.5">
                  <FiUserCheck size={14} /> Assigned Lead Photographer
                </label>
                <select
                  value={selectedBooking.assignedPhotographer}
                  onChange={(e) => handleAssignPhotographer(selectedBooking.id, e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-lg text-xs font-medium text-black focus:outline-none focus:border-black"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Bobby (Lead)">Bobby (Lead Photographer)</option>
                  <option value="Rahul Sharma">Rahul Sharma (Senior Cinematographer)</option>
                  <option value="Karan Malhotra">Karan Malhotra (Drone Specialist)</option>
                  <option value="Sneha Reddy">Sneha Reddy (Fashion & Portrait)</option>
                </select>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-black">Update Booking Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'confirmed')}
                    className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Confirm Shoot
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                    className="py-2 bg-black hover:bg-[#222222] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div className="text-xs space-y-1">
                <span className="font-semibold text-black">Client Notes & Requirements:</span>
                <p className="p-3 bg-[#F5F5F7] rounded-lg text-[#555555] italic">
                  "{selectedBooking.notes || 'No special requirements provided.'}"
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[#888888]">
              <FiEdit2 size={24} className="mb-2 text-[#CCCCCC]" />
              <p className="text-xs font-medium">Select a booking row from the table to view details & update status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;
