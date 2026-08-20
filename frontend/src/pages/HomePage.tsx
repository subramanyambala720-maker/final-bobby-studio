import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight, FiArrowUpRight, FiPlay, FiCamera, FiHeart, FiStar,
  FiAward, FiUsers, FiCalendar, FiFilm, FiImage, FiMapPin, FiX,
  FiCheck, FiMessageSquare, FiTrendingUp, FiCheckCircle,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube, FaPinterestP } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-fade';
// @ts-ignore
import 'swiper/css/pagination';

import FadeIn from '@/components/animations/FadeIn';
import FloatingCard from '@/components/animations/FloatingCard';
import MagneticElement from '@/components/animations/MagneticElement';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Masonry from '@/components/ui/Masonry';
// @ts-ignore
import CircularGallery from '@/components/ui/CircularGallery';
import BlurText from '@/components/ui/BlurText';
import SplitText from '@/components/ui/SplitText';
import GlassIcons, { type GlassIconsItem } from '@/components/ui/GlassIcons';

/* ============================================
   DATA DEFINITIONS
   ============================================ */

const stats = [
  { number: 15, suffix: '+', label: 'Years Experience', icon: FiCalendar },
  { number: 5000, suffix: '+', label: 'Happy Clients', icon: FiUsers },
  { number: 50, suffix: '+', label: 'Design Awards', icon: FiAward },
  { number: 99, suffix: '%', label: 'Satisfaction Rate', icon: FiStar },
];

const allServices = [
  { title: 'Wedding Photography', category: 'Wedding', desc: 'Timeless luxury moments captured with cinematic elegance & art direction.', icon: FiHeart, image: '/images/wedding_photography.jpg' },
  { title: 'Pre Wedding', category: 'Couples', desc: 'Romantic visual stories set in iconic destinations around the world.', icon: FiCamera, image: '/images/pre_wedding_service.jpg' },
  { title: 'Engagement', category: 'Couples', desc: 'Capturing the beginning of your forever with authentic emotion.', icon: FiHeart, image: '/images/engagement_service.jpg' },
  { title: 'Maternity', category: 'Family', desc: 'Celebrating new life with artistic, glowing portrait sessions.', icon: FiStar, image: '/images/maternity_service.jpg' },
  { title: 'Baby Shoot', category: 'Family', desc: 'Precious newborn & baby portraiture handled with tender care.', icon: FiHeart, image: '/images/baby_shoot_service.jpg' },
  { title: 'Birthday', category: 'Events', desc: 'Milestone birthday celebrations documented with vibrant energy.', icon: FiStar, image: '/images/birthday_service.jpg' },
  { title: 'Drone Photography', category: 'Cinematography', desc: 'Breathtaking 4K aerial imagery capturing grandeur from above.', icon: FiMapPin, image: '/images/drone_service.jpg' },
];

const portfolioCategories = ['All', 'Wedding', 'Pre Wedding', 'Baby', 'Family', 'Drone', 'Events'];

