import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiArrowRight, FiStar } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import FloatingCard from '@/components/animations/FloatingCard';
import Button from '@/components/ui/Button';

const packageCategories = ['Wedding', 'Portrait', 'Commercial'];

const packages: Record<string, Array<{
  name: string; tier: string; price: string; originalPrice?: string;
  description: string; popular?: boolean; features: Array<{ name: string; included: boolean }>;
}>> = {
  Wedding: [
    {
      name: 'Silver', tier: 'Essential', price: '₹49,999', originalPrice: '₹59,999',
      description: 'Perfect for intimate weddings and small celebrations.',
      features: [
        { name: 'Half Day Coverage (6 Hours)', included: true },
        { name: 'One Photographer', included: true },
        { name: '300+ Edited Photos', included: true },
        { name: 'Digital Delivery', included: true },
        { name: 'Online Gallery', included: true },
        { name: 'Drone Coverage', included: false },
        { name: 'Cinematic Film', included: false },
        { name: 'Premium Album', included: false },
        { name: 'Same-Day Edit', included: false },
        { name: 'Second Day Coverage', included: false },
      ],
    },
    {
      name: 'Gold', tier: 'Premium', price: '₹99,999', originalPrice: '₹1,29,999',
      description: 'Our most popular package for grand celebrations.', popular: true,
      features: [
        { name: 'Full Day Coverage (12 Hours)', included: true },
        { name: 'Two Photographers', included: true },
        { name: '500+ Edited Photos', included: true },
        { name: 'Digital + USB Delivery', included: true },
        { name: 'Online Gallery', included: true },
        { name: 'Drone Coverage', included: true },
        { name: 'Cinematic Highlight Film', included: true },
        { name: 'Premium Album (40 Pages)', included: true },
        { name: 'Same-Day Edit', included: false },
        { name: 'Second Day Coverage', included: false },
      ],
    },
    {
      name: 'Diamond', tier: 'Luxury', price: '₹1,99,999',
      description: 'The ultimate luxury wedding photography experience.',
      features: [
        { name: 'Multi-Day Coverage', included: true },
        { name: 'Three Photographers', included: true },
        { name: '1000+ Edited Photos', included: true },
        { name: 'Digital + USB + Cloud', included: true },
        { name: 'Private Online Gallery', included: true },
        { name: 'Premium Drone Coverage', included: true },
        { name: 'Full Cinematic Film (15min)', included: true },
        { name: 'Luxury Italian Album (60 Pages)', included: true },
        { name: 'Same-Day Edit', included: true },
        { name: 'Second Day Coverage', included: true },
      ],
    },
  ],
  Portrait: [
    {
      name: 'Basic', tier: 'Starter', price: '₹9,999',
      description: 'Quick professional portrait session.',
      features: [
        { name: '1 Hour Session', included: true },
        { name: 'One Location', included: true },
        { name: '20 Edited Photos', included: true },
        { name: 'Digital Delivery', included: true },
        { name: 'Basic Retouching', included: true },
        { name: 'Multiple Outfits', included: false },
        { name: 'Hair & Makeup', included: false },
        { name: 'Printed Photos', included: false },
      ],
    },
    {
      name: 'Pro', tier: 'Professional', price: '₹24,999', popular: true,
      description: 'Comprehensive portrait experience for individuals and families.',
      features: [
        { name: '3 Hour Session', included: true },
        { name: 'Two Locations', included: true },
        { name: '50 Edited Photos', included: true },
        { name: 'Digital + Print', included: true },
        { name: 'Advanced Retouching', included: true },
        { name: 'Multiple Outfits', included: true },
        { name: 'Hair & Makeup Consultation', included: true },
        { name: 'Framed Prints (3)', included: false },
      ],
    },
    {
      name: 'Elite', tier: 'Premium', price: '₹49,999',
      description: 'The ultimate personal branding & portrait package.',
      features: [
        { name: 'Full Day Session', included: true },
        { name: 'Multiple Locations', included: true },
        { name: '100+ Edited Photos', included: true },
        { name: 'Digital + Print + Canvas', included: true },
        { name: 'Magazine Retouching', included: true },
        { name: 'Unlimited Outfits', included: true },
        { name: 'Professional Hair & Makeup', included: true },
        { name: 'Framed Prints (5)', included: true },
      ],
    },
  ],
  Commercial: [
    {
      name: 'Starter', tier: 'Basic', price: '₹14,999',
      description: 'Essential commercial photography package.',
      features: [
        { name: 'Half Day Shoot', included: true },
        { name: '20 Product Images', included: true },
        { name: 'White Background', included: true },
        { name: 'Basic Retouching', included: true },
        { name: 'E-commerce Ready', included: true },
        { name: 'Lifestyle Shots', included: false },
        { name: 'Model', included: false },
        { name: 'Video Content', included: false },
      ],
    },
    {
      name: 'Business', tier: 'Professional', price: '₹39,999', popular: true,
      description: 'Complete commercial photography for growing brands.',
      features: [
        { name: 'Full Day Shoot', included: true },
        { name: '50 Product Images', included: true },
        { name: 'White + Lifestyle', included: true },
        { name: 'Advanced Retouching', included: true },
        { name: 'E-commerce + Social', included: true },
        { name: 'Lifestyle Shots', included: true },
        { name: 'Model (1)', included: true },
        { name: 'Short Video Reel', included: false },
      ],
    },
    {
      name: 'Enterprise', tier: 'Premium', price: '₹99,999',
      description: 'Full-scale commercial production for premium brands.',
      features: [
        { name: 'Multi-Day Production', included: true },
        { name: 'Unlimited Product Images', included: true },
        { name: 'All Styles & Settings', included: true },
        { name: 'Magazine Retouching', included: true },
        { name: 'All Platforms', included: true },
        { name: 'Full Lifestyle Campaign', included: true },
        { name: 'Models (2+)', included: true },
        { name: 'Video Campaign', included: true },
      ],
    },
  ],
};

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState('Wedding');

  const currentPackages = (() => {
    const saved = localStorage.getItem('bobby_studio_cms_packages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const categoryCms = parsed.filter(
          (item: any) => item.category?.toLowerCase() === activeCategory.toLowerCase() && item.isPublished !== false
        );
        if (categoryCms.length > 0) {
          return categoryCms.map((item: any) => ({
            name: item.name,
            tier: item.tier || item.badge || 'Package',
            price: typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price,
            originalPrice: item.originalPrice ? `₹${Number(item.originalPrice).toLocaleString('en-IN')}` : undefined,
            description: item.description,
            popular: item.isPopular,
            features: (item.features || []).map((featName: string) => ({
              name: featName,
              included: true,
            })),
          }));
        }
      } catch (e) {}
    }
    return packages[activeCategory] || [];
  })();

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
            <h1 className="text-hero font-luxury text-text mb-4">
              Our <span className="text-gradient-gold italic">Packages</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              Transparent pricing with premium value. Choose the package that fits
              your vision and budget perfectly.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-12">
        <div className="container-premium">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {packageCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 rounded-full text-sm font-display font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-md transform hover:-translate-y-0.5 active:translate-y-0 ${
                      isActive
                        ? 'bg-black text-white ring-2 ring-[#D4B896] shadow-xl scale-105'
                        : 'bg-white/90 text-black border border-[#EAEAEA] hover:bg-[#D4B896] hover:text-black hover:border-[#D4B896]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding !pt-0">
        <div className="container-premium">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {currentPackages.map((pkg: any, i: number) => (
              <FadeIn key={pkg.name + activeCategory} delay={i * 0.1}>
                <FloatingCard intensity={3}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 bg-white border border-[#EAEAEA] hover:border-black/50 hover:shadow-xl"
                  >
                    <div className="p-8">
                      {/* Header */}
                      <div className="mb-6">
                        <p className="text-xs tracking-[0.2em] uppercase font-display font-bold text-[#888888]">{pkg.tier}</p>
                        <h3 className="text-2xl font-luxury text-black mt-1 font-bold">{pkg.name}</h3>
                        <p className="text-[#555555] text-sm mt-2 leading-relaxed">{pkg.description}</p>
                      </div>

                      {/* Price */}
                      <div className="mb-6 pb-6 border-b border-[#EAEAEA]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-display font-bold text-black">{pkg.price}</span>
                        </div>
                        {pkg.originalPrice && (
                          <span className="text-sm text-[#888888] line-through">{pkg.originalPrice}</span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {pkg.features.map((f: any) => (
                          <div key={f.name} className="flex items-center gap-3 text-sm">
                            {f.included ? (
                              <FiCheck className="text-black flex-shrink-0" size={16} />
                            ) : (
                              <FiX className="text-[#CCCCCC] flex-shrink-0" size={16} />
                            )}
                            <span className={f.included ? 'text-black font-medium' : 'text-[#999999] line-through'}>{f.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        to="/book"
                        state={{ selectedService: activeCategory, packageChoice: pkg.name }}
                        className="block"
                      >
                        <Button
                          variant="secondary"
                          fullWidth
                          icon={<FiArrowRight />}
                        >
                          Choose {pkg.name}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </FloatingCard>
              </FadeIn>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="section-padding">
        <div className="container-premium text-center">
          <FadeIn>
            <div className="p-12 glass rounded-3xl border-glow-gold">
              <h2 className="text-title font-luxury text-text mb-3">
                Need a <span className="text-gradient-gold italic">Custom Package?</span>
              </h2>
              <p className="text-muted max-w-md mx-auto mb-6">
                Every project is unique. Let us craft a bespoke package that perfectly
                matches your requirements and budget.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="lg">Request Custom Quote</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
};

export default PackagesPage;
