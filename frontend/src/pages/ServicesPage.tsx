import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiCamera, FiHeart, FiGift, FiDroplet, FiGrid, FiHome, FiMapPin, FiUsers, FiX, FiCalendar, FiClock, FiAward, FiPackage, FiZap, FiPlay, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import FadeIn from '@/components/animations/FadeIn';
import FloatingCard from '@/components/animations/FloatingCard';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

const allServices = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    desc: 'Timeless moments captured with cinematic elegance and unparalleled artistry.',
    detailedDesc: 'Our flagship wedding photography service combines documentary storytelling with high-fashion fine art aesthetics. We capture raw emotions, sacred rituals, tearful joy, and energetic celebrations with master lighting and state-of-the-art 4K cinema equipment.',
    icon: FiHeart,
    price: '₹49,999',
    coverImage: '/images/wedding_photography.jpg',
    duration: 'Full Day Event Coverage (Up to 14 Hours)',
    team: 'Lead Photographer + Associate Photographer + Cinematographer',
    highlights: [
      'Full Day Multi-Location Coverage',
      'Two Master Photographers + Drone Specialist',
      'High-Resolution Cinematic Color Grading',
      'Handcrafted Leather Flush Mount Album (40 Pages)',
      '500+ Edited Digital High-Res Photos',
      '4K Aerial Drone Coverage & Cinematic Teaser',
      'RAW Image Files Provided on USB Drive',
      'Online Private Cloud Gallery with 1-Year Hosting'
    ],
    deliverables: [
      '1x Premium Leather Photo Album',
      '500+ High-Resolution Color-Graded Photos',
      '1x 4K Cinematic Highlight Film (3-5 mins)',
      'Online Digital Gallery Access',
      '128GB High-Speed Wooden USB Drive'
    ],
    color: 'from-amber-900/30 to-rose-900/20',
    featured: true
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Shoots',
    desc: 'Romantic stories told through artistic vision at breathtaking locations.',
    detailedDesc: 'Celebrate your unique love story before the wedding day in breathtaking natural or heritage settings. We curate custom mood boards, suggest color-harmonized outfits, and direct natural poses that feel genuine and deeply romantic.',
    icon: FiCamera,
    price: '₹24,999',
    coverImage: '/images/pre_wedding_service.jpg',
    duration: '4 to 6 Hours Location Session',
    team: 'Senior Fashion Photographer + Lighting Assistant',
    highlights: [
      '4-Hour Guided Outdoor/Heritage Location Session',
      'Location Scouting & Custom Concept Styling',
      'Up to 3 Outfit Changes & Guidance',
      '100+ Retouched High-Resolution Photos',
      'Creative Lighting & Color Grading',
      '1-Minute Instagram Reel Video Teaser',
      'High-Speed Digital Cloud Delivery within 7 Days'
    ],
    deliverables: [
      '100+ Master Retouched Digital Photos',
      '1x 60-Second Instagram Reel Film',
      'Personalized Location Concept Guide',
      'High-Res Online Cloud Download Link'
    ],
    color: 'from-rose-900/30 to-pink-900/20',
    featured: true
  },
  {
    id: 'engagement',
    title: 'Engagement',
    desc: 'Celebrate your "yes" moment with stunning engagement photography.',
    detailedDesc: 'Capture the magical moment of the ring exchange and family blessing. We focus on emotional candid close-ups, diamond ring detail shots, and joyful family portraits during your ring ceremony.',
    icon: FiGift,
    price: '₹19,999',
    coverImage: '/images/engagement_service.jpg',
    duration: '3 to 4 Hours Ceremony Session',
    team: 'Lead Event Photographer + Assistant',
    highlights: [
      '3-Hour Ceremony & Reception Coverage',
      'Ring Exchange & Close-Up Detail Shots',
      'Family & Guest Group Portraits',
      '80+ Retouched Digital Photos',
      'Same-Day Teaser Photo Delivery for Social Media',
      'High-Resolution Print-Ready Files'
    ],
    deliverables: [
      '80+ Retouched Digital Photos',
      'Same-Day Social Media Teaser Pack (5 Photos)',
      'Digital Cloud Access'
    ],
    color: 'from-pink-900/30 to-fuchsia-900/20',
    featured: false
  },

  {
    id: 'portrait',
    title: 'Portrait Photography',
    desc: 'Professional portraits that reveal your authentic self with artistry.',
    detailedDesc: 'Elegantly sculpted portraiture for executives, artists, models, and personal branding. We utilize cinematic key lighting and subtle retouching to craft powerful, authentic headshots.',
    icon: FiUsers,
    price: '₹14,999',
    coverImage: '/images/hero_slider_1.jpg',
    duration: '2 to 3 Hours Studio or Outdoor',
    team: 'Fashion & Portrait Photographer',
    highlights: [
      '2-Hour Dedicated Portrait Session',
      'Studio Backdrop & Natural Outdoor Settings',
      'Up to 4 Outfit Changes & Pose Direction',
      '50+ High-Resolution Master Edited Photos',
      'Magazine-Quality Skin & Beauty Retouching'
    ],
    deliverables: [
      '50+ High-Res Retouched Digital Portraits',
      'LinkedIn & Press Release Headshots',
      'Full Digital Rights'
    ],
    color: 'from-stone-800/30 to-neutral-900/20',
    featured: true
  },
  {
    id: 'baby',
    title: 'Baby & Newborn',
    desc: 'Precious newborn portraits capturing fleeting moments with care.',
    detailedDesc: 'Tender, safe, and patient photo sessions for newborns and toddlers. We provide sanitized organic props, soft wraps, gentle studio warmth, and calm lighting.',
    icon: FiHeart,
    price: '₹9,999',
    coverImage: '/images/baby_shoot_service.jpg',
    duration: '2 to 3 Hours Calm Session',
    team: 'Specialized Baby Photographer + Safety Assistant',
    highlights: [
      '100% Temperature Controlled & Sanitized Environment',
      'Includes Organic Props, Baskets & Soft Wraps',
      'Parent & Sibling Portrait Shots Included',
      '30+ Master Retouched Photos',
      'Private Digital Cloud Gallery for Sharing'
    ],
    deliverables: [
      '30+ Retouched Digital Newborn Photos',
      'Handmade Wooden Photo Frame (8x10)',
      'Digital Cloud Access'
    ],
    color: 'from-pink-800/30 to-rose-900/20',
    featured: false
  },

  {
    id: 'destination',
    title: 'Destination Shoots',
    desc: 'Breathtaking shoots at iconic destinations around the world.',
    detailedDesc: 'Complete travel photography crew available worldwide for destination weddings, royal palaces, tropical beaches, and alpine mountain ranges.',
    icon: FiMapPin,
    price: '₹99,999',
    coverImage: '/images/drone_service.jpg',
    duration: 'Multi-Day Worldwide Travel',
    team: 'Full Traveling Crew of 4 Specialists',
    highlights: [
      'Worldwide Crew Travel & Itinerary Logistics',
      'Location Scouting & Sunrise/Sunset Shooting Schedules',
      'Multi-Day Event & Expedition Coverage',
      '4K Drone Aerial Filmmaking & Photography',
      'Custom Luxury Hardcover Photo Albums'
    ],
    deliverables: [
      '1000+ Master Edited High-Res Photos',
      '2x Luxury Hardcover Photo Albums',
      '4K Full Destination Documentary Film',
      'RAW Files + Wooden USB Gift Box'
    ],
    color: 'from-teal-900/30 to-cyan-900/20',
    featured: true
  }
];