const portfolioItems = [
  { id: '1', title: 'South Indian Wedding Ceremony', category: 'Wedding', img: '/images/new_anim_wedding_family.jpg', height: 580, url: '/gallery' },
  { id: '2', title: 'Joyful Haldi Celebrations', category: 'Pre Wedding', img: '/images/new_anim_haldi_ceremony.jpg', height: 460, url: '/gallery' },
  { id: '3', title: 'Aarohi 1st Birthday Shoot', category: 'Baby', img: '/images/new_anim_aarohi_birthday.jpg', height: 600, url: '/gallery' },
  { id: '4', title: 'Fine Art Album Spread', category: 'Wedding', img: '/images/new_anim_album_spread.jpg', height: 480, url: '/gallery' },
  { id: '5', title: 'Golden Milestone Birthday', category: 'Baby', img: '/images/new_anim_baby_one.jpg', height: 420, url: '/gallery' },
  { id: '6', title: 'Royal Wedding Udaipur', category: 'Wedding', img: '/images/wedding_photography.jpg', height: 500, url: '/gallery' },
  { id: '7', title: 'Pre-Wedding Sunset Romance', category: 'Pre Wedding', img: '/images/pre_wedding_service.jpg', height: 380, url: '/gallery' },
  { id: '8', title: 'Traditional South Indian Bride', category: 'Wedding', img: '/images/our_story_bride_bg.png', height: 480, url: '/gallery' },
  { id: '9', title: 'Newborn Dreams Session', category: 'Baby', img: '/images/baby_shoot_service.jpg', height: 360, url: '/gallery' },
  { id: '10', title: 'Maternity Glow Portrait', category: 'Family', img: '/images/maternity_service.jpg', height: 520, url: '/gallery' },
  { id: '11', title: '4K Aerial Drone Perspective', category: 'Drone', img: '/images/drone_service.jpg', height: 400, url: '/gallery' },
  { id: '12', title: 'Engagement Ring Promise', category: 'Pre Wedding', img: '/images/engagement_service.jpg', height: 440, url: '/gallery' },
  { id: '13', title: 'Birthday Celebration Highlights', category: 'Events', img: '/images/birthday_service.jpg', height: 350, url: '/gallery' },
  { id: '14', title: 'Heritage Wedding Album', category: 'Wedding', img: '/images/about_hero_banner.jpg', height: 540, url: '/gallery' },
];

