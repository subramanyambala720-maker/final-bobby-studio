import { useState } from 'react';
import { FiSave, FiCheck, FiMapPin, FiPhone, FiMail, FiClock, FiExternalLink, FiCompass } from 'react-icons/fi';

interface ContactCMSContent {
  mapTitle: string;
  mapAddress: string;
  googleMapsUrl: string;
  embedIframeUrl: string;
  primaryPhone: string;
  secondaryPhone: string;
  primaryEmail: string;
  secondaryEmail: string;
  studioAddress: string;
  operatingHours: string;
}

const initialContactCMS: ContactCMSContent = {
  mapTitle: 'Studio Location Map',
  mapAddress: 'YVR Luxury Studio Premises, 88WG+92C, X Road, Aziznagar, Telangana 500075',
  googleMapsUrl: 'https://www.google.com/maps/place/Yvr+Luxury+Boys+PG/@17.3459465,78.3224294,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb950009070931:0x2223242406072e9d!8m2!3d17.3459465!4d78.3250043!16s%2Fg%2F11z911pwzd?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D',
  embedIframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.234!2d78.3224294!3d17.3459465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb950009070931%3A0x2223242406072e9d!2sYvr%20Luxury%20Boys%20PG!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  primaryPhone: '+91 99492 16881',
  secondaryPhone: '+91 98765 43210',
  primaryEmail: 'bobbystudioinfo@gmail.com',
  secondaryEmail: 'booking@bobbystudio.in',
  studioAddress: 'Plot 42, Luxury Studio Premises, Jubilee Hills Road No. 36, Hyderabad, Telangana 500033',
  operatingHours: 'Monday - Saturday: 9:00 AM - 8:00 PM',
};

const AdminContactCMSPage = () => {
  const [content, setContent] = useState<ContactCMSContent>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_contact');
    return saved ? JSON.parse(saved) : initialContactCMS;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof ContactCMSContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('bobby_studio_cms_contact', JSON.stringify(content));
    } catch (err) {
      console.warn('LocalStorage limit reached for contact page');
    }
    window.dispatchEvent(new Event('storage'));
    try {
      await fetch('http://localhost:5000/api/cms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
    } catch (err) {
      console.warn('Backend API offline, saved contact CMS locally');
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Contact Us & Map CMS</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage Studio Location Map, Google Maps links, phone numbers, email addresses, and operating hours.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
        >
          {saveSuccess ? <FiCheck size={16} className="text-emerald-400" /> : <FiSave size={16} />}
          <span>{saveSuccess ? 'Changes Published!' : 'Save & Publish Live'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Studio Location Map Section */}
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-black">
                <FiMapPin size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-black">Studio Location Map & Navigation</h3>
                <p className="text-xs text-[#777777]">Interactive Google Maps view targeting studio premises</p>
              </div>
            </div>
            <a
              href={content.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#F5F5F7] hover:bg-[#EAEAEA] text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <FiCompass size={14} /> Open Live Map <FiExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Map Section Title</label>
                <input
                  type="text"
                  value={content.mapTitle}
                  onChange={(e) => handleChange('mapTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Premises Address Subtitle</label>
                <input
                  type="text"
                  value={content.mapAddress}
                  onChange={(e) => handleChange('mapAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Google Maps Link URL</label>
                <input
                  type="text"
                  value={content.googleMapsUrl}
                  onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Google Maps Embed Iframe URL</label>
                <input
                  type="text"
                  value={content.embedIframeUrl}
                  onChange={(e) => handleChange('embedIframeUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Live Interactive Map Card Preview */}
            <div className="bg-[#F8F9FA] rounded-2xl border border-[#EAEAEA] p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-black text-sm">{content.mapTitle}</h4>
                  <p className="text-[11px] text-[#666666]">{content.mapAddress}</p>
                </div>
                <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  Live Preview
                </span>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#E0E0E4] bg-neutral-200">
                <iframe
                  title="Studio Location Live Preview"
                  src={content.embedIframeUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info & Details */}
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-black border-b border-[#EAEAEA] pb-3 flex items-center gap-2">
            <FiPhone className="text-black" size={18} /> Contact Phone & Email Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Primary Phone</label>
              <input
                type="text"
                value={content.primaryPhone}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Secondary Phone</label>
              <input
                type="text"
                value={content.secondaryPhone}
                onChange={(e) => handleChange('secondaryPhone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Primary Email</label>
              <input
                type="email"
                value={content.primaryEmail}
                onChange={(e) => handleChange('primaryEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Secondary Email</label>
              <input
                type="email"
                value={content.secondaryEmail}
                onChange={(e) => handleChange('secondaryEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Studio Operating Hours</label>
              <input
                type="text"
                value={content.operatingHours}
                onChange={(e) => handleChange('operatingHours', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Full Studio Address</label>
              <input
                type="text"
                value={content.studioAddress}
                onChange={(e) => handleChange('studioAddress', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminContactCMSPage;