const defaultVideoShowcase = [
  {
    id: 1,
    title: 'The Royal Wedding Film — Aria & Vihaan',
    location: 'Udaipur Palace',
    duration: '4:20',
    youtubeUrl: 'https://youtu.be/6ABes0mjhMw?si=RUeK6p7bIqQ0PHrP',
    thumbnail: 'https://img.youtube.com/vi/6ABes0mjhMw/hqdefault.jpg'
  },
  {
    id: 2,
    title: 'Sunset Magic in Goa — Pre-Wedding Film',
    location: 'Goa Coast',
    duration: '3:15',
    youtubeUrl: 'https://youtu.be/uutZgpAoYE0?si=FwKN3re6AhVrpVC9',
    thumbnail: 'https://img.youtube.com/vi/uutZgpAoYE0/hqdefault.jpg'
  },
  {
    id: 3,
    title: 'Jaipur Heritage Celebration',
    location: 'Jaipur Fort',
    duration: '5:40',
    youtubeUrl: 'https://youtu.be/9dFYoAN_amQ?si=CRVooh0gCVpzXU08',
    thumbnail: 'https://img.youtube.com/vi/9dFYoAN_amQ/hqdefault.jpg'
  },
];

const CinematographySection = () => {
  const [filmsList, setFilmsList] = useState(() => {
    const saved = localStorage.getItem('bobby_studio_cms_videos');
    return saved ? JSON.parse(saved) : defaultVideoShowcase;
  });

  useEffect(() => {
    const loadFilms = () => {
      const saved = localStorage.getItem('bobby_studio_cms_videos');
      if (saved) {
        try {
          setFilmsList(JSON.parse(saved));
        } catch (e) {}
      }
    };
    loadFilms();
    window.addEventListener('storage', loadFilms);
    return () => window.removeEventListener('storage', loadFilms);
  }, []);

  const getYoutubeThumb = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url ? url.match(regExp) : null;
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
    }
    return '/images/hero_slider_1.jpg';
  };

  return (
    <section id="cinematography" className="py-16 md:py-24 bg-white text-[#000000] overflow-hidden border-t border-[#EAEAEA]">
      <div className="container-premium">
        <SectionHeading
          label="Cinematography"
          title="4K Cinema"
          titleAccent="Films"
          description="Immerse yourself in our Hollywood-grade 4K wedding films and cinematic highlights."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filmsList.map((video: any, i: number) => (
            <FadeIn key={video.id || i} delay={i * 0.15}>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] hover:border-black/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5"
              >
                {/* Thumbnail Image Header */}
                <div className="aspect-video relative overflow-hidden bg-black">
                  <img
                    src={video.thumbnail || getYoutubeThumb(video.youtubeUrl)}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button — Perfectly Centered */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md border border-white flex items-center justify-center text-black shadow-xl group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <FiPlay size={24} className="ml-1" />
                  </div>

                  <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs text-white font-display border border-white/20">
                    {video.duration || '4:00'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 bg-[#FAFAFA]">
                  <p className="text-[#555555] text-xs tracking-wider uppercase mb-1 font-display font-medium">{video.location || 'Location'}</p>
                  <h3 className="text-lg font-luxury text-[#000000] font-bold mb-4 group-hover:text-black transition-colors">{video.title}</h3>
                  <div className="inline-flex items-center gap-2 text-xs font-display font-semibold text-[#000000] group-hover:translate-x-1 transition-transform">
                    <span>Watch Full Film on YouTube</span>
                    <FiArrowRight size={14} />
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  const [displayedServices] = useState(() => {
    const cmsSaved = localStorage.getItem('bobby_studio_cms_services');
    if (cmsSaved) {
      try {
        const cmsList = JSON.parse(cmsSaved);
        return allServices.map((srv) => {
          const matchedCms = cmsList.find(
            (c: any) => c.name.toLowerCase() === srv.title.toLowerCase() || c.id === srv.id
          );
          if (matchedCms) {
            return {
              ...srv,
              title: matchedCms.name || srv.title,
              price: matchedCms.priceTag || srv.price,
              desc: matchedCms.description || srv.desc,
              coverImage: matchedCms.bgImage || matchedCms.imageUrl || srv.coverImage,
            };
          }
          return srv;
        });
      } catch (e) {
        return allServices;
      }
    }
    return allServices;
  });

  const [selectedService, setSelectedService] = useState<typeof allServices[0] | null>(null);
  const location = useLocation();

  // Auto-open service modal if navigating from Footer or another page with location state
  useEffect(() => {
    const target = location.state?.selectedServiceId || location.state?.selectedService;
    if (target) {
      const match = displayedServices.find(
        (s) =>
          s.id.toLowerCase() === target.toLowerCase() ||
          s.title.toLowerCase() === target.toLowerCase()
      );
      if (match) {
        setSelectedService(match);
      }
    }
  }, [location.state, displayedServices]);

  // Prevent background Lenis scroll interference when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

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
            <h1 className="text-hero font-luxury text-black mb-4">
              Our <span className="text-black italic font-semibold">Services</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              From intimate portraits to grand celebrations, we offer a complete suite
              of luxury photography and cinematography services tailored to perfection. Click any card to explore full package details.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding !pt-0">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.06}>
                <FloatingCard intensity={4}>
                  <div
                    onClick={() => setSelectedService(service)}
                    className="group h-full glass rounded-2xl overflow-hidden hover:border-black/50 transition-all duration-500 hover:shadow-xl cursor-pointer flex flex-col justify-between"
                  >
                    {/* Top Image / Gradient Header */}
                    <div>
                      <div className={`relative h-44 overflow-hidden bg-black`}>
                        <img
                          src={service.coverImage}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                        
                        {service.featured && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                            Popular
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-luxury text-black mb-2 group-hover:text-black transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mb-4">{service.desc}</p>

                        {/* Highlights List */}
                        <div className="space-y-2 mb-5">
                          {service.highlights.slice(0, 4).map((h) => (
                            <div key={h} className="flex items-center gap-2.5 text-xs text-muted">
                              <FiCheck className="text-black flex-shrink-0" size={13} />
                              <span>{h}</span>
                            </div>
                          ))}
                          {service.highlights.length > 4 && (
                            <p className="text-xs text-black font-semibold hover:underline pt-1">
                              +{service.highlights.length - 4} more features (Click to view)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                        <div>
                          <p className="text-[10px] text-muted uppercase tracking-wider">Starting from</p>
                          <p className="text-black font-display font-bold text-lg">{service.price}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedService(service);
                          }}
                          className="px-4 py-2 rounded-full border border-black bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-800 transition-all duration-300 shadow-md"
                        >
                          <span>View Details</span>
                          <FiArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Interactive Modal Drawer */}
      <AnimatePresence>
        {selectedService && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              data-lenis-prevent="true"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-glass-border rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto"
            >
              {/* Modal Top Banner */}
              <div className="relative h-52 sm:h-60 bg-black overflow-hidden flex-shrink-0">
                <img
                  src={selectedService.coverImage}
                  alt={selectedService.title}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-lg z-20"
                  aria-label="Close modal"
                >
                  <FiX size={20} />
                </button>

                {/* Banner Content */}
                <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                      LUXURY SERVICE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-luxury text-black font-bold">
                      {selectedService.title}
                    </h2>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">Starting Price</p>
                    <p className="text-2xl sm:text-3xl font-display font-bold text-black">
                      {selectedService.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div
                data-lenis-prevent="true"
                className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 max-h-[55vh] min-h-[220px] overscroll-contain"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Overview Paragraph */}
                <div>
                  <h3 className="text-xs font-display tracking-[0.2em] text-black uppercase mb-2 font-bold">Overview & Vision</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {selectedService.detailedDesc}
                  </p>
                </div>

                {/* Duration & Crew Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/5 border border-glass-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                      <FiClock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-wider">Duration</p>
                      <p className="text-xs text-black font-semibold">{selectedService.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                      <FiAward size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-wider">Crew & Equipment</p>
                      <p className="text-xs text-black font-semibold">{selectedService.team}</p>
                    </div>
                  </div>
                </div>

                {/* Full Features & Highlights */}
                <div>
                  <h3 className="text-xs font-display tracking-[0.2em] text-black uppercase mb-3 font-bold">Included Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/5 border border-glass-border text-xs text-black">
                        <FiCheck className="text-black flex-shrink-0 mt-0.5" size={14} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Breakdown */}
                <div>
                  <h3 className="text-xs font-display tracking-[0.2em] text-black uppercase mb-3 font-bold flex items-center gap-2">
                    <FiPackage size={14} />
                    Physical & Digital Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.deliverables.map((del) => (
                      <li key={del} className="flex items-center gap-3 text-xs text-muted bg-black/5 p-3 rounded-xl border border-glass-border">
                        <span className="w-2 h-2 rounded-full bg-black" />
                        <span className="text-black font-medium">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Sticky Bottom Action Footer */}
              <div className="p-4 sm:p-6 bg-card border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted">Ready to capture your special moment?</p>
                  <p className="text-sm font-luxury text-black font-semibold">Reserve your date with Bobby Studio</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/919949216881?text=Hi%20Bobby%20Studio,%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(selectedService.title)}%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 text-black text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <FaWhatsapp className="text-emerald-500" size={16} />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    to="/book"
                    state={{ selectedService: selectedService.title }}
                    className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-black text-white font-display font-semibold text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Book Service</span>
                    <FiCalendar size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cinematography / 4K Cinema Films Section */}
      <CinematographySection />


    </motion.div>
  );
};

export default ServicesPage;