const videoShowcase = [
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

const whyChooseUs = [
  { title: '4K Cinematic Videos', desc: 'Shot on Cinema Line cameras with color grading by expert colorists.', icon: FiFilm, targetId: 'cinematography' },
  { title: 'Professional Editors', desc: 'In-house post-production team delivering magazine-ready retouches.', icon: FiStar, href: '/about#team' },
  { title: 'Tailored Packages', desc: 'Customized photography & film packages designed for your dream vision.', icon: FiCheckCircle, href: '/packages' },
  { title: 'Premium Albums', desc: 'Handcrafted Italian leather flush-mount albums imported from Milan.', icon: FiImage, href: '/gallery' },
];

const testimonials = [
  { name: 'Priya & Vihaan Sharma', role: 'Bride & Groom', image: 'P', text: 'Bobby Studio transformed our Udaipur wedding into an absolute fairy tale. The candid shots bring tears to our eyes every time we look at them. World-class team!', rating: 5 },
  { name: 'Rohan Mehta', role: 'Corporate Marketing Director', image: 'R', text: 'The level of professionalism, lighting mastery, and speed of delivery is unmatched. Bobby Studio handles our commercial campaigns with perfection.', rating: 5 },
  { name: 'Ananya & Kabir', role: 'Pre-Wedding Couple', image: 'A', text: 'Our Goa pre-wedding shoot with Bobby Studio was the highlight of our engagement. The drone shots and video teaser give us goosebumps!', rating: 5 },
];

const instagramPosts = [
  { id: 1, likes: '1.4k', comments: '124', label: 'Royal Wedding Udaipur' },
  { id: 2, likes: '2.8k', comments: '210', label: 'Goa Beach Sunset' },
  { id: 3, likes: '980', comments: '88', label: 'Vogue Editorial' },
  { id: 4, likes: '3.1k', comments: '340', label: 'Bride Portrait' },
  { id: 5, likes: '1.9k', comments: '156', label: 'Sunset Couple Shot' },
  { id: 6, likes: '4.2k', comments: '512', label: 'Jaipur Fort Aerial' },
];

const latestBlogs = [
  { id: 1, title: 'How to Prepare for Your Wedding Photography Session', category: 'Wedding Tips', date: 'Jan 15, 2026', readTime: '7 min read', excerpt: 'Essential secrets to feeling natural on camera and getting breathtaking candid shots on your big day.' },
  { id: 2, title: 'The Magic of Golden Hour Lighting in Destination Shoots', category: 'Photography Art', date: 'Jan 08, 2026', readTime: '5 min read', excerpt: 'How we harness natural sunlight to create glowing, magical portraits that stand the test of time.' },
  { id: 3, title: 'Behind the Scenes: 3-Day Royal Wedding at City Palace Udaipur', category: 'Behind the Scenes', date: 'Dec 28, 2025', readTime: '10 min read', excerpt: 'Go behind the lens with our 12-member crew as we captured one of India\'s grandest weddings.' },
];

/* ============================================
   HERO SECTION COMPONENT
   ============================================ */

const heroImages = [
  '/images/hero_slider_1.jpg',
  '/images/hero_slider_2.jpg',
  '/images/hero_slider_3.jpg',
  '/images/hero_slider_4.jpg',
  '/images/hero_slider_5.jpg',
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Preload all 5 images on mount
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto-play slideshow every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen pt-36 pb-24 flex items-center justify-center overflow-hidden bg-black text-white group"
      style={{ opacity: heroOpacity }}
    >
      {/* Fullscreen Hero Background Slider — 5 Uploaded Images with Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.3, ease: 'easeInOut' },
              scale: { duration: 3.5, ease: 'easeOut' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentSlide]}
              alt={`Bobby Studio Showcase ${currentSlide + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Dark Gradient Overlay (25-35% opacity for text legibility while preserving image brilliance) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75 z-10 pointer-events-none" />
      </div>

      {/* Fixed Hero Content — Unaffected by Image Slideshow Transitions */}
      <div className="relative z-20 container-premium text-center px-4 max-w-5xl mx-auto pt-24 md:pt-36">
        {/* Main Heading — Animated with React Bits BlurText */}
        <div className="mb-2 flex justify-center text-center">
          <BlurText
            text="Every Moment Deserves"
            as="h1"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-luxury text-white leading-[1.05] font-semibold drop-shadow-lg justify-center text-center"
          />
        </div>
        <div className="mb-10 flex justify-center text-center">
          <BlurText
            text="Timeless Perfection"
            as="h1"
            delay={150}
            animateBy="words"
            direction="bottom"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-luxury leading-[1.05] text-white italic font-bold drop-shadow-xl justify-center text-center"
          />
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Primary Button — Pure White */}
          <MagneticElement>
            <Link to="/book">
              <button className="px-7 py-3.5 bg-white text-black text-[11px] font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:scale-105 uppercase flex items-center gap-2">
                <span>Book Your Session</span>
                <FiCalendar size={14} />
              </button>
            </Link>
          </MagneticElement>

          {/* Secondary Button — Glass White Border */}
          <MagneticElement>
            <Link to="/gallery">
              <button className="px-7 py-3.5 bg-black/30 backdrop-blur-md border border-white/50 text-white hover:bg-white hover:text-black text-[11px] font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 uppercase flex items-center gap-2">
                <span>Explore Gallery</span>
                <FiArrowRight size={14} />
              </button>
            </Link>
          </MagneticElement>
        </motion.div>
      </div>

      {/* Prev / Next Minimal Glass Arrow Controls (Hidden until hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Showreel Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform z-10"
            >
              <FiX size={24} />
            </button>
            <motion.div
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 relative shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/6ABes0mjhMw?autoplay=1"
                title="Bobby Studio 4K Showreel"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

/* ============================================
   STATISTICS SECTION
   ============================================ */

const defaultStatsList = [
  { number: 15, suffix: '+', label: 'Years Experience', icon: FiCalendar },
  { number: 5000, suffix: '+', label: 'Happy Clients', icon: FiUsers },
  { number: 50, suffix: '+', label: 'Design Awards', icon: FiAward },
  { number: 99, suffix: '%', label: 'Satisfaction Rate', icon: FiStar },
];

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [displayedStats, setDisplayedStats] = useState(() => {
    const saved = localStorage.getItem('bobby_studio_cms_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const iconsMap = [FiCalendar, FiUsers, FiAward, FiStar];
          return parsed.map((item: any, idx: number) => ({
            number: Number(item.number || 0),
            suffix: item.suffix || '',
            label: item.label || '',
            icon: iconsMap[idx % iconsMap.length],
          }));
        }
      } catch (e) {}
    }
    return defaultStatsList;
  });

  useEffect(() => {
    const loadStats = () => {
      const saved = localStorage.getItem('bobby_studio_cms_stats');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const iconsMap = [FiCalendar, FiUsers, FiAward, FiStar];
            setDisplayedStats(
              parsed.map((item: any, idx: number) => ({
                number: Number(item.number || 0),
                suffix: item.suffix || '',
                label: item.label || '',
                icon: iconsMap[idx % iconsMap.length],
              }))
            );
          }
        } catch (e) {}
      }
    };
    loadStats();
    window.addEventListener('storage', loadStats);
    return () => window.removeEventListener('storage', loadStats);
  }, []);

  const gridColsClass =
    displayedStats.length === 4
      ? 'grid-cols-2 lg:grid-cols-4'
      : displayedStats.length === 5
      ? 'grid-cols-2 lg:grid-cols-5'
      : 'grid-cols-2 lg:grid-cols-4';

  return (
    <section className="relative py-20 bg-[#FAFAFA] border-y border-[#EAEAEA]">
      <div ref={ref} className="container-premium">
        <div className={`grid ${gridColsClass} gap-6`}>
          {displayedStats.map((stat, i) => (
            <FadeIn key={stat.label + i} delay={i * 0.1} className="h-full">
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl text-center hover:border-[#000000] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center mb-3">
                  <stat.icon className="text-[#000000]" size={20} />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-[#000000] mb-1">
                  {inView ? (
                    <CountUp end={stat.number} duration={2.5} decimals={0} separator="," />
                  ) : (
                    '0'
                  )}
                  <span className="text-[#000000]">{stat.suffix}</span>
                </div>
                <p className="text-[#555555] text-xs tracking-wider uppercase font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   ABOUT BOBBY STUDIO SECTION
   ============================================ */

const AboutSection = () => {
  return (
    <section className="section-padding bg-[#FAF8F5] border-y border-[#EAEAEA] overflow-hidden">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Story Text */}
          <div className="lg:col-span-5 space-y-5">
            <FadeIn direction="left">
              <SplitText
                text="Bobby Studio – Because Every Moment Matters"
                tag="h2"
                delay={45}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 35 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="left"
                className="text-3xl sm:text-4xl lg:text-5xl font-luxury text-[#000000] font-semibold leading-[1.2] mb-6"
              />
              <p className="text-[#444444] text-sm md:text-base leading-relaxed font-light">
                At Bobby Studio, we believe every moment tells a unique story worth preserving. From life’s biggest celebrations to professional brand campaigns, we capture memories and create visuals that leave a lasting impression.
              </p>
              <p className="text-[#444444] text-sm md:text-base leading-relaxed font-light">
                We specialise in weddings, pre-wedding shoots, maternity, baby photography, corporate events, product photography, drone coverage, podcast productions, homestays, dance performances, and landscape photography. Our creative approach ensures every project reflects genuine emotions, striking visuals, and exceptional attention to detail.
              </p>
              <p className="text-[#444444] text-sm md:text-base leading-relaxed font-light">
                With years of experience, industry-leading equipment, and a passionate creative team, we deliver photography and videography that are authentic, artistic, and timeless—helping individuals, families, businesses, and brands preserve their stories for years to come.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-display tracking-[0.15em] text-[#000000] hover:text-[#555555] font-semibold uppercase transition-colors group"
                >
                  <span>Know More About Us</span>
                  <FiChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 3 Larger Side-by-Side Vertical Photo Cards */}
          <div className="lg:col-span-7">
            <FadeIn direction="right">
              <div className="grid grid-cols-3 gap-3 md:gap-5 items-center">
                {/* Photo 1: Toddler Outdoor Shoot */}
                <div className="h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-black/10 group bg-white">
                  <img
                    src="/images/toddler_walking_parents.jpg"
                    alt="Bobby Studio Baby Photography"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Photo 2: Romantic Night Couple (Staggered Down) */}
                <div className="h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-black/10 group bg-white transform translate-y-4">
                  <img
                    src="/images/portfolio_prewedding_romance.jpg"
                    alt="Bobby Studio Pre-Wedding Photography"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Photo 3: Maternity Studio Portrait */}
                <div className="h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-black/10 group bg-white">
                  <img
                    src="/images/portfolio_maternity_silhouette.jpg"
                    alt="Bobby Studio Maternity Photography"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================
   PREMIUM SERVICES SECTION
   ============================================ */

const ServicesSection = () => {
  return (
    <section className="section-padding bg-[#FAFAFA]">
      <div className="container-premium">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm text-[#000000] tracking-[0.3em] uppercase font-display font-bold mb-3">
            Our Services
          </p>
          <SplitText
            text="World-Class Photography & Filmmaking"
            tag="h2"
            delay={50}
            duration={0.85}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-luxury text-[#000000] font-semibold leading-[1.12] mb-4 max-w-5xl mx-auto"
          />
          <div className="flex justify-center mt-6">
            <div className="w-16 h-[2.5px] bg-[#000000] rounded-full" />
            <div className="w-4 h-[2.5px] bg-[#000000]/40 rounded-full ml-2" />
          </div>
          <p className="text-[#444444] text-base md:text-xl leading-relaxed mt-6 font-light max-w-3xl mx-auto">
            A complete suite of luxury visual services tailored to immortalize your most precious moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allServices.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.05}>
              <FloatingCard intensity={3}>
                <div className="group h-full bg-white border border-[#EAEAEA] rounded-2xl overflow-hidden hover:border-[#000000] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col">
                  {/* Card Header Photo or Icon */}
                  <div className="relative h-48 bg-[#FAFAFA] border-b border-[#EAEAEA] flex items-center justify-center overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <service.icon size={44} className="text-[#000000] group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-luxury text-[#000000] font-bold mb-2 group-hover:text-[#000000] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#555555] text-xs leading-relaxed mb-6 flex-1 font-light">
                      {service.desc}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 text-xs font-display font-semibold text-[#000000] group-hover:gap-3 transition-all duration-300 pt-4 border-t border-[#EAEAEA]"
                    >
                      <span>Explore Service</span>
                      <FiArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </FloatingCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   FEATURED PORTFOLIO SECTION
   ============================================ */

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((i) => i.category === activeCategory);

  return (
    <section className="pt-16 pb-4 bg-white">
      <div className="container-premium">
        <SectionHeading
          label="Featured Portfolio"
          title="Curated Luxury"
          titleAccent="Gallery"
          description="Handpicked moments of emotion, beauty, and grandeur captured through our lenses."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-display transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-background shadow-gold'
                  : 'glass text-muted hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* React Bits Masonry Layout */}
        <Masonry
          items={filteredItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </section>
  );
};

/* ============================================
   CINEMATIC VIDEO SHOWCASE SECTION
   ============================================ */

const VideoShowcaseSection = () => {
  const [filmsList, setFilmsList] = useState(() => {
    const saved = localStorage.getItem('bobby_studio_cms_videos');
    return saved ? JSON.parse(saved) : videoShowcase;
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
    return '/images/hero_new_1.jpg';
  };

  return (
    <section id="cinematography" className="pt-6 pb-20 bg-white text-[#000000] overflow-hidden scroll-mt-24">
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

/* ============================================
   WHY CHOOSE BOBBY STUDIO
   ============================================ */

const WhyChooseSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (item: typeof whyChooseUs[0]) => {
    if (item.targetId) {
      const element = document.getElementById(item.targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          label="The Bobby Studio Standard"
          title="Why Choose"
          titleAccent="Bobby Studio"
          description="Our relentless pursuit of perfection, technology, and art sets us apart."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div
                onClick={() => handleCardClick(item)}
                className={`p-6 glass rounded-2xl text-center hover:border-black/40 transition-all duration-300 hover:shadow-xl h-full flex flex-col items-center group hover:-translate-y-1 ${
                  item.targetId || item.href ? 'cursor-pointer' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-base font-luxury text-black font-bold mb-2 group-hover:text-black transition-colors">{item.title}</h3>
                <p className="text-[#555555] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          label="Cherished Words"
          title="What Our Clients"
          titleAccent="Say"
          description="Love stories told by the couples and brands who trusted us."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="glass p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar key={j} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-text/80 text-sm leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-luxury font-bold text-primary">
                    {t.image}
                  </div>
                  <div>
                    <h4 className="text-sm font-luxury text-text font-bold">{t.name}</h4>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const circularGalleryItems = [
  { image: '/images/new_anim_wedding_family.jpg', text: '' },
  { image: '/images/new_anim_haldi_ceremony.jpg', text: '' },
  { image: '/images/new_anim_aarohi_birthday.jpg', text: '' },
  { image: '/images/new_anim_album_spread.jpg', text: '' },
  { image: '/images/new_anim_baby_one.jpg', text: '' },
  { image: '/images/new_anim_wedding_family.jpg', text: '' },
  { image: '/images/new_anim_haldi_ceremony.jpg', text: '' },
  { image: '/images/new_anim_aarohi_birthday.jpg', text: '' },
];

const socialGlassIcons: GlassIconsItem[] = [
  { icon: <FaInstagram size={20} />, label: 'Instagram', href: 'https://instagram.com/bobbyyyy.x_' },
  { icon: <FaFacebookF size={18} />, label: 'Facebook', href: 'https://facebook.com' },
  { icon: <FaYoutube size={20} />, label: 'YouTube', href: 'https://youtube.com' },
  { icon: <FaPinterestP size={18} />, label: 'Pinterest', href: 'https://pinterest.com' },
  { icon: <FaWhatsapp size={20} />, label: 'WhatsApp', href: 'https://wa.me/919949216881?text=Hi%20Bobby%20Studio!' }
];

const InstagramSection = () => {
  const cmsInstagram = (() => {
    const saved = localStorage.getItem('bobby_studio_cms_instagram');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          image: item.image,
          text: item.label || '',
        }));
      } catch (e) {
        return circularGalleryItems;
      }
    }
    return circularGalleryItems;
  })();

  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-[#EAEAEA] overflow-hidden">
      <div className="container-premium text-center mb-4">
        <p className="text-xs text-[#555555] tracking-[0.25em] uppercase font-display mb-2">Follow Our Journey</p>
        <h2 className="text-3xl md:text-4xl font-luxury text-[#000000] font-semibold">
          @bobbystudio on <span className="italic font-normal">Instagram</span>
        </h2>
      </div>

      {/* 3D WebGL Circular Gallery Component from React Bits */}
      <div className="w-full h-[460px] md:h-[540px] relative">
        <CircularGallery
          key={JSON.stringify(cmsInstagram)}
          items={cmsInstagram.length > 0 ? cmsInstagram : circularGalleryItems}
          bend={3}
          textColor="#000000"
          borderRadius={0.06}
          scrollSpeed={2}
          scrollEase={0.04}
        />
      </div>

      {/* 3D Glassmorphism Social Links */}
      <div className="container-premium text-center mt-8">
        <p className="text-xs text-[#000000] tracking-[0.25em] uppercase font-display font-bold mb-4">
          Follow Bobby Studio
        </p>
        <GlassIcons items={socialGlassIcons} className="justify-center" />
      </div>
    </section>
  );
};



/* ============================================
   CONTACT CTA SECTION
   ============================================ */

const ContactCTASection = () => {
  return (
    <section className="section-padding bg-black text-white relative overflow-hidden min-h-[460px] flex items-center justify-center">
      {/* Background Image with Vibrant Light & Subtle Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cta_banner_wedding.jpg"
          alt="Bobby Studio Wedding Album Showcase"
          className="w-full h-full object-cover object-center brightness-110 contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
      </div>

      <div className="container-premium relative z-10 text-center py-10">
        <FadeIn>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-luxury text-white mb-8 max-w-4xl mx-auto drop-shadow-xl leading-[1.15] font-semibold">
            Let's Create Something <span className="text-white italic font-bold">Beautiful Together</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-display font-bold tracking-wider rounded-full hover:bg-[#F0F0F0] hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <FiCalendar size={18} className="text-black" />
              Book Your Session
            </Link>
            <a
              href="https://wa.me/919949216881?text=Hi%20Bobby%20Studio!%20I'm%20ready%20to%20book%20a%20shoot."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-display font-bold tracking-wider rounded-full hover:bg-[#F0F0F0] hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <FaWhatsapp size={18} className="text-emerald-600" />
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ============================================
   MAIN HOMEPAGE CONTAINER
   ============================================ */

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <VideoShowcaseSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <InstagramSection />
      <ContactCTASection />
    </motion.div>
  );
};

export default HomePage;
