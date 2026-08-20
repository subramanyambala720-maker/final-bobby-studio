import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiCamera, FiAward, FiHeart, FiUsers, FiStar, FiTarget, FiZap, FiGlobe } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import FloatingCard from '@/components/animations/FloatingCard';
import VariableProximity from '@/components/ui/VariableProximity';

const teamMembers = [
  {
    name: 'Bobby Sharma',
    role: 'Founder & Lead Photographer',
    bio: 'With 12+ years of experience, Bobby has captured over 2,500 weddings and won 50+ international awards. His vision defines the Bobby Studio aesthetic.',
    specialties: ['Wedding', 'Portrait', 'Fashion'],
    awards: 15,
  },
  {
    name: 'Priya Kapoor',
    role: 'Creative Director',
    bio: 'Priya brings 8 years of art direction experience from top agencies. She crafts the visual narrative that makes every Bobby Studio project unique.',
    specialties: ['Art Direction', 'Branding', 'Editorial'],
    awards: 8,
  },
  {
    name: 'Arjun Mehta',
    role: 'Senior Cinematographer',
    bio: 'A filmmaker at heart, Arjun creates cinematic wedding films that rival Hollywood productions. His drone work is legendary.',
    specialties: ['Cinematography', 'Drone', 'Film'],
    awards: 12,
  },
];

const studioValues = [
  {
    icon: FiStar,
    title: 'Excellence',
    description: 'We pursue perfection in every frame, every edit, and every client interaction.',
  },
  {
    icon: FiHeart,
    title: 'Passion',
    description: 'Photography isn\'t just our profession — it\'s our life\'s calling and greatest joy.',
  },
  {
    icon: FiTarget,
    title: 'Innovation',
    description: 'We embrace cutting-edge technology and creative techniques to stay ahead.',
  },
  {
    icon: FiZap,
    title: 'Integrity',
    description: 'Transparency, honesty, and respect form the foundation of every relationship.',
  },
];

const milestones = [
  { year: '2012', title: 'Studio Founded', description: 'Bobby Sharma launches Bobby Studio with a vision to redefine Indian photography.' },
  { year: '2014', title: 'First Major Award', description: 'Won the National Photography Excellence Award for wedding photography.' },
  { year: '2016', title: 'Team Expansion', description: 'Grew to a team of 10 professionals and opened a 5,000 sq ft studio.' },
  { year: '2018', title: 'International Recognition', description: 'Featured in International Photography Awards and expanded to destination weddings.' },
  { year: '2020', title: 'Digital Revolution', description: 'Launched virtual consultations, online galleries, and live streaming services.' },
  { year: '2022', title: '2000+ Weddings', description: 'Milestone of 2,000 weddings captured with 100+ awards to date.' },
  { year: '2024', title: 'Next Generation', description: 'Launched AI-powered tools, 3D studio tours, and premium e-commerce platform.' },
];

