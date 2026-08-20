import React from 'react';
import { FiCalendar, FiClock, FiCheckCircle, FiAlertCircle, FiXCircle, FiArrowRight } from 'react-icons/fi';

export interface Booking {
  _id?: string;
  id?: string;
  bookingId: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  timeSlot: string;
  packageChoice?: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  assignedPhotographer?: string;
  specialNotes?: string;
  createdAt?: string;
}

interface DateBookingsPanelProps {
  selectedDateStr: string | null; // YYYY-MM-DD
  bookings: Booking[];
  isLoading: boolean;
  onSelectBooking: (booking: Booking) => void;
}

export const DateBookingsPanel: React.FC<DateBookingsPanelProps> = ({
  selectedDateStr,
  bookings,
  isLoading,
  onSelectBooking,
}) => {
  if (!selectedDateStr) {
    return (
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#F5F5F7] text-[#888888] flex items-center justify-center mx-auto">
          <FiCalendar size={22} />
        </div>
        <h3 className="text-sm font-bold text-black">Select a Date from the Calendar</h3>
        <p className="text-xs text-[#777777] max-w-sm mx-auto">
          Click any date on the calendar above to view reservations and shoot schedules for that specific date.
        </p>
      </div>
    );
  }

  // Format date nicely (e.g. August 15, 2026)
  const [year, month, day] = selectedDateStr.split('-').map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-5 md:p-6 space-y-5">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAEAEA] pb-4">
        <div>
          <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            Selected Date Schedule
          </span>
          <h3 className="text-lg font-bold text-black tracking-tight">{formattedDate}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">
            Total Bookings: {bookings.length}
          </span>
        </div>
      </div>

      {/* Bookings List / States */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-20 bg-[#F5F5F7] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        /* Empty State */
        <div className="py-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F5F5F7] text-[#888888] flex items-center justify-center mx-auto border border-[#EAEAEA]">
            <FiCalendar size={22} />
          </div>
          <h4 className="text-sm font-bold text-black">No Bookings for This Date</h4>
          <p className="text-xs text-[#777777]">
            There are currently no photography shoot reservations scheduled for {formattedDate}.
          </p>
        </div>
      ) : (
        /* Bookings List */
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.bookingId || b._id || b.id}
              onClick={() => onSelectBooking(b)}
              className="p-4 bg-white border border-[#EAEAEA] rounded-xl hover:border-black hover:shadow-sm transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-black">{b.bookingId}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      b.status === 'confirmed'
                        ? 'bg-black text-white'
                        : b.status === 'completed'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : b.status === 'in-progress'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : b.status === 'cancelled'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-[#F5F5F7] text-[#666666] border border-[#EAEAEA]'
                    }`}
                  >
                    {b.status === 'confirmed' && <FiCheckCircle size={10} />}
                    {b.status === 'pending' && <FiClock size={10} />}
                    {b.status === 'in-progress' && <FiAlertCircle size={10} />}
                    {b.status === 'cancelled' && <FiXCircle size={10} />}
                    {b.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-black">{b.customerName}</h4>
                <p className="text-xs text-[#555555]">
                  <span className="font-medium text-black">{b.service}</span>
                  {b.timeSlot && ` • ${b.timeSlot}`}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#EAEAEA]">
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-black block">
                    ₹{Number(b.estimatedPrice || 0).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#777777] uppercase font-semibold">
                    {b.paymentStatus}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] group-hover:bg-black group-hover:text-white transition-colors flex items-center justify-center">
                  <FiArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateBookingsPanel;
