import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiSave, FiImage, FiUploadCloud } from 'react-icons/fi';

interface ServiceItem {
  id: string;
  name: string;
  priceTag: string;
  description: string;
  bgImage: string;
  featuresCount: number;
  isPublished: boolean;
}

const initialServices: ServiceItem[] = [
  {
    id: 'wedding',
    name: 'Wedding Photography',
    priceTag: 'From ₹49,999',
    description: 'Timeless moments captured with cinematic elegance and unparalleled artistry.',
    bgImage: '/images/wedding_photography.jpg',
    featuresCount: 8,
    isPublished: true,
  },
  {
    id: 'pre-wedding',
    name: 'Pre-Wedding Shoots',
    priceTag: 'From ₹24,999',
    description: 'Romantic stories told through artistic vision at breathtaking locations.',
    bgImage: '/images/pre_wedding_service.jpg',
    featuresCount: 7,
    isPublished: true,
  },
  {
    id: 'engagement',
    name: 'Engagement',
    priceTag: 'From ₹19,999',
    description: 'Celebrate your "yes" moment with stunning engagement photography.',
    bgImage: '/images/engagement_service.jpg',
    featuresCount: 6,
    isPublished: true,
  },
  {
    id: 'portrait',
    name: 'Portrait Photography',
    priceTag: 'From ₹14,999',
    description: 'Professional portraits that reveal your authentic self with artistry.',
    bgImage: '/images/hero_slider_1.jpg',
    featuresCount: 5,
    isPublished: true,
  },
  {
    id: 'baby',
    name: 'Baby & Newborn',
    priceTag: 'From ₹9,999',
    description: 'Precious newborn portraits capturing fleeting moments with care.',
    bgImage: '/images/baby_shoot_service.jpg',
    featuresCount: 5,
    isPublished: true,
  },
  {
    id: 'destination',
    name: 'Destination Shoots',
    priceTag: 'From ₹99,999',
    description: 'Breathtaking shoots at iconic destinations around the world.',
    bgImage: '/images/drone_service.jpg',
    featuresCount: 5,
    isPublished: true,
  },
];

const AdminServicesCMSPage = () => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out deleted services (e.g. food, architecture) if present in old saved state
          const cleaned = parsed.filter(
            (item: any) =>
              item.name.toLowerCase() !== 'food photography' &&
              item.name.toLowerCase() !== 'architecture & interior' &&
              item.id !== 'food' &&
              item.id !== 'architecture'
          );
          if (cleaned.length > 0) {
            return cleaned.map((item: any, idx: number) => ({
              ...item,
              bgImage: item.bgImage || initialServices[idx % initialServices.length]?.bgImage || '/images/wedding_photography.jpg',
            }));
          }
        }
      } catch (e) {
        // fallback
      }
    }
    return initialServices;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = (id: string, field: keyof ServiceItem, value: any) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleDelete = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('bobby_studio_cms_services', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      name: 'New Photography Service',
      priceTag: 'From ₹15,000',
      description: 'Comprehensive luxury photography service.',
      bgImage: '/images/hero_new_1.jpg',
      featuresCount: 5,
      isPublished: true,
    };
    setServices([...services, newService]);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('bobby_studio_cms_services', JSON.stringify(services));
    } catch (err) {
      console.warn('LocalStorage error on services');
    }
    window.dispatchEvent(new Event('storage'));
    try {
      await fetch('http://localhost:5000/api/cms/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services }),
      });
    } catch (e) {
      console.warn('Backend API offline, saved services locally');
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Services & Pricing CMS</h1>
          <p className="text-xs text-[#777777] mt-1">
            Configure photography services, starting prices, service summaries, and background cover images.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddService}
            className="px-4 py-2.5 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <FiPlus size={14} /> Add Service
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

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-5 space-y-4">
            {/* Header: Service Name & Price Tag */}
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
              <input
                type="text"
                value={srv.name}
                onChange={(e) => handleUpdate(srv.id, 'name', e.target.value)}
                className="text-sm font-bold text-black bg-transparent border-b border-transparent hover:border-[#CCCCCC] focus:border-black focus:outline-none"
              />
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={srv.priceTag}
                  onChange={(e) => handleUpdate(srv.id, 'priceTag', e.target.value)}
                  className="px-2.5 py-1 bg-[#F5F5F7] rounded-lg text-xs font-bold text-black text-right border border-[#E0E0E4]"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(srv.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Service"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>

            {/* Background Image Preview & Edit Controls */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#888888] uppercase flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <FiImage size={13} /> Service Background Image
                </span>
                <span className="text-[10px] text-[#999999] normal-case">URL or Upload from Laptop</span>
              </label>

              {/* Banner Image Preview */}
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-black group border border-[#EAEAEA]">
                <img
                  src={srv.bgImage || '/images/wedding_photography.jpg'}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById(`service-bg-picker-${srv.id}`)?.click()}
                    className="px-3 py-1.5 bg-white/90 text-black text-xs font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <FiUploadCloud size={14} /> Change Background Image
                  </button>
                </div>
              </div>

              {/* Image Input Controls */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={srv.bgImage}
                  onChange={(e) => handleUpdate(srv.id, 'bgImage', e.target.value)}
                  placeholder="Image URL (e.g. /images/wedding_photography.jpg)"
                  className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-black"
                />
                <input
                  id={`service-bg-picker-${srv.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          handleUpdate(srv.id, 'bgImage', event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById(`service-bg-picker-${srv.id}`)?.click()}
                  className="px-3 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#222222] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                  title="Upload from Laptop"
                >
                  <FiUploadCloud size={14} /> Browse
                </button>
              </div>
            </div>

            {/* Service Summary Text */}
            <div>
              <label className="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Service Summary</label>
              <textarea
                rows={2}
                value={srv.description}
                onChange={(e) => handleUpdate(srv.id, 'description', e.target.value)}
                className="w-full p-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            {/* Footer Options */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#555555]">
                <input
                  type="checkbox"
                  checked={srv.isPublished}
                  onChange={(e) => handleUpdate(srv.id, 'isPublished', e.target.checked)}
                  className="rounded border-[#CCCCCC] text-black focus:ring-black"
                />
                <span>Active in Booking Dropdown</span>
              </label>
              <span className="text-[11px] text-[#888888]">{srv.featuresCount} Deliverables included</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServicesCMSPage;
