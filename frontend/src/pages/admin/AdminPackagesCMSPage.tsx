import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiSave, FiStar } from 'react-icons/fi';

interface PackageItem {
  id: string;
  category: 'Wedding' | 'Portrait' | 'Commercial';
  name: string;
  tier: string;
  price: number;
  originalPrice?: number;
  badge: string;
  description: string;
  features: string[];
  isPopular: boolean;
  isPublished: boolean;
}

const initialPackages: PackageItem[] = [
  // Wedding Category
  {
    id: 'w1',
    category: 'Wedding',
    name: 'Silver Package',
    tier: 'Essential',
    price: 49999,
    originalPrice: 59999,
    badge: 'ESSENTIAL WEDDING',
    description: 'Perfect for intimate weddings and small celebrations.',
    features: [
      'Half Day Coverage (6 Hours)',
      'One Lead Photographer',
      '300+ Edited Photos',
      'Digital Download Delivery',
      'Online Digital Gallery',
    ],
    isPopular: false,
    isPublished: true,
  },
  {
    id: 'w2',
    category: 'Wedding',
    name: 'Gold Package',
    tier: 'Premium',
    price: 99999,
    originalPrice: 129999,
    badge: 'MOST POPULAR',
    description: 'Our most popular package for grand celebrations.',
    features: [
      'Full Day Coverage (12 Hours)',
      'Two Photographers',
      '500+ Edited Photos',
      'Digital + USB Delivery',
      'Online Private Gallery',
      '4K Aerial Drone Coverage',
      'Cinematic Highlight Film',
      'Premium Album (40 Pages)',
    ],
    isPopular: true,
    isPublished: true,
  },
  {
    id: 'w3',
    category: 'Wedding',
    name: 'Diamond Package',
    tier: 'Luxury',
    price: 199999,
    badge: 'LUXURY CINEMA',
    description: 'The ultimate luxury wedding photography experience.',
    features: [
      'Multi-Day Event Coverage',
      'Three Master Photographers',
      '1000+ Edited Photos',
      'Digital + USB + Cloud Delivery',
      'Private Online Cloud Gallery',
      'Premium 4K Drone Coverage',
      'Full Cinematic Film (15min)',
      'Luxury Italian Album (60 Pages)',
      'Same-Day Teaser Edit',
      'Second Day Coverage Included',
    ],
    isPopular: false,
    isPublished: true,
  },

  // Portrait Category
  {
    id: 'p1',
    category: 'Portrait',
    name: 'Basic Portrait',
    tier: 'Starter',
    price: 9999,
    badge: 'STARTER PORTRAIT',
    description: 'Quick professional portrait session for headshots and personal branding.',
    features: [
      '1 Hour Session',
      'One Studio / Outdoor Location',
      '20 High-Res Edited Photos',
      'Digital Cloud Delivery',
      'Basic Skin Retouching',
    ],
    isPopular: false,
    isPublished: true,
  },
  {
    id: 'p2',
    category: 'Portrait',
    name: 'Pro Portrait',
    tier: 'Professional',
    price: 24999,
    badge: 'MOST POPULAR',
    description: 'Comprehensive portrait experience for individuals and families.',
    features: [
      '3 Hour Session',
      'Two Outdoor Locations',
      '50 Edited Photos',
      'Digital + High-Res Print Files',
      'Advanced Retouching',
      'Up to 3 Outfit Changes',
      'Hair & Makeup Consultation',
    ],
    isPopular: true,
    isPublished: true,
  },
  {
    id: 'p3',
    category: 'Portrait',
    name: 'Elite Portrait',
    tier: 'Premium',
    price: 49999,
    badge: 'PERSONAL BRANDING',
    description: 'The ultimate personal branding & luxury portrait package.',
    features: [
      'Full Day Session',
      'Multiple Outdoor & Studio Locations',
      '100+ Edited Photos',
      'Digital + Print + Canvas',
      'Magazine Beauty Retouching',
      'Unlimited Outfit Changes',
      'Professional Hair & Makeup Artist',
      'Framed Prints (5)',
    ],
    isPopular: false,
    isPublished: true,
  },

  // Commercial Category
  {
    id: 'c1',
    category: 'Commercial',
    name: 'Starter Commercial',
    tier: 'Basic',
    price: 14999,
    badge: 'BASIC COMMERCIAL',
    description: 'Essential commercial product photography package.',
    features: [
      'Half Day Studio Shoot',
      '20 Product Images',
      'White Studio Background',
      'Basic Color Correction & Retouching',
      'E-commerce Ready Aspect Ratios',
    ],
    isPopular: false,
    isPublished: true,
  },
  {
    id: 'c2',
    category: 'Commercial',
    name: 'Business Commercial',
    tier: 'Professional',
    price: 39999,
    badge: 'MOST POPULAR',
    description: 'Complete commercial photography for growing brands.',
    features: [
      'Full Day Shoot',
      '50 Product Images',
      'White + Custom Lifestyle Props',
      'Advanced Commercial Retouching',
      'E-commerce + Social Media Ready',
      'Lifestyle & Flat Lay Shots',
      'Includes 1 Professional Model',
    ],
    isPopular: true,
    isPublished: true,
  },
  {
    id: 'c3',
    category: 'Commercial',
    name: 'Enterprise Commercial',
    tier: 'Premium',
    price: 99999,
    badge: 'FULL CAMPAIGN',
    description: 'Full-scale commercial production for premium brands.',
    features: [
      'Multi-Day Studio & Location Production',
      'Unlimited Product Images',
      'All Styling & Prop Settings',
      'Magazine Quality Retouching',
      'All Platform Commercial Rights',
      'Full Lifestyle Brand Campaign',
      'Models (2+ Included)',
      '4K Short Commercial Video Film',
    ],
    isPopular: false,
    isPublished: true,
  },
];

