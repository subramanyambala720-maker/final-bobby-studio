import { useState } from 'react';
import { FiSave, FiCheck, FiGlobe, FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';

const AdminSettingsPage = () => {
  const [siteName, setSiteName] = useState(() => localStorage.getItem('bobby_studio_siteName') || 'Bobby Studio');
  const [phone, setPhone] = useState(() => localStorage.getItem('bobby_studio_phone') || '+91 9949216881');
  const [whatsapp, setWhatsapp] = useState(() => localStorage.getItem('bobby_studio_whatsapp') || '919949216881');
  const [email, setEmail] = useState(() => localStorage.getItem('bobby_studio_email') || 'subramanyambala720@gmail.com');
  const [address, setAddress] = useState(() => localStorage.getItem('bobby_studio_address') || 'Bobby Studio, YVR Luxury Location, Hyderabad, Telangana, India');
  const [instagram, setInstagram] = useState(() => localStorage.getItem('bobby_studio_instagram') || 'https://instagram.com/bobbyyyy.x_');
  const [facebook, setFacebook] = useState(() => localStorage.getItem('bobby_studio_facebook') || 'https://facebook.com/bobbystudio');
  const [youtube, setYoutube] = useState(() => localStorage.getItem('bobby_studio_youtube') || 'https://youtube.com/@bobbystudio');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const settingsObj = { siteName, phone, whatsapp, email, address, instagram, facebook, youtube };
    localStorage.setItem('bobby_studio_settings', JSON.stringify(settingsObj));
    localStorage.setItem('bobby_studio_siteName', siteName);
    localStorage.setItem('bobby_studio_phone', phone);
    localStorage.setItem('bobby_studio_email', email);

    try {
      await fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsObj),
      });
    } catch (err) {
      console.warn('Backend API offline, saved settings locally');
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Website & Studio Settings</h1>
          <p className="text-xs text-[#777777] mt-1">
            Global business contact info, phone numbers, studio address, maps & social media connections.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2"
        >
          {saveSuccess ? <FiCheck size={16} className="text-emerald-400" /> : <FiSave size={16} />}
          <span>{saveSuccess ? 'Settings Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Studio General Details */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-black border-b border-[#EAEAEA] pb-3">Studio Identity & Contact</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-black mb-1 uppercase tracking-wider">Studio Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1 uppercase tracking-wider">Official Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-black mb-1 uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-black mb-1 uppercase tracking-wider">WhatsApp Number</label>
              <div className="relative">
                <FiGlobe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                />
              </div>
            </div>
          </div>

          <div className="text-xs pt-2">
            <label className="block font-semibold text-black mb-1 uppercase tracking-wider">Physical Studio Address</label>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-3 text-[#888888]" size={15} />
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-black border-b border-[#EAEAEA] pb-3">Social Media Integrations</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-black mb-1 flex items-center gap-1.5">
                <FiInstagram size={14} className="text-pink-600" /> Instagram Handle
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1 flex items-center gap-1.5">
                <FiFacebook size={14} className="text-blue-600" /> Facebook Page
              </label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-1 flex items-center gap-1.5">
                <FiYoutube size={14} className="text-red-600" /> YouTube Channel
              </label>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
