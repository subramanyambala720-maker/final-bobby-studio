import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSave, FiCheck, FiFilm, FiStar, FiSliders, FiMessageSquare, FiYoutube, FiInstagram, FiUploadCloud, FiAward } from 'react-icons/fi';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  isPublished: boolean;
}

interface CinemaFilm {
  id: string;
  title: string;
  location: string;
  duration: string;
  youtubeUrl: string;
  thumbnail?: string;
}

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface CtaBanner {
  headline: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
}

interface InstagramPost {
  id: string;
  label: string;
  image: string;
  likes: string;
  comments: string;
}

interface StudioStatItem {
  id: string;
  number: number;
  suffix: string;
  label: string;
}

const initialSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Every Moment Deserves Timeless Perfection',
    subtitle: 'World-Class Photography & Filmmaking',
    imageUrl: '/images/hero_new_1.jpg',
    ctaText: 'BOOK YOUR SESSION',
    ctaLink: '/book',
    isPublished: true,
  },
  {
    id: '2',
    title: 'Capturing Love In Pure Luxury',
    subtitle: 'Destination & Royal Wedding Cinematography',
    imageUrl: '/images/hero_new_2.jpg',
    ctaText: 'EXPLORE GALLERY',
    ctaLink: '/gallery',
    isPublished: true,
  },
  {
    id: '3',
    title: 'Unrivaled Quality & Breathtaking Aesthetics',
    subtitle: 'High-End Fashion & Commercial Shoots',
    imageUrl: '/images/hero_new_3.jpg',
    ctaText: 'OUR PACKAGES',
    ctaLink: '/packages',
    isPublished: true,
  },
];

const initialFilms: CinemaFilm[] = [
  {
    id: '1',
    title: 'The Royal Wedding Film — Aria & Vihaan',
    location: 'Udaipur Palace',
    duration: '4:20',
    youtubeUrl: 'https://youtu.be/6ABes0mjhMw?si=RUeK6p7bIqQ0PHrP',
    thumbnail: 'https://img.youtube.com/vi/6ABes0mjhMw/hqdefault.jpg',
  },
  {
    id: '2',
    title: 'Sunset Magic in Goa — Pre-Wedding Film',
    location: 'Goa Coast',
    duration: '3:15',
    youtubeUrl: 'https://youtu.be/uutZgpAoYE0?si=FwKN3re6AhVrpVC9',
    thumbnail: 'https://img.youtube.com/vi/uutZgpAoYE0/hqdefault.jpg',
  },
  {
    id: '3',
    title: 'Jaipur Heritage Celebration',
    location: 'Jaipur Fort',
    duration: '5:40',
    youtubeUrl: 'https://youtu.be/Yp0V_5Q36Xw',
    thumbnail: 'https://img.youtube.com/vi/Yp0V_5Q36Xw/hqdefault.jpg',
  },
];

const initialReviews: ReviewItem[] = [
  { id: '1', name: 'Priya & Vihaan Sharma', role: 'Bride & Groom', text: 'Bobby Studio transformed our Udaipur wedding into an absolute fairy tale. The candid shots bring tears to our eyes every time we look at them. World-class team!', rating: 5 },
  { id: '2', name: 'Rohan Mehta', role: 'Corporate Marketing Director', text: 'The level of professionalism, lighting mastery, and speed of delivery is unmatched. Bobby Studio handles our commercial campaigns with perfection.', rating: 5 },
  { id: '3', name: 'Ananya & Kabir', role: 'Pre-Wedding Couple', text: 'Our Goa pre-wedding shoot with Bobby Studio was the highlight of our engagement. The drone shots and video teaser give us goosebumps!', rating: 5 },
];

const initialCta: CtaBanner = {
  headline: 'Ready to Capture Your Story in Pure Luxury?',
  subheading: 'Book your wedding or creative photoshoot session with Hyderabad\'s premier photography studio.',
  buttonText: 'RESERVE DATES NOW',
  buttonLink: '/book',
};

const initialInstagram: InstagramPost[] = [
  { id: '1', label: 'Royal Wedding Udaipur', image: '/images/hero_new_1.jpg', likes: '1.4k', comments: '124' },
  { id: '2', label: 'Goa Beach Sunset', image: '/images/hero_new_2.jpg', likes: '2.8k', comments: '210' },
  { id: '3', label: 'Vogue Editorial', image: '/images/hero_new_3.jpg', likes: '980', comments: '88' },
  { id: '4', label: 'Bride Portrait', image: '/images/hero_new_4.jpg', likes: '3.1k', comments: '340' },
  { id: '5', label: 'Sunset Couple Shot', image: '/images/new_anim_wedding_family.jpg', likes: '1.9k', comments: '156' },
  { id: '6', label: 'Jaipur Fort Aerial', image: '/images/new_anim_haldi_ceremony.jpg', likes: '4.2k', comments: '512' },
];

