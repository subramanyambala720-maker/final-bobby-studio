import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiDownload, FiMaximize2, FiPlay } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

/* ============================================
   DATA
   ============================================ */

const galleryCategories = ['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Fashion', 'Product', 'Baby', 'Food', 'Behind the Scenes'];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  type: string;
  aspect: string;
  color: string;
  tags: string[];
  image?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 101,
    title: 'Little Krishna Celebration',
    category: 'Baby',
    type: 'photo',
    aspect: 'tall',
    color: 'from-amber-900/60 to-purple-900/40',
    tags: ['Baby Shoot', 'Krishna', 'Traditional'],
    image: '/images/gallery_baby_krishna.jpg',
  },
  {
    id: 102,
    title: 'Mehndi & Ring Ceremony',
    category: 'Pre-Wedding',
    type: 'photo',
    aspect: 'tall',
    color: 'from-pink-900/60 to-purple-900/40',
    tags: ['Mehndi', 'Rings', 'Detail'],
    image: '/images/gallery_mehndi_rings.jpg',
  },
  {
    id: 103,
    title: 'Royal Varmala Walk',
    category: 'Wedding',
    type: 'photo',
    aspect: 'tall',
    color: 'from-rose-900/60 to-amber-900/40',
    tags: ['Royal Wedding', 'Varmala', 'Bridal'],
    image: '/images/gallery_royal_wedding_couple.jpg',
  },
  {
    id: 104,
    title: 'Eternal Vows & Flowers',
    category: 'Wedding',
    type: 'photo',
    aspect: 'tall',
    color: 'from-amber-900/60 to-red-900/40',
    tags: ['South Indian', 'Garlands', 'Emotions'],
    image: '/images/gallery_south_wedding_garlands.jpg',
  },
  {
    id: 105,
    title: 'Luxury Drive Portrait',
    category: 'Portrait',
    type: 'photo',
    aspect: 'tall',
    color: 'from-slate-900/60 to-neutral-900/40',
    tags: ['Outdoor', 'Luxury Car', 'Style'],
    image: '/images/gallery_car_portrait.jpg',
  },
  { id: 1, title: 'Royal Udaipur Wedding', category: 'Wedding', type: 'photo', aspect: 'tall', color: 'from-amber-900/60 to-rose-900/40', tags: ['Palace', 'Candid', 'Golden Hour'], image: '/images/hero_new_1.jpg' },
  { id: 2, title: 'Monsoon Pre-Wedding', category: 'Pre-Wedding', type: 'photo', aspect: 'wide', color: 'from-teal-900/60 to-emerald-900/40', tags: ['Rain', 'Romantic', 'Outdoor'], image: '/images/hero_new_2.jpg' },
  { id: 3, title: 'Luxury Portrait', category: 'Portrait', type: 'photo', aspect: 'square', color: 'from-stone-800/60 to-neutral-900/40', tags: ['Studio', 'Moody', 'B&W'], image: '/images/hero_new_3.jpg' },
  { id: 4, title: 'Vogue Editorial', category: 'Fashion', type: 'photo', aspect: 'tall', color: 'from-violet-900/60 to-indigo-900/40', tags: ['Editorial', 'High Fashion', 'Studio'], image: '/images/hero_new_4.jpg' },
  { id: 5, title: 'Showreel 2024', category: 'Wedding', type: 'video', aspect: 'wide', color: 'from-amber-900/80 to-black/60', tags: ['Film', 'Cinematic', '4K'], image: '/images/new_anim_wedding_family.jpg' },
  { id: 6, title: 'Diamond Jewellery', category: 'Product', type: 'photo', aspect: 'square', color: 'from-zinc-800/60 to-slate-900/40', tags: ['Macro', 'Luxury', 'Product'], image: '/images/gallery_mehndi_rings.jpg' },
  { id: 7, title: 'Newborn Serenity', category: 'Baby', type: 'photo', aspect: 'tall', color: 'from-pink-800/60 to-rose-900/40', tags: ['Newborn', 'Safe', 'Precious'], image: '/images/gallery_baby_krishna.jpg' },
  { id: 8, title: 'Goa Beach Romance', category: 'Pre-Wedding', type: 'photo', aspect: 'wide', color: 'from-sky-900/60 to-blue-900/40', tags: ['Beach', 'Sunset', 'Destination'], image: '/images/hero_new_2.jpg' },
  { id: 9, title: 'Fine Dining Artistry', category: 'Food', type: 'photo', aspect: 'square', color: 'from-orange-900/60 to-red-900/40', tags: ['Food', 'Lifestyle', 'Luxury'] },
  { id: 10, title: 'Bridal Collection', category: 'Fashion', type: 'photo', aspect: 'tall', color: 'from-rose-900/60 to-pink-900/40', tags: ['Bridal', 'Couture', 'Elegant'], image: '/images/gallery_royal_wedding_couple.jpg' },
  { id: 11, title: 'Jaipur Heritage Wedding', category: 'Wedding', type: 'photo', aspect: 'wide', color: 'from-yellow-900/60 to-amber-900/40', tags: ['Heritage', 'Palace', 'Royal'], image: '/images/gallery_south_wedding_garlands.jpg' },
  { id: 12, title: 'Maternity in Light', category: 'Baby', type: 'photo', aspect: 'square', color: 'from-rose-800/60 to-pink-800/40', tags: ['Maternity', 'Glow', 'Natural'], image: '/images/gallery_baby_krishna.jpg' },
  { id: 13, title: 'Studio Secrets', category: 'Behind the Scenes', type: 'video', aspect: 'wide', color: 'from-gray-900/80 to-black/60', tags: ['BTS', 'Studio', 'Process'] },
  { id: 14, title: 'Monochrome Portrait', category: 'Portrait', type: 'photo', aspect: 'tall', color: 'from-neutral-800/80 to-black/60', tags: ['B&W', 'Classic', 'Dramatic'], image: '/images/gallery_car_portrait.jpg' },
  { id: 15, title: 'Watch Campaign', category: 'Product', type: 'photo', aspect: 'square', color: 'from-slate-800/60 to-gray-900/40', tags: ['Luxury', 'Watch', 'Macro'] },
  { id: 16, title: 'Kerala Backwaters', category: 'Wedding', type: 'photo', aspect: 'wide', color: 'from-emerald-900/60 to-teal-900/40', tags: ['Destination', 'Boat', 'Serene'], image: '/images/gallery_south_wedding_garlands.jpg' },
  { id: 17, title: 'Streetwear Editorial', category: 'Fashion', type: 'photo', aspect: 'square', color: 'from-gray-800/60 to-slate-900/40', tags: ['Urban', 'Street', 'Modern'], image: '/images/gallery_car_portrait.jpg' },
  { id: 18, title: 'Family Portraits', category: 'Portrait', type: 'photo', aspect: 'wide', color: 'from-amber-800/60 to-stone-900/40', tags: ['Family', 'Outdoor', 'Warm'], image: '/images/new_anim_wedding_family.jpg' },
];