const AdminPackagesCMSPage = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Wedding' | 'Portrait' | 'Commercial'>('All');
  const [packages, setPackages] = useState<PackageItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_packages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 9) {
          return parsed;
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge missing initial packages if saved state has fewer than 9
          const existingIds = new Set(parsed.map((p: any) => p.id));
          const missing = initialPackages.filter((p) => !existingIds.has(p.id));
          const merged = [...parsed, ...missing];
          localStorage.setItem('bobby_studio_cms_packages', JSON.stringify(merged));
          return merged;
        }
      } catch (e) {
        // fallback
      }
    }
    localStorage.setItem('bobby_studio_cms_packages', JSON.stringify(initialPackages));
    return initialPackages;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = (id: string, field: keyof PackageItem, value: any) => {
    setPackages(packages.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleDelete = (id: string) => {
    const updated = packages.filter((p) => p.id !== id);
    setPackages(updated);
    localStorage.setItem('bobby_studio_cms_packages', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddFeature = (pkgId: string) => {
    setPackages(
      packages.map((p) => (p.id === pkgId ? { ...p, features: [...p.features, 'New Deliverable Feature'] } : p))
    );
  };

  const handleDeleteFeature = (pkgId: string, featureIdx: number) => {
    setPackages(
      packages.map((p) =>
        p.id === pkgId ? { ...p, features: p.features.filter((_, idx) => idx !== featureIdx) } : p
      )
    );
  };

  const handleAddPackage = () => {
    const newPkg: PackageItem = {
      id: Date.now().toString(),
      category: activeCategory === 'All' ? 'Wedding' : activeCategory,
      name: 'New Photography Package',
      tier: 'Custom',
      price: 29999,
      badge: 'NEW PACKAGE',
      description: 'Comprehensive luxury package features.',
      features: ['Full Event Coverage', 'Edited High-Res Photos', 'Digital Cloud Access'],
      isPopular: false,
      isPublished: true,
    };
    setPackages([...packages, newPkg]);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('bobby_studio_cms_packages', JSON.stringify(packages));
    } catch (err) {
      console.warn('LocalStorage error on packages');
    }
    window.dispatchEvent(new Event('storage'));
    try {
      await fetch('http://localhost:5000/api/cms/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages }),
      });
    } catch (e) {
      console.warn('Backend API offline, saved packages locally');
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const filteredPackages = activeCategory === 'All'
    ? packages
    : packages.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Packages & Pricing Tiers CMS</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage pricing tiers across Wedding, Portrait, and Commercial categories, itemized deliverables, and popular badges.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-4 py-2.5 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <FiPlus size={14} /> Add Package Tier
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            {saveSuccess ? <FiCheck size={16} className="text-emerald-400" /> : <FiSave size={16} />}
            <span>{saveSuccess ? 'Changes Published!' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-2 flex items-center gap-2 overflow-x-auto">
        {(['All', 'Wedding', 'Portrait', 'Commercial'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat ? 'bg-black text-white shadow-sm' : 'bg-transparent text-[#666666] hover:bg-[#F5F5F7]'
            }`}
          >
            {cat} Packages ({cat === 'All' ? packages.length : packages.filter((p) => p.category === cat).length})
          </button>
        ))}
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-2xl border p-6 space-y-5 flex flex-col justify-between relative shadow-sm ${
              pkg.isPopular ? 'border-black ring-2 ring-black/10' : 'border-[#EAEAEA]'
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute -top-3 right-6 px-3 py-1 bg-black text-white text-[9px] font-bold tracking-widest uppercase rounded-full shadow-sm flex items-center gap-1">
                <FiStar size={11} className="text-amber-400" /> Most Popular
              </span>
            )}

            <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <select
                  value={pkg.category}
                  onChange={(e) => handleUpdate(pkg.id, 'category', e.target.value as any)}
                  className="text-[10px] font-bold text-black uppercase tracking-wider bg-[#F5F5F7] px-2.5 py-1 rounded-lg border border-[#E0E0E4] cursor-pointer"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <input
                  type="text"
                  value={pkg.badge}
                  onChange={(e) => handleUpdate(pkg.id, 'badge', e.target.value)}
                  className="text-[10px] font-bold text-[#777777] uppercase tracking-widest bg-transparent text-right"
                />
              </div>

              {/* Title & Tier */}
              <div>
                <input
                  type="text"
                  value={pkg.name}
                  onChange={(e) => handleUpdate(pkg.id, 'name', e.target.value)}
                  className="text-base font-bold text-black bg-transparent border-b border-transparent hover:border-[#CCCCCC] focus:border-black focus:outline-none w-full"
                />
                <input
                  type="text"
                  value={pkg.tier}
                  placeholder="Tier Name (e.g. Essential)"
                  onChange={(e) => handleUpdate(pkg.id, 'tier', e.target.value)}
                  className="text-xs text-[#777777] font-medium bg-transparent mt-0.5 w-full focus:outline-none"
                />
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-black">₹</span>
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => handleUpdate(pkg.id, 'price', Number(e.target.value))}
                  className="text-2xl font-bold text-black bg-transparent w-full focus:outline-none font-display"
                />
              </div>

              {/* Summary Description */}
              <div>
                <label className="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Summary Description</label>
                <textarea
                  rows={2}
                  value={pkg.description}
                  onChange={(e) => handleUpdate(pkg.id, 'description', e.target.value)}
                  className="w-full p-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs text-[#555555] focus:outline-none focus:border-black"
                />
              </div>

              {/* Deliverables List */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-[#888888] uppercase">Deliverables List</label>
                  <button
                    type="button"
                    onClick={() => handleAddFeature(pkg.id)}
                    className="text-[10px] font-bold text-black hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    <FiPlus size={12} /> Add Feature
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 group">
                      <FiCheck size={14} className="text-emerald-600 flex-shrink-0" />
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const newFeats = [...pkg.features];
                          newFeats[fIdx] = e.target.value;
                          handleUpdate(pkg.id, 'features', newFeats);
                        }}
                        className="w-full text-xs text-black bg-transparent border-b border-transparent hover:border-[#CCCCCC] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(pkg.id, fIdx)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                        title="Remove feature"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Options */}
            <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#555555]">
                <input
                  type="checkbox"
                  checked={pkg.isPopular}
                  onChange={(e) => handleUpdate(pkg.id, 'isPopular', e.target.checked)}
                  className="rounded border-[#CCCCCC] text-black focus:ring-black"
                />
                <span>Most Popular</span>
              </label>
              <button
                type="button"
                onClick={() => handleDelete(pkg.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Package"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPackagesCMSPage;