const initialStats: StudioStatItem[] = [
  { id: '1', number: 15, suffix: '+', label: 'Years Experience' },
  { id: '2', number: 5000, suffix: '+', label: 'Happy Clients' },
  { id: '3', number: 50, suffix: '+', label: 'Design Awards' },
  { id: '4', number: 99, suffix: '%', label: 'Satisfaction Rate' },
];

const AdminHeroCMSPage = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'films' | 'reviews' | 'cta' | 'instagram' | 'stats'>('hero');

  const [slides, setSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('bobby_studio_hero_slides');
    return saved ? JSON.parse(saved) : initialSlides;
  });

  const [films, setFilms] = useState<CinemaFilm[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_videos');
    return saved ? JSON.parse(saved) : initialFilms;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_testimonials');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [cta, setCta] = useState<CtaBanner>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_cta');
    return saved ? JSON.parse(saved) : initialCta;
  });

  const [instagram, setInstagram] = useState<InstagramPost[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_instagram');
    return saved ? JSON.parse(saved) : initialInstagram;
  });

  const [stats, setStats] = useState<StudioStatItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auto-extract thumbnail from YouTube link
  const getYoutubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
    }
    return '/images/hero_new_1.jpg';
  };

  const safeSetLocalStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage limit reached for ${key}`);
      try {
        if (Array.isArray(value)) {
          const trimmed = value.map((item: any) => {
            if (item.image && typeof item.image === 'string' && item.image.length > 300000) {
              return { ...item, image: '/images/hero_new_1.jpg' };
            }
            return item;
          });
          localStorage.setItem(key, JSON.stringify(trimmed));
        }
      } catch (innerErr) {
        console.error(innerErr);
      }
    }
  };

  // Auto-sync any additions, edits, or deletions immediately to localStorage and notify main website
  useEffect(() => {
    safeSetLocalStorage('bobby_studio_hero_slides', slides);
    safeSetLocalStorage('bobby_studio_cms_videos', films);
    safeSetLocalStorage('bobby_studio_cms_testimonials', reviews);
    safeSetLocalStorage('bobby_studio_cms_cta', cta);
    safeSetLocalStorage('bobby_studio_cms_instagram', instagram);
    safeSetLocalStorage('bobby_studio_cms_stats', stats);
    window.dispatchEvent(new Event('storage'));
  }, [slides, films, reviews, cta, instagram, stats]);

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    safeSetLocalStorage('bobby_studio_hero_slides', slides);
    safeSetLocalStorage('bobby_studio_cms_videos', films);
    safeSetLocalStorage('bobby_studio_cms_testimonials', reviews);
    safeSetLocalStorage('bobby_studio_cms_cta', cta);
    safeSetLocalStorage('bobby_studio_cms_instagram', instagram);
    safeSetLocalStorage('bobby_studio_cms_stats', stats);

    window.dispatchEvent(new Event('storage'));

    try {
      await fetch('http://localhost:5000/api/cms/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides, films, reviews, cta, instagram, stats }),
      });
    } catch (e) {
      console.warn('Backend API offline, saved homepage CMS locally');
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Homepage Content Management</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage homepage sections: Hero Banners, 4K Cinema Films, Reviews, CTA Banner, Instagram Feed & Experience Stats.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
        >
          {saveSuccess ? <FiCheck size={16} className="text-emerald-400" /> : <FiSave size={16} />}
          <span>{saveSuccess ? 'Published Live!' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-2 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'hero', label: '1. Hero Banners', icon: FiSliders },
          { id: 'films', label: '2. 4K Cinema Films', icon: FiFilm },
          { id: 'reviews', label: '3. Client Reviews', icon: FiStar },
          { id: 'cta', label: '4. Call To Action', icon: FiMessageSquare },
          { id: 'instagram', label: '5. Instagram Feed', icon: FiInstagram },
          { id: 'stats', label: '6. Studio Experience Stats', icon: FiAward },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-transparent text-[#666666] hover:bg-[#F5F5F7]'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO SLIDES */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Hero Banner Slides</h3>
            <button
              onClick={() => {
                const newSlide: HeroSlide = {
                  id: Date.now().toString(),
                  title: 'New Luxury Photography Banner',
                  subtitle: 'Cinematic Storytelling & Aesthetics',
                  imageUrl: '/images/hero_new_1.jpg',
                  ctaText: 'DISCOVER MORE',
                  ctaLink: '/services',
                  isPublished: true,
                };
                setSlides([...slides, newSlide]);
              }}
              className="px-3.5 py-2 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus size={14} /> Add Hero Slide
            </button>
          </div>

          <div className="space-y-4">
            {slides.map((slide, idx) => (
              <div key={slide.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <span className="text-xs font-bold text-black">Slide #{idx + 1}</span>
                  <button
                    onClick={() => setSlides(slides.filter((s) => s.id !== slide.id))}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-black mb-1">Image URL</label>
                    <input
                      type="text"
                      value={slide.imageUrl}
                      onChange={(e) =>
                        setSlides(slides.map((s) => (s.id === slide.id ? { ...s, imageUrl: e.target.value } : s)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-black mb-1">Main Headline</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) =>
                        setSlides(slides.map((s) => (s.id === slide.id ? { ...s, title: e.target.value } : s)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-black mb-1">Subtitle Category</label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) =>
                        setSlides(slides.map((s) => (s.id === slide.id ? { ...s, subtitle: e.target.value } : s)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 4K CINEMA FILMS */}
      {activeTab === 'films' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">4K Cinema YouTube Showcase</h3>
            <button
              onClick={() => {
                const newFilm: CinemaFilm = {
                  id: Date.now().toString(),
                  title: 'New Wedding Film Highlights',
                  location: 'Udaipur Palace',
                  duration: '4:00',
                  youtubeUrl: 'https://youtu.be/6ABes0mjhMw',
                  thumbnail: 'https://img.youtube.com/vi/6ABes0mjhMw/hqdefault.jpg',
                };
                setFilms([...films, newFilm]);
              }}
              className="px-3.5 py-2 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus size={14} /> Add Film Video
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {films.map((film) => (
              <div key={film.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-5 space-y-4 shadow-xs relative">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <img src={film.thumbnail || getYoutubeThumbnail(film.youtubeUrl)} alt={film.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
                    {film.duration}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-black mb-1">Film Title</label>
                    <input
                      type="text"
                      value={film.title}
                      onChange={(e) =>
                        setFilms(films.map((f) => (f.id === film.id ? { ...f, title: e.target.value } : f)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Location Tag</label>
                    <input
                      type="text"
                      value={film.location}
                      onChange={(e) =>
                        setFilms(films.map((f) => (f.id === film.id ? { ...f, location: e.target.value } : f)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">YouTube Video Link</label>
                    <div className="relative">
                      <FiYoutube className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" size={15} />
                      <input
                        type="text"
                        value={film.youtubeUrl}
                        onChange={(e) => {
                          const url = e.target.value;
                          const thumb = getYoutubeThumbnail(url);
                          setFilms(films.map((f) => (f.id === film.id ? { ...f, youtubeUrl: url, thumbnail: thumb } : f)));
                        }}
                        className="w-full pl-9 pr-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setFilms(films.filter((f) => f.id !== film.id))}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Client Reviews & Testimonials</h3>
            <button
              onClick={() => {
                const newReview: ReviewItem = {
                  id: Date.now().toString(),
                  name: 'Happy Client',
                  role: 'Bride & Groom',
                  text: 'Bobby Studio captured our dream wedding perfectly!',
                  rating: 5,
                };
                setReviews([...reviews, newReview]);
              }}
              className="px-3.5 py-2 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus size={14} /> Add Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-5 space-y-4 shadow-xs">
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FiStar key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <button
                    onClick={() => setReviews(reviews.filter((r) => r.id !== rev.id))}
                    className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-black mb-1">Client Name</label>
                    <input
                      type="text"
                      value={rev.name}
                      onChange={(e) =>
                        setReviews(reviews.map((r) => (r.id === rev.id ? { ...r, name: e.target.value } : r)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Event Type / Role</label>
                    <input
                      type="text"
                      value={rev.role}
                      onChange={(e) =>
                        setReviews(reviews.map((r) => (r.id === rev.id ? { ...r, role: e.target.value } : r)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Review Statement Quote</label>
                    <textarea
                      rows={3}
                      value={rev.text}
                      onChange={(e) =>
                        setReviews(reviews.map((r) => (r.id === rev.id ? { ...r, text: e.target.value } : r)))
                      }
                      className="w-full p-3 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CTA BANNER */}
      {activeTab === 'cta' && (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider border-b border-[#EAEAEA] pb-3">
            Bottom Call To Action Banner
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-black mb-1">Main Headline</label>
              <input
                type="text"
                value={cta.headline}
                onChange={(e) => setCta({ ...cta, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1">Subheading Description</label>
              <textarea
                rows={2}
                value={cta.subheading}
                onChange={(e) => setCta({ ...cta, subheading: e.target.value })}
                className="w-full p-3 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-black mb-1">Button Label</label>
                <input
                  type="text"
                  value={cta.buttonText}
                  onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Target Route Link</label>
                <input
                  type="text"
                  value={cta.buttonLink}
                  onChange={(e) => setCta({ ...cta, buttonLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INSTAGRAM FEED SHOWCASE */}
      {activeTab === 'instagram' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Instagram Feed Showcase (@bobbystudio)</h3>
            <div className="flex items-center gap-2">
              <input
                id="add-insta-file-picker"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        const newPost: InstagramPost = {
                          id: Date.now().toString(),
                          label: 'Luxury Photo Shoot',
                          image: event.target.result as string,
                          likes: '1.2k',
                          comments: '95',
                        };
                        setInstagram((prev) => [newPost, ...prev]);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('add-insta-file-picker')?.click()}
                className="px-3.5 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <FiPlus size={14} /> Add Instagram Post (Browse Laptop)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagram.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-5 space-y-4 shadow-xs relative">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black group">
                  <img src={post.image} alt={post.label} className="w-full h-full object-cover" />
                  <div
                    onClick={() => document.getElementById(`insta-picker-${post.id}`)?.click()}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1 cursor-pointer"
                  >
                    <FiUploadCloud size={18} /> Upload Photo from Laptop
                  </div>
                  <input
                    id={`insta-picker-${post.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setInstagram(
                              instagram.map((p) => (p.id === post.id ? { ...p, image: event.target!.result as string } : p))
                            );
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-black mb-1">Photo Image URL / Laptop File</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={post.image}
                        onChange={(e) =>
                          setInstagram(instagram.map((p) => (p.id === post.id ? { ...p, image: e.target.value } : p)))
                        }
                        className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById(`insta-picker-${post.id}`)?.click()}
                        className="px-3 py-2 bg-black text-white rounded-xl font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
                        title="Upload Photo from Laptop"
                      >
                        <FiUploadCloud size={14} /> Browse
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Post Caption / Tag</label>
                    <input
                      type="text"
                      value={post.label}
                      onChange={(e) =>
                        setInstagram(instagram.map((p) => (p.id === post.id ? { ...p, label: e.target.value } : p)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-black mb-1">Likes Count</label>
                      <input
                        type="text"
                        value={post.likes}
                        onChange={(e) =>
                          setInstagram(instagram.map((p) => (p.id === post.id ? { ...p, likes: e.target.value } : p)))
                        }
                        className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-black mb-1">Comments Count</label>
                      <input
                        type="text"
                        value={post.comments}
                        onChange={(e) =>
                          setInstagram(instagram.map((p) => (p.id === post.id ? { ...p, comments: e.target.value } : p)))
                        }
                        className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setInstagram(instagram.filter((p) => p.id !== post.id))}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: STUDIO EXPERIENCE STATS COUNTERS */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider">Studio Experience Counter Cards</h3>
              <p className="text-xs text-[#777777] mt-0.5">
                Configure numbers, symbols, and labels displayed on the homepage stats bar.
              </p>
            </div>
            <button
              onClick={() => {
                const newStat: StudioStatItem = {
                  id: Date.now().toString(),
                  number: 100,
                  suffix: '+',
                  label: 'Luxury Shoots',
                };
                setStats([...stats, newStat]);
              }}
              className="px-3.5 py-2 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus size={14} /> Add Counter Card
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-5 space-y-4 shadow-xs relative">
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <span className="text-xs font-bold text-black">Counter Card #{idx + 1}</span>
                  <button
                    onClick={() => setStats(stats.filter((s) => s.id !== item.id))}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete Counter"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>

                <div className="text-center p-4 bg-[#F8F9FB] border border-[#EAEAEA] rounded-xl">
                  <span className="text-2xl font-bold font-display text-black">
                    {item.number.toLocaleString()}
                    {item.suffix}
                  </span>
                  <p className="text-[11px] font-bold text-[#555555] uppercase tracking-wider mt-1">{item.label}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-black mb-1">Count Number</label>
                    <input
                      type="number"
                      value={item.number}
                      onChange={(e) =>
                        setStats(stats.map((s) => (s.id === item.id ? { ...s, number: Number(e.target.value) } : s)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Symbol Suffix</label>
                    <input
                      type="text"
                      placeholder="e.g. + or %"
                      value={item.suffix}
                      onChange={(e) =>
                        setStats(stats.map((s) => (s.id === item.id ? { ...s, suffix: e.target.value } : s)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Label Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Years Experience"
                      value={item.label}
                      onChange={(e) =>
                        setStats(stats.map((s) => (s.id === item.id ? { ...s, label: e.target.value } : s)))
                      }
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold uppercase tracking-wider"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeroCMSPage;
