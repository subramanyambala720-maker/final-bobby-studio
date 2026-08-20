import { useState, useEffect, useCallback } from 'react';
import BookingCalendar from '../../components/admin/BookingCalendar';
import DateBookingsPanel from '../../components/admin/DateBookingsPanel';
import type { Booking } from '../../components/admin/DateBookingsPanel';
import BookingDetailsDrawer from '../../components/admin/BookingDetailsDrawer';

// Fallback seed data if backend database is offline or unseeded
const FALLBACK_SEED_BOOKINGS: Booking[] = [
  {
    bookingId: 'BS-849201',
    customerName: 'Aarav & Roshni Malhotra',
    email: 'aarav.m@gmail.com',
    phone: '+91 98765 12345',
    service: 'Wedding Photography',
    eventDate: '2026-08-15',
    timeSlot: '10:00 AM - 08:00 PM',
    packageChoice: 'Royal Wedding Package',
    estimatedPrice: 150000,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedPhotographer: 'Bobby (Lead Photographer)',
    specialNotes: 'Grand Palace wedding venue. Requires drone aerial coverage & twin 4K cinematic cameras.',
  },
  {
    bookingId: 'BS-849202',
    customerName: 'Kavya Singhania',
    email: 'kavya.s@yahoo.com',
    phone: '+91 98112 33445',
    service: 'Pre-Wedding Photography',
    eventDate: '2026-08-15',
    timeSlot: '04:00 PM - 07:00 PM',
    packageChoice: 'Sunset Romance Package',
    estimatedPrice: 45000,
    status: 'pending',
    paymentStatus: 'unpaid',
    assignedPhotographer: 'Rahul Sharma (Senior Cinematographer)',
    specialNotes: 'Outdoor hill station shoot with 3 outfit changes.',
  },
  {
    bookingId: 'BS-849203',
    customerName: 'Meera & Rohan Verma',
    email: 'rohan.v@outlook.com',
    phone: '+91 97654 88990',
    service: 'Cinematography',
    eventDate: '2026-08-15',
    timeSlot: '07:00 PM - 11:00 PM',
    packageChoice: 'Cinematic Reception Film',
    estimatedPrice: 85000,
    status: 'confirmed',
    paymentStatus: 'partial',
    assignedPhotographer: 'Karan Malhotra (Drone Specialist)',
    specialNotes: 'Focus heavily on family speeches and first dance.',
  },
  {
    bookingId: 'BS-739104',
    customerName: 'Vikram & Diya Roy',
    email: 'diya.roy@gmail.com',
    phone: '+91 99887 76655',
    service: 'Wedding Photography',
    eventDate: '2026-08-20',
    timeSlot: '09:00 AM - 06:00 PM',
    packageChoice: 'Heritage Palace Special',
    estimatedPrice: 120000,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedPhotographer: 'Bobby (Lead Photographer)',
    specialNotes: 'Traditional South Indian wedding ritual coverage.',
  },
  {
    bookingId: 'BS-612905',
    customerName: 'Siddharth Oberoi',
    email: 'sid.oberoi@techventures.io',
    phone: '+91 99100 22334',
    service: 'Fashion & Portrait',
    eventDate: '2026-08-25',
    timeSlot: '11:00 AM - 03:00 PM',
    packageChoice: 'Executive Branding Session',
    estimatedPrice: 35000,
    status: 'in-progress',
    paymentStatus: 'paid',
    assignedPhotographer: 'Sneha Reddy (Fashion & Portrait)',
    specialNotes: 'Studio portrait shoot for Forbes interview feature.',
  },
  {
    bookingId: 'BS-554406',
    customerName: 'Priya & Devansh Gupta',
    email: 'devansh.g@gmail.com',
    phone: '+91 98777 44332',
    service: 'Pre-Wedding Photography',
    eventDate: '2026-09-05',
    timeSlot: '06:00 AM - 11:00 AM',
    packageChoice: 'Sunrise Heritage Package',
    estimatedPrice: 50000,
    status: 'confirmed',
    paymentStatus: 'unpaid',
    assignedPhotographer: 'Rahul Sharma',
    specialNotes: 'Early morning shoot at Taj Mahal view locations.',
  },
  {
    bookingId: 'BS-991107',
    customerName: 'Ananya & Kabir Mehta',
    email: 'ananya.m@gmail.com',
    phone: '+91 98200 55667',
    service: 'Wedding Photography',
    eventDate: '2026-09-18',
    timeSlot: '10:00 AM - 11:00 PM',
    packageChoice: 'Full Destination Wedding',
    estimatedPrice: 250000,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedPhotographer: 'Bobby (Lead Photographer)',
    specialNotes: '3-day destination celebration in Goa.',
  },
  {
    bookingId: 'BS-332208',
    customerName: 'Ritu Kapoor',
    email: 'ritu.k@gmail.com',
    phone: '+91 98999 11223',
    service: 'Baby & Newborn Photography',
    eventDate: '2026-10-02',
    timeSlot: '02:00 PM - 05:00 PM',
    packageChoice: 'First Year Memories',
    estimatedPrice: 22000,
    status: 'pending',
    paymentStatus: 'unpaid',
    assignedPhotographer: 'Sneha Reddy',
    specialNotes: 'Gentle lighting required. Studio setup at home.',
  },
];

const AdminAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  // Calendar State
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // August (1-indexed)
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-08-15');

  // Monthly Counts State { '2026-08-15': 3 }
  const [monthlyCounts, setMonthlyCounts] = useState<Record<string, number>>({});
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);

  // Selected Date Bookings State
  const [dateBookings, setDateBookings] = useState<Booking[]>([]);
  const [isDateBookingsLoading, setIsDateBookingsLoading] = useState(false);

  // All Bookings Cache (combining backend + localStorage for reliability)
  const [allBookingsCache, setAllBookingsCache] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bobby_studio_admin_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return FALLBACK_SEED_BOOKINGS;
  });

  // Drawer State
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Save allBookingsCache to localStorage
  useEffect(() => {
    localStorage.setItem('bobby_studio_admin_bookings', JSON.stringify(allBookingsCache));
  }, [allBookingsCache]);

  // Fetch Monthly Counts from Backend API (with fallback sync)
  const fetchMonthlyCounts = useCallback(async (year: number, month: number) => {
    setIsCalendarLoading(true);
    const monthPadded = String(month).padStart(2, '0');
    const datePrefix = `${year}-${monthPadded}`;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/calendar?year=${year}&month=${month}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setMonthlyCounts(json.data);
          setIsCalendarLoading(false);
          return;
        }
      }
    } catch (err) {
      // Backend request silent fallback
    }

    // Fallback sync from cache
    const counts: Record<string, number> = {};
    allBookingsCache.forEach((b) => {
      if (b.eventDate && b.eventDate.startsWith(datePrefix)) {
        counts[b.eventDate] = (counts[b.eventDate] || 0) + 1;
      }
    });
    setMonthlyCounts(counts);
    setIsCalendarLoading(false);
  }, [allBookingsCache]);

  // Fetch Bookings for Selected Date
  const fetchDateBookings = useCallback(async (dateStr: string) => {
    setIsDateBookingsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings?date=${dateStr}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setDateBookings(json.data);
          setIsDateBookingsLoading(false);
          return;
        }
      }
    } catch (err) {
      // Backend request silent fallback
    }

    // Fallback filter from cache
    const filtered = allBookingsCache.filter((b) => b.eventDate === dateStr);
    setDateBookings(filtered);
    setIsDateBookingsLoading(false);
  }, [allBookingsCache]);

  // Trigger monthly counts fetch when year/month change
  useEffect(() => {
    fetchMonthlyCounts(currentYear, currentMonth);
  }, [currentYear, currentMonth, fetchMonthlyCounts]);

  // Trigger date bookings fetch when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchDateBookings(selectedDate);
    } else {
      setDateBookings([]);
    }
  }, [selectedDate, fetchDateBookings]);

  // Handle Month/Year Change from Calendar
  const handleMonthYearChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
    // Reset selected date to 1st of newly selected month
    const monthPadded = String(month).padStart(2, '0');
    setSelectedDate(`${year}-${monthPadded}-01`);
  };

  // Handle Booking Item Update from Drawer
  const handleUpdateBooking = (updated: Booking) => {
    const bId = updated._id || updated.id || updated.bookingId;

    // Update in allBookingsCache
    setAllBookingsCache((prev) =>
      prev.map((b) => {
        const currentId = b._id || b.id || b.bookingId;
        return currentId === bId ? { ...b, ...updated } : b;
      })
    );

    // Update in dateBookings
    setDateBookings((prev) =>
      prev.map((b) => {
        const currentId = b._id || b.id || b.bookingId;
        return currentId === bId ? { ...b, ...updated } : b;
      })
    );

    // Update active booking
    setActiveBooking(updated);

    // Refresh monthly counts
    fetchMonthlyCounts(currentYear, currentMonth);
  };

  const serviceBreakdown = [
    { name: 'Wedding Photography', share: '42%', revenue: '₹10,29,000', color: 'bg-black' },
    { name: 'Pre-Wedding Shoots', share: '26%', revenue: '₹6,37,000', color: 'bg-emerald-600' },
    { name: 'Cinematography', share: '18%', revenue: '₹4,41,000', color: 'bg-blue-600' },
    { name: 'Drone Aerial Shoot', share: '9%', revenue: '₹2,20,500', color: 'bg-amber-500' },
    { name: 'Portrait & Fashion', share: '5%', revenue: '₹1,22,500', color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Revenue & Traffic Analytics</h1>
          <p className="text-xs text-[#777777] mt-1">
            Financial breakdown, booking conversion velocity, and interactive shoot reservation schedule.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#EAEAEA] p-1 rounded-xl">
          {['weekly', 'monthly', 'quarterly', 'yearly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                timeRange === range ? 'bg-black text-white' : 'text-[#666666] hover:text-black'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>



      {/* Service Revenue Distribution */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-black">Service Category Revenue Share</h3>

        <div className="space-y-3">
          {serviceBreakdown.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-black">{item.name}</span>
                <span className="font-mono text-[#555555]">{item.revenue} ({item.share})</span>
              </div>
              <div className="w-full h-2.5 bg-[#F5F5F7] rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.share }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE BOOKING CALENDAR SECTION */}
      <div className="space-y-6 pt-4 border-t border-[#EAEAEA]">
        <div>
          <h2 className="text-xl font-bold text-black tracking-tight">Interactive Booking Calendar</h2>
          <p className="text-xs text-[#777777] mt-1">
            Filter reservations by date, manage shoot schedules, and update client booking statuses in real time.
          </p>
        </div>

        {/* Calendar Grid */}
        <BookingCalendar
          currentYear={currentYear}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          bookingCounts={monthlyCounts}
          isLoading={isCalendarLoading}
          onMonthYearChange={handleMonthYearChange}
          onSelectDate={(dStr) => setSelectedDate(dStr)}
        />

        {/* Selected Date Bookings Panel */}
        <DateBookingsPanel
          selectedDateStr={selectedDate}
          bookings={dateBookings}
          isLoading={isDateBookingsLoading}
          onSelectBooking={(b) => {
            setActiveBooking(b);
            setIsDrawerOpen(true);
          }}
        />
      </div>

      {/* Booking Details Drawer */}
      <BookingDetailsDrawer
        booking={activeBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateBooking={handleUpdateBooking}
      />
    </div>
  );
};

export default AdminAnalyticsPage;
