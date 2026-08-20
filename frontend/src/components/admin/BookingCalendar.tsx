import React, { useMemo } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';

interface BookingCalendarProps {
  currentYear: number;
  currentMonth: number; // 1-indexed (1 = Jan, 12 = Dec)
  selectedDate: string | null; // YYYY-MM-DD
  bookingCounts: Record<string, number>; // { '2026-08-15': 3 }
  isLoading: boolean;
  onMonthYearChange: (year: number, month: number) => void;
  onSelectDate: (dateStr: string) => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  currentYear,
  currentMonth,
  selectedDate,
  bookingCounts,
  isLoading,
  onMonthYearChange,
  onSelectDate,
}) => {
  // Generate list of available years for dropdown (e.g. 2024 to 2030)
  const yearsList = useMemo(() => {
    const years: number[] = [];
    const base = new Date().getFullYear();
    for (let y = base - 2; y <= base + 5; y++) {
      years.push(y);
    }
    return years;
  }, []);

  // Handle Prev Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      onMonthYearChange(currentYear - 1, 12);
    } else {
      onMonthYearChange(currentYear, currentMonth - 1);
    }
  };

  // Handle Next Month navigation
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthYearChange(currentYear + 1, 1);
    } else {
      onMonthYearChange(currentYear, currentMonth + 1);
    }
  };

  // Calculate calendar grid days
  const { daysGrid, todayStr } = useMemo(() => {
    const today = new Date();
    const tYear = today.getFullYear();
    const tMonth = String(today.getMonth() + 1).padStart(2, '0');
    const tDay = String(today.getDate()).padStart(2, '0');
    const tStr = `${tYear}-${tMonth}-${tDay}`;

    // First day of current selected month (0-indexed month for JS Date)
    const firstDayObj = new Date(currentYear, currentMonth - 1, 1);
    const startingDayOfWeek = firstDayObj.getDay(); // 0 (Sun) to 6 (Sat)

    // Number of days in current month
    const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Days grid array
    const grid: ({ dayNumber: number; dateStr: string } | null)[] = [];

    // Empty lead cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      grid.push(null);
    }

    // Days of current month
    const monthPadded = String(currentMonth).padStart(2, '0');
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayPadded = String(day).padStart(2, '0');
      const dateStr = `${currentYear}-${monthPadded}-${dayPadded}`;
      grid.push({ dayNumber: day, dateStr });
    }

    return { daysGrid: grid, todayStr: tStr };
  }, [currentYear, currentMonth]);

  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-5 md:p-6 space-y-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] text-black flex items-center justify-center border border-[#EAEAEA]">
            <FiCalendar size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black tracking-tight">
              {MONTH_NAMES[currentMonth - 1]} {currentYear}
            </h2>
            <p className="text-xs text-[#777777]">Interactive Booking Schedule & Availability</p>
          </div>
        </div>

        {/* Navigation & Selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Month Selector Dropdown */}
          <select
            value={currentMonth}
            onChange={(e) => onMonthYearChange(currentYear, Number(e.target.value))}
            className="px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs font-bold text-black focus:outline-none focus:border-black cursor-pointer"
          >
            {MONTH_NAMES.map((mName, idx) => (
              <option key={mName} value={idx + 1}>
                {mName}
              </option>
            ))}
          </select>

          {/* Year Selector Dropdown */}
          <select
            value={currentYear}
            onChange={(e) => onMonthYearChange(Number(e.target.value), currentMonth)}
            className="px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs font-bold text-black focus:outline-none focus:border-black cursor-pointer"
          >
            {yearsList.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl p-1">
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              className="p-1.5 rounded-lg hover:bg-white text-black transition-colors"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextMonth}
              title="Next Month"
              className="p-1.5 rounded-lg hover:bg-white text-black transition-colors"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Grid Headers */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 text-center border-b border-[#EAEAEA] pb-3">
        {WEEKDAY_NAMES.map((wDay) => (
          <div key={wDay} className="text-[11px] font-bold text-[#777777] uppercase tracking-wider">
            <span className="hidden sm:inline">{wDay}</span>
            <span className="sm:hidden">{wDay.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      {/* Days Grid */}
      {isLoading ? (
        <div className="grid grid-cols-7 gap-1 md:gap-2 py-8 text-center">
          {Array.from({ length: 35 }).map((_, idx) => (
            <div key={idx} className="h-16 rounded-xl bg-[#F5F5F7] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {daysGrid.map((cell, index) => {
            if (!cell) {
              return <div key={`empty-${index}`} className="h-16 md:h-20 bg-transparent" />;
            }

            const { dayNumber, dateStr } = cell;
            const isSelected = selectedDate === dateStr;
            const isToday = todayStr === dateStr;
            const count = bookingCounts[dateStr] || 0;

            return (
              <button
                key={dateStr}
                onClick={() => onSelectDate(dateStr)}
                className={`h-16 md:h-20 p-2 rounded-xl text-left border transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-md ring-2 ring-black/20'
                    : isToday
                    ? 'bg-[#F8F9FB] text-black border-black/40 hover:border-black'
                    : 'bg-white text-black border-[#EAEAEA] hover:bg-[#F8F9FB] hover:border-[#CCCCCC]'
                }`}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs md:text-sm font-bold ${
                      isSelected ? 'text-white' : 'text-black'
                    }`}
                  >
                    {dayNumber}
                  </span>

                  {isToday && !isSelected && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-black text-white">
                      Today
                    </span>
                  )}
                </div>

                {/* Booking Indicator */}
                {count > 0 && (
                  <div className="w-full mt-auto">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {count} {count === 1 ? 'booking' : 'bookings'}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