/* ============================================
   LIGHTBOX
   ============================================ */

interface LightboxProps {
  item: typeof galleryItems[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ item, onClose, onPrev, onNext }: LightboxProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/96 backdrop-blur-xl flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-primary transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <FiX size={20} />
      </button>

      {/* Navigation */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-primary transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 md:right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-primary transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Content */}
      <motion.div
        className="relative w-full max-w-4xl mx-16"
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-full ${item.aspect === 'tall' ? 'aspect-[3/4]' : item.aspect === 'wide' ? 'aspect-[16/9]' : 'aspect-square'} rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} relative`}>
          {item.image && (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover absolute inset-0" />
          )}
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <FiPlay size={32} className="text-white ml-1" />
              </div>
            </div>
          )}
          {!item.image && item.type === 'photo' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
              <FiCamera size={80} className="text-white" />
            </div>
          )}
          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-primary text-xs tracking-[0.2em] uppercase mb-1">{item.category}</p>
                <h3 className="text-2xl font-luxury text-white">{item.title}</h3>
                <div className="flex gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs text-white/60 px-2 py-0.5 border border-white/20 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors" aria-label="Like">
                  <FiHeart size={16} />
                </button>
                <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors" aria-label="Share">
                  <FiShare2 size={16} />
                </button>
                <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors" aria-label="Download">
                  <FiDownload size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================
   GALLERY PAGE
   ============================================ */

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const allGalleryItems = (() => {
    const saved = localStorage.getItem('bobby_studio_cms_portfolio');
    if (saved) {
      try {
        const cmsProjects = JSON.parse(saved).filter((p: any) => p.isPublished !== false);
        const cmsItems = cmsProjects.map((p: any, idx: number) => ({
          id: p.id || idx + 200,
          title: p.title,
          category: p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'Wedding',
          type: 'photo',
          aspect: 'tall',
          color: 'from-[#111111] to-[#222222]',
          tags: [p.category || 'Wedding', 'Bobby Studio'],
          image: p.coverImage,
        }));
        return cmsItems.length > 0 ? cmsItems : galleryItems;
      } catch {
        return galleryItems;
      }
    }
    return galleryItems;
  })();

  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === 'All'
    ? allGalleryItems
    : allGalleryItems.filter((i: any) => i.category.toLowerCase() === activeCategory.toLowerCase());

  const lightboxIndex = lightboxItem ? filtered.findIndex((i: any) => i.id === lightboxItem.id) : -1;

  const handlePrev = () => {
    if (lightboxIndex > 0) setLightboxItem(filtered[lightboxIndex - 1]);
    else setLightboxItem(filtered[filtered.length - 1]);
  };

  const handleNext = () => {
    if (lightboxIndex < filtered.length - 1) setLightboxItem(filtered[lightboxIndex + 1]);
    else setLightboxItem(filtered[0]);
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
              <FiCamera size={14} />
              Visual Stories
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-hero font-luxury text-text mb-4">
              Our <span className="text-gradient-gold italic">Gallery</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              A curated visual journey through our finest work. Each frame is a story,
              each composition a piece of art crafted with passion and precision.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-10">
        <div className="container-premium">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-background shadow-gold'
                      : 'glass text-muted hover:text-text hover:border-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-24">
        <div className="container-premium">
          <motion.div
            className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item: any, i: number) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="break-inside-avoid mb-3 md:mb-4"
                >
                  <button
                    className="group relative w-full rounded-xl overflow-hidden bg-card cursor-pointer block"
                    onClick={() => setLightboxItem(item)}
                  >
                    <div className={`w-full ${
                      item.aspect === 'tall' ? 'aspect-[3/4]' :
                      item.aspect === 'wide' ? 'aspect-video' : 'aspect-square'
                    } bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      {item.type === 'video' && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 glass rounded-full text-xs text-white z-10">
                          <FiPlay size={10} />
                          <span>Video</span>
                        </div>
                      )}
                      {!item.image && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <FiCamera size={36} className="text-white" />
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-end">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0 p-4 w-full">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-primary text-[10px] tracking-[0.2em] uppercase">{item.category}</p>
                              <h3 className="text-sm font-luxury text-white">{item.title}</h3>
                            </div>
                            <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center">
                              <FiMaximize2 className="text-white" size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <FiCamera className="text-muted mx-auto mb-4" size={48} />
              <p className="text-muted">No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={() => setLightboxItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;