const equipment = [
  'Canon EOS R5 Mark II',
  'Sony A1',
  'Leica SL3',
  'DJI Inspire 3',
  'Profoto D2 Lighting',
  'Hasselblad X2D',
];

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  const [teamList, setTeamList] = useState(() => {
    const saved = localStorage.getItem('bobby_studio_cms_about_team');
    return saved ? JSON.parse(saved) : teamMembers;
  });

  useEffect(() => {
    const loadTeam = () => {
      const saved = localStorage.getItem('bobby_studio_cms_about_team');
      if (saved) {
        try {
          setTeamList(JSON.parse(saved));
        } catch {}
      }
    };
    loadTeam();
    window.addEventListener('storage', loadTeam);
    return () => window.removeEventListener('storage', loadTeam);
  }, []);

  const aboutContent = (() => {
    const saved = localStorage.getItem('bobby_studio_cms_about');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  })();

  useEffect(() => {
    if (hash === '#team') {
      const timer = setTimeout(() => {
        const element = document.getElementById('team');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-[#000000]"
    >
      {/* Hero Header with Background Image & Variable Proximity */}
      <section ref={containerRef} className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-black text-white">
        <img
          src="/images/about_hero_banner.jpg"
          alt="Bobby Studio Photography"
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 relative z-10 text-left">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-300 font-light mb-6 justify-start text-left">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>»</span>
              <span className="text-gray-200">About Us</span>
            </nav>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-luxury text-white mb-4 leading-tight max-w-4xl font-normal text-left">
              <VariableProximity
                label="Driven by creativity. Trusted by clients. Known for quality."
                className="cursor-pointer text-left block"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
                style={{ textAlign: 'left', display: 'block' }}
              />
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-300 text-xs md:text-sm max-w-xl font-light tracking-wide text-left">
              Your Search for the Best Photography Studio in Bengaluru Ends Here
            </p>
          </FadeIn>
        </div>
      </section>


      {/* Our Story */}
      <section className="section-padding bg-white border-b border-[#EAEAEA]">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] group shadow-xl">
                <img
                  src="/images/our_story_bride_bg.png"
                  alt="Bobby Studio Heritage Photography"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 rounded-2xl border border-[#EAEAEA] backdrop-blur-xl">
                  <p className="text-[#000000] text-xs font-display tracking-[0.2em] uppercase font-semibold">South Indian Wedding Rituals</p>
                  <p className="text-[#000000] font-luxury text-base font-semibold">Traditional Bridal Fine Art Expressions</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <p className="text-xs text-[#555555] tracking-[0.25em] uppercase font-display mb-4 font-medium">
                  Founded in 2012
                </p>
                <h2 className="text-display font-luxury text-[#000000] mb-6 font-semibold">
                  A Journey of{' '}
                  <span className="italic font-bold text-[#000000]">Passion</span>
                </h2>
                <div className="space-y-4 text-[#555555] leading-relaxed font-light">
                  <p>
                    Bobby Studio was born from a simple yet powerful belief: every moment
                    deserves to be captured with the reverence it commands. What started as
                    one photographer's dream has grown into one of India's most sought-after
                    luxury photography studios.
                  </p>
                  <p>
                    Our founder, Bobby Sharma, began his journey with a borrowed camera and
                    an unwavering passion for visual storytelling. Today, Bobby Studio stands
                    as a testament to what happens when artistry meets dedication — a team of
                    25+ talented professionals, a state-of-the-art studio, and over 2,500
                    weddings immortalized in frames.
                  </p>
                  <p>
                    We believe that photography is not just about capturing light — it's about
                    capturing life. Every smile, every tear, every stolen glance tells a story
                    worth preserving forever.
                  </p>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#EAEAEA]">
                  {[
                    { num: '12+', label: 'Years' },
                    { num: '2,500+', label: 'Weddings' },
                    { num: '150+', label: 'Awards' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl font-display font-bold text-[#000000]">{s.num}</p>
                      <p className="text-xs text-[#555555] uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#FAFAFA] border-b border-[#EAEAEA]">
        <div className="container-premium">
          <SectionHeading
            label="What We Stand For"
            title="Our Core"
            titleAccent="Values"
            description="The principles that guide every frame we capture and every story we tell."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioValues.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="text-center p-8 bg-white border border-[#EAEAEA] rounded-2xl h-full hover:border-[#000000] transition-all duration-500 hover:-translate-y-1 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-[#000000]" size={24} />
                  </div>
                  <h3 className="text-lg font-luxury text-[#000000] mb-3 font-semibold">{value.title}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed font-light">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white border-b border-[#EAEAEA]">
        <div className="container-premium">
          <SectionHeading
            label="Our Journey"
            title="Milestones &"
            titleAccent="Achievements"
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#EAEAEA]" />

            {milestones.map((milestone, i) => (
              <FadeIn key={milestone.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border-2 border-white z-10 mt-1.5" />

                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'
                  }`}>
                    <span className="inline-block px-3 py-1 bg-[#FAFAFA] border border-[#EAEAEA] rounded-full text-xs font-display font-semibold text-[#000000] mb-2">
                      {milestone.year}
                    </span>
                    <h4 className="text-xl font-luxury text-[#000000] mb-1 font-semibold">{milestone.title}</h4>
                    <p className="text-xs text-[#555555] leading-relaxed font-light">{milestone.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-[#FAFAFA] border-b border-[#EAEAEA] scroll-mt-24">
        <div className="container-premium">
          <SectionHeading
            label="The Masters Behind the Lens"
            title="Meet Our Creative"
            titleAccent="Team"
            description="A collective of passionate artists, storytellers, and technical masters."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamList.map((member: any, i: number) => (
              <FadeIn key={member.id || `${member.name}-${i}`} delay={i * 0.1}>
                <div className="bg-white border border-[#EAEAEA] rounded-3xl p-8 hover:border-[#000000] transition-all duration-500 hover:-translate-y-2 group shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center mb-6 text-2xl font-luxury text-[#000000] font-bold">
                    {member.name ? member.name.charAt(0) : 'T'}
                  </div>
                  <h3 className="text-xl font-luxury text-[#000000] mb-1 font-semibold group-hover:text-[#000000] transition-colors">{member.name}</h3>
                  <p className="text-xs text-[#555555] tracking-widest uppercase font-display mb-4 font-semibold">{member.role}</p>
                  <p className="text-xs text-[#555555] leading-relaxed font-light">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 bg-white">
        <div className="container-premium text-center">
          <p className="text-xs text-[#555555] tracking-[0.25em] uppercase font-display mb-3 font-semibold">State of the Art</p>
          <h2 className="text-3xl font-luxury text-[#000000] mb-8 font-semibold">Cinema Grade Equipment</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {equipment.map((item) => (
              <span
                key={item}
                className="px-6 py-3 bg-[#FAFAFA] border border-[#EAEAEA] rounded-full text-xs font-display text-[#000000] hover:border-[#000000] transition-colors shadow-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
