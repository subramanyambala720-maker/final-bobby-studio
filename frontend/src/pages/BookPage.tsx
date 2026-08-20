import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FiCalendar, FiClock, FiCamera, FiCheck, FiSend, FiChevronRight, FiChevronDown, FiHeart, FiFilm, FiStar, FiMapPin, FiUser, FiPhone, FiMail, FiVideo } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

/* ============================================
   DATA
   ============================================ */

const bookingSteps = [
  { step: '01', title: 'Choose Your Service', desc: 'Browse our packages and select the photography service that fits your needs and vision.' },
  { step: '02', title: 'Pick Your Date', desc: 'Select your preferred date and time. Check availability for our team in real time.' },
  { step: '03', title: 'Share Your Vision', desc: 'Tell us about your dream shoot — locations, style, mood, and any special requirements.' },
  { step: '04', title: 'Confirm & Pay', desc: 'Review your booking details, pay a 30% advance, and it\'s officially locked in.' },
];

const serviceOptions = [
  { id: 'wedding', label: 'Wedding Photography', icon: FiHeart, price: 'From ₹49,999' },
  { id: 'pre-wedding', label: 'Pre-Wedding Shoot', icon: FiCamera, price: 'From ₹24,999' },
  { id: 'portrait', label: 'Portrait Session', icon: FiUser, price: 'From ₹9,999' },
  { id: 'fashion', label: 'Fashion Photography', icon: FiStar, price: 'From ₹19,999' },
  { id: 'cinematography', label: 'Cinematography', icon: FiFilm, price: 'From ₹79,999' },
  { id: 'drone', label: 'Drone Shoot', icon: FiVideo, price: 'From ₹30,000' },
  { id: 'destination', label: 'Destination Shoot', icon: FiMapPin, price: 'From ₹99,999' },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

/* ============================================
   LUXURY CUSTOM SELECT COMPONENT
   ============================================ */

const LuxuryServiceSelect = ({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = serviceOptions.find((s) => s.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-4 pr-4 py-3.5 bg-[#FAF9F6] border rounded-2xl transition-all duration-300 text-left group ${
          isOpen ? 'border-black ring-2 ring-black/10 bg-white shadow-lg' : 'border-[#EAEAEA] hover:border-black/50 hover:bg-white'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            selectedOption ? 'bg-black text-white' : 'bg-black/5 text-[#666666] group-hover:bg-black group-hover:text-white'
          }`}>
            {selectedOption ? <selectedOption.icon size={16} /> : <FiCamera size={16} />}
          </div>
          <div className="truncate">
            <span className={`block text-sm font-luxury ${selectedOption ? 'text-black font-semibold' : 'text-[#888888]'}`}>
              {selectedOption ? selectedOption.label : 'Select your photography service...'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-2 flex-shrink-0">
          {selectedOption && (
            <span className="text-xs font-display font-bold text-black bg-[#F5F2EB] px-3 py-1 rounded-full border border-[#E0D9C8]">
              {selectedOption.price}
            </span>
          )}
          <FiChevronDown
            size={18}
            className={`text-[#666666] transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 right-0 z-50 mt-1.5 bg-white border border-[#EAEAEA] rounded-2xl shadow-2xl overflow-hidden p-2 space-y-1.5"
          >
            {serviceOptions.map((service) => {
              const isSelected = service.id === selectedId;
              const IconComp = service.icon;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    onSelect(service.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-black text-white shadow-md'
                      : 'hover:bg-[#FAF8F5] text-black'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-black'
                    }`}>
                      <IconComp size={15} />
                    </div>
                    <span className={`text-sm font-luxury font-medium ${isSelected ? 'text-white' : 'text-black'}`}>
                      {service.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-display font-semibold px-2.5 py-1 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F5F2EB] text-[#444444]'
                    }`}>
                      {service.price}
                    </span>
                    {isSelected && <FiCheck size={16} className="text-white ml-1" />}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================
   BOOKING PAGE
   ============================================ */

const BookPage = () => {
  const location = useLocation();
  const locationState = location.state as any;
  const initialServiceId = locationState?.selectedServiceId || locationState?.selectedService || '';

  const [selectedService, setSelectedService] = useState<string>(() => {
    if (initialServiceId) {
      const match = serviceOptions.find(
        (s) => s.id === initialServiceId || s.label.toLowerCase().includes(initialServiceId.toString().toLowerCase())
      );
      return match ? match.id : 'wedding';
    }
    return 'wedding';
  });

  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: new Date().toISOString().split('T')[0], location: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setIsSubmitting(true);

    const activeOption = serviceOptions.find((s) => s.id === selectedService);
    const newBookingId = `BS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBookingItem = {
      id: newBookingId,
      customerName: formData.name || 'Valued Client',
      email: formData.email || 'client@example.com',
      phone: formData.phone || '+91 9949216881',
      service: activeOption?.label || 'Wedding Photography',
      eventDate: formData.date || new Date().toISOString().split('T')[0],
      timeSlot: selectedTime || '10:00 AM',
      packageChoice: activeOption?.label || 'Custom Session',
      estimatedPrice: activeOption?.price ? Number(activeOption.price.replace(/[^0-9]/g, '')) : 25000,
      status: 'pending' as const,
      paymentStatus: 'unpaid' as const,
      assignedPhotographer: 'Unassigned',
      notes: formData.message || 'Booked via website session selector',
    };

    // Save to local storage for Admin Portal sync
    try {
      const existing = localStorage.getItem('bobby_studio_admin_bookings');
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem('bobby_studio_admin_bookings', JSON.stringify([newBookingItem, ...list]));
    } catch (err) {
      console.error(err);
    }

    // POST to backend API
    try {
      await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: activeOption?.label,
          eventDate: formData.date,
          timeSlot: selectedTime,
          packageChoice: activeOption?.label,
          estimatedPrice: newBookingItem.estimatedPrice,
          specialNotes: formData.message,
        }),
      });
    } catch (error) {
      console.warn('Backend offline, saved booking to Admin Portal local sync');
    }

    setIsSubmitting(false);
    setIsBooked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="container-premium relative text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs tracking-[0.25em] text-primary uppercase mb-6">
              <FiCalendar size={14} />
              Book a Session
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-hero font-luxury text-text mb-4">
              Let's Create <span className="text-gradient-gold italic">Magic</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              Book your luxury photography session with Bobby Studio. We'll make every moment
              extraordinary and every memory timeless.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How it Works */}
      <section className="pb-16">
        <div className="container-premium">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bookingSteps.map((step, i) => (
                <div key={step.step} className="relative text-center">
                  {i < bookingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4 bg-background">
                    <span className="text-primary text-sm font-display font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-display text-text font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding !pt-0">
        <div className="container-premium max-w-3xl">
          {isBooked ? (
            <FadeIn>
              <div className="text-center py-20 glass rounded-3xl">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <FiCheck className="text-primary" size={44} />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-display font-luxury text-text mb-4"
                >
                  Booking <span className="text-gradient-gold italic">Confirmed!</span>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-muted max-w-md mx-auto mb-4">
                    Thank you, {formData.name || 'dear client'}! Your booking request has been received.
                    Our team will contact you within 4 hours to confirm the details.
                  </p>
                  <p className="text-muted text-sm mb-8">A confirmation email has been sent to <span className="text-primary">{formData.email || 'your inbox'}</span>.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://wa.me/919949216881" target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="lg">Chat on WhatsApp</Button>
                    </a>
                    <button
                      onClick={() => { setIsBooked(false); setSelectedService(''); setSelectedTime(''); setFormData({ name: '', email: '', phone: '', date: '', location: '', message: '' }); }}
                      className="px-6 py-3 glass rounded-full text-muted hover:text-text transition-colors text-sm"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl border border-glass-border">
                <h2 className="text-2xl font-luxury text-text mb-6">Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Choose Service Dropdown */}
                  <div>
                    <label className="block text-[11px] text-[#444444] uppercase tracking-[0.15em] mb-2 font-display font-semibold">
                      Choose Service *
                    </label>
                    <LuxuryServiceSelect
                      selectedId={selectedService}
                      onSelect={(id) => setSelectedService(id)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-wider mb-2 font-medium" htmlFor="book-name">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60" size={15} />
                        <input
                          id="book-name" name="name" type="text" required value={formData.name} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-wider mb-2 font-medium" htmlFor="book-email">
                        Email *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60" size={15} />
                        <input
                          id="book-email" name="email" type="email" required value={formData.email} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-wider mb-2 font-medium" htmlFor="book-phone">
                        Phone *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60" size={15} />
                        <input
                          id="book-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-wider mb-2 font-medium" htmlFor="book-date">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60" size={15} />
                        <input
                          id="book-date" name="date" type="date" required value={formData.date} onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-wider mb-3 font-medium">
                      Preferred Time
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
                            selectedTime === slot
                              ? 'bg-black text-white shadow-md'
                              : 'glass text-muted hover:text-text'
                          }`}
                        >
                          <FiClock size={10} className="inline mr-1" />{slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2 font-medium" htmlFor="book-location">
                      Shoot Location / Venue
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60" size={15} />
                      <input
                        id="book-location" name="location" type="text" value={formData.location} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Wedding venue, city, or TBD"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2 font-medium" htmlFor="book-message">
                      Tell Us About Your Vision
                    </label>
                    <textarea
                      id="book-message" name="message" rows={4} value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Share your dream session ideas, mood, references, or any special requirements..."
                    />
                  </div>

                  {/* Summary */}
                  {selectedService && (
                    <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-2 font-medium">Booking Summary</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text font-semibold">
                          {serviceOptions.find((s) => s.id === selectedService)?.label}
                        </span>
                        <span className="text-sm text-primary font-display font-semibold">
                          {serviceOptions.find((s) => s.id === selectedService)?.price}
                        </span>
                      </div>
                      {formData.date && (
                        <p className="text-xs text-muted mt-1">
                          {new Date(formData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          {selectedTime && ` at ${selectedTime}`}
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting || !selectedService}
                    icon={<FiSend />}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Request Booking'}
                  </Button>
                  <p className="text-center text-xs text-muted">
                    By booking, you agree to our terms. 30% advance required to confirm.
                  </p>
                </form>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16">
        <div className="container-premium">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: '🔒', title: 'Secure Booking', desc: '30% advance secures your date. Balance paid on delivery.' },
                { icon: '📅', title: 'Flexible Rescheduling', desc: 'Life happens. Reschedule up to 15 days before at no extra cost.' },
                { icon: '⭐', title: '100% Satisfaction', desc: 'We don\'t stop until you\'re completely thrilled with the results.' },
              ].map((g) => (
                <div key={g.title} className="glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
                  <div className="text-3xl mb-3">{g.icon}</div>
                  <h3 className="text-base font-luxury text-text mb-2">{g.title}</h3>
                  <p className="text-muted text-sm">{g.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
};

export default BookPage;
