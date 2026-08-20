import { useState } from 'react';
import { FiSave, FiCheck, FiInfo, FiAward, FiUsers, FiPlus, FiTrash2, FiStar } from 'react-icons/fi';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  awards: number;
}

interface AboutContent {
  headline: string;
  story: string;
  yearsExperience: string;
  weddingsCaptured: string;
  awardsWon: string;
  clientSatisfaction: string;
  missionStatement: string;
}

const initialTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Bobby Sharma',
    role: 'Founder & Lead Photographer',
    bio: 'With 12+ years of experience, Bobby has captured over 2,500 weddings and won 50+ international awards. His vision defines the Bobby Studio aesthetic.',
    specialties: ['Wedding', 'Portrait', 'Fashion'],
    awards: 15,
  },
  {
    id: '2',
    name: 'Priya Kapoor',
    role: 'Creative Director',
    bio: 'Priya brings 8 years of art direction experience from top agencies. She crafts the visual narrative that makes every Bobby Studio project unique.',
    specialties: ['Art Direction', 'Branding', 'Editorial'],
    awards: 8,
  },
  {
    id: '3',
    name: 'Arjun Mehta',
    role: 'Senior Cinematographer',
    bio: 'A filmmaker at heart, Arjun creates cinematic wedding films that rival Hollywood productions. His drone work is legendary.',
    specialties: ['Cinematography', 'Drone', 'Film'],
    awards: 12,
  },
];

const initialAbout: AboutContent = {
  headline: 'Crafting Timeless Visual Masterpieces Since 2012',
  story: 'Bobby Studio was founded with a single passion: turning life\'s most magical moments into high-art cinematic photography. Based in Hyderabad, we travel across India and internationally to capture luxury weddings, intimate pre-wedding shoots, and high-fashion editorial sessions.',
  yearsExperience: '12+',
  weddingsCaptured: '500+',
  awardsWon: '25+',
  clientSatisfaction: '100%',
  missionStatement: 'We believe photography is not merely documenting events, but preserving raw emotion, luxury aesthetics, and eternal memories.',
};

const AdminAboutCMSPage = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'narrative' | 'stats'>('team');

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_about_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [content, setContent] = useState<AboutContent>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_about');
    return saved ? JSON.parse(saved) : initialAbout;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('bobby_studio_cms_about', JSON.stringify(content));
      localStorage.setItem('bobby_studio_cms_about_team', JSON.stringify(team));
    } catch (err) {
      console.warn('LocalStorage limit reached for about page');
    }
    window.dispatchEvent(new Event('storage'));
    try {
      await fetch('http://localhost:5000/api/cms/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, team }),
      });
    } catch (err) {
      console.warn('Backend API offline, saved about CMS locally');
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">About Us Page CMS</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage Meet Our Creative Team, studio story narrative, and milestone statistics on the About Us page.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
        >
          {saveSuccess ? <FiCheck size={16} className="text-emerald-400" /> : <FiSave size={16} />}
          <span>{saveSuccess ? 'Changes Published!' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-2 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'team', label: '1. Meet Our Creative Team', icon: FiUsers },
          { id: 'narrative', label: '2. Story Narrative', icon: FiInfo },
          { id: 'stats', label: '3. Milestone Statistics', icon: FiAward },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
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

      {/* TAB 1: CREATIVE TEAM */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Meet Our Creative Team</h3>
            <button
              onClick={() => {
                const newMember: TeamMember = {
                  id: Date.now().toString(),
                  name: 'New Creative Artist',
                  role: 'Senior Photographer / Editor',
                  bio: 'Expert artist bringing creativity and technical perfection to every shoot.',
                  specialties: ['Wedding', 'Portrait'],
                  awards: 5,
                };
                setTeam([...team, newMember]);
              }}
              className="px-3.5 py-2 bg-white border border-[#EAEAEA] text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F7] flex items-center gap-1.5"
            >
              <FiPlus size={14} /> Add Team Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-5 space-y-4 shadow-xs relative">
                <div className="flex justify-between items-start border-b border-[#EAEAEA] pb-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm">
                    {m.name.charAt(0)}
                  </div>
                  <button
                    onClick={() => setTeam(team.filter((item) => item.id !== m.id))}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-black mb-1">Full Name</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => setTeam(team.map((t) => (t.id === m.id ? { ...t, name: e.target.value } : t)))}
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Role Title</label>
                    <input
                      type="text"
                      value={m.role}
                      onChange={(e) => setTeam(team.map((t) => (t.id === m.id ? { ...t, role: e.target.value } : t)))}
                      className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black uppercase tracking-wider font-semibold text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-1">Biography Description</label>
                    <textarea
                      rows={3}
                      value={m.bio}
                      onChange={(e) => setTeam(team.map((t) => (t.id === m.id ? { ...t, bio: e.target.value } : t)))}
                      className="w-full p-3 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STORY NARRATIVE */}
      {activeTab === 'narrative' && (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-black border-b border-[#EAEAEA] pb-3">Studio Narrative & Story</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Main Headline</label>
              <input
                type="text"
                value={content.headline}
                onChange={(e) => setContent({ ...content, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-sm font-bold text-black"
              />
            </div>
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Our Story Narrative</label>
              <textarea
                rows={4}
                value={content.story}
                onChange={(e) => setContent({ ...content, story: e.target.value })}
                className="w-full p-3 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs text-black leading-relaxed resize-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Mission Statement</label>
              <textarea
                rows={2}
                value={content.missionStatement}
                onChange={(e) => setContent({ ...content, missionStatement: e.target.value })}
                className="w-full p-3 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs text-black leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MILESTONE STATS */}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-black border-b border-[#EAEAEA] pb-3">Milestone Statistics Counter</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Years Experience</label>
              <input
                type="text"
                value={content.yearsExperience}
                onChange={(e) => setContent({ ...content, yearsExperience: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Weddings Captured</label>
              <input
                type="text"
                value={content.weddingsCaptured}
                onChange={(e) => setContent({ ...content, weddingsCaptured: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Awards Won</label>
              <input
                type="text"
                value={content.awardsWon}
                onChange={(e) => setContent({ ...content, awardsWon: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-black mb-1.5 uppercase tracking-wider">Client Satisfaction</label>
              <input
                type="text"
                value={content.clientSatisfaction}
                onChange={(e) => setContent({ ...content, clientSatisfaction: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAboutCMSPage;
