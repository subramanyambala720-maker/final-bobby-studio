import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit, FiStar, FiUploadCloud, FiSearch } from 'react-icons/fi';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  clientName: string;
  eventDate: string;
  coverImage: string;
  isFeatured: boolean;
  isPublished: boolean;
}

const initialProjects: PortfolioItem[] = [
  { id: '101', title: 'Little Krishna Celebration', category: 'baby', clientName: 'Krishna Family', eventDate: '2026-08-01', coverImage: '/images/gallery_baby_krishna.jpg', isFeatured: true, isPublished: true },
  { id: '102', title: 'Mehndi & Ring Ceremony', category: 'pre-wedding', clientName: 'Sanjana & Kunal', eventDate: '2026-07-28', coverImage: '/images/gallery_mehndi_rings.jpg', isFeatured: true, isPublished: true },
  { id: '103', title: 'Royal Varmala Walk', category: 'wedding', clientName: 'Aarav & Roshni', eventDate: '2026-07-15', coverImage: '/images/gallery_royal_wedding_couple.jpg', isFeatured: true, isPublished: true },
  { id: '104', title: 'Eternal Vows & Flowers', category: 'wedding', clientName: 'Vikram & Diya', eventDate: '2026-06-20', coverImage: '/images/gallery_south_wedding_garlands.jpg', isFeatured: true, isPublished: true },
  { id: '105', title: 'Luxury Drive Portrait', category: 'portrait', clientName: 'Siddharth Oberoi', eventDate: '2026-06-10', coverImage: '/images/gallery_car_portrait.jpg', isFeatured: true, isPublished: true },
  { id: '1', title: 'The Royal Udaipur Palace Wedding', category: 'wedding', clientName: 'Aarav & Meera', eventDate: '2025-11-20', coverImage: '/images/hero_new_1.jpg', isFeatured: true, isPublished: true },
  { id: '2', title: 'Golden Hour Pre-Wedding Romance', category: 'pre-wedding', clientName: 'Deepika & Rohan', eventDate: '2025-12-05', coverImage: '/images/hero_new_2.jpg', isFeatured: true, isPublished: true },
  { id: '3', title: 'Luxury Moody Portrait', category: 'portrait', clientName: 'Dr. Ananya Reddy', eventDate: '2026-01-14', coverImage: '/images/hero_new_3.jpg', isFeatured: true, isPublished: true },
  { id: '4', title: 'High-Fashion Editorial Collection', category: 'fashion', clientName: 'Vogue India Cover', eventDate: '2026-02-10', coverImage: '/images/hero_new_4.jpg', isFeatured: true, isPublished: true },
  { id: '5', title: 'Cinematic Aerial Drone Coverage', category: 'drone', clientName: 'Taj Falaknuma Event', eventDate: '2026-03-02', coverImage: '/images/new_anim_wedding_family.jpg', isFeatured: true, isPublished: true },
  { id: '6', title: 'Diamond Jewellery Macro Shoot', category: 'product', clientName: 'Tanishq Luxury', eventDate: '2026-03-15', coverImage: '/images/gallery_mehndi_rings.jpg', isFeatured: false, isPublished: true },
  { id: '7', title: 'Newborn Serenity Portrait', category: 'baby', clientName: 'Sneha & Dev', eventDate: '2026-04-01', coverImage: '/images/gallery_baby_krishna.jpg', isFeatured: false, isPublished: true },
  { id: '8', title: 'Goa Beach Sunset Romance', category: 'pre-wedding', clientName: 'Rohan & Dia', eventDate: '2026-04-18', coverImage: '/images/hero_new_2.jpg', isFeatured: true, isPublished: true },
  { id: '10', title: 'Bridal Couture Collection', category: 'fashion', clientName: 'Sabyasachi Heritage', eventDate: '2026-05-05', coverImage: '/images/gallery_royal_wedding_couple.jpg', isFeatured: true, isPublished: true },
  { id: '11', title: 'Jaipur Heritage Palace Wedding', category: 'wedding', clientName: 'Kabir & Ananya', eventDate: '2026-05-20', coverImage: '/images/gallery_south_wedding_garlands.jpg', isFeatured: true, isPublished: true },
  { id: '14', title: 'Monochrome Dramatic Portrait', category: 'portrait', clientName: 'Karan Malhotra', eventDate: '2026-06-01', coverImage: '/images/gallery_car_portrait.jpg', isFeatured: false, isPublished: true },
  { id: '16', title: 'Kerala Backwaters Wedding', category: 'wedding', clientName: 'Arjun & Parvathy', eventDate: '2026-06-25', coverImage: '/images/gallery_south_wedding_garlands.jpg', isFeatured: true, isPublished: true },
  { id: '17', title: 'Urban Streetwear Editorial', category: 'fashion', clientName: 'Zara India', eventDate: '2026-07-02', coverImage: '/images/gallery_car_portrait.jpg', isFeatured: false, isPublished: true },
  { id: '18', title: 'Warm Family Sunset Portraits', category: 'portrait', clientName: 'Kapoor Family', eventDate: '2026-07-18', coverImage: '/images/new_anim_wedding_family.jpg', isFeatured: true, isPublished: true },
];

const AdminPortfolioCMSPage = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_cms_portfolio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialProjects;
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('wedding');
  const [newClient, setNewClient] = useState('');
  const [newDate, setNewDate] = useState('2026-08-01');
  const [newCover, setNewCover] = useState('/images/hero_new_1.jpg');

  // Edit Form State
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('wedding');
  const [editClient, setEditClient] = useState('');
  const [editDate, setEditDate] = useState('2026-08-01');
  const [editCover, setEditCover] = useState('/images/hero_new_1.jpg');

  const handleStartEdit = (proj: PortfolioItem) => {
    setEditingProject(proj);
    setEditTitle(proj.title);
    setEditCategory(proj.category);
    setEditClient(proj.clientName);
    setEditDate(proj.eventDate);
    setEditCover(proj.coverImage);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = projects.map((p) =>
      p.id === editingProject.id
        ? {
            ...p,
            title: editTitle,
            category: editCategory,
            clientName: editClient,
            eventDate: editDate,
            coverImage: editCover,
          }
        : p
    );
    setProjects(updated);
    localStorage.setItem('bobby_studio_cms_portfolio', JSON.stringify(updated));
    setEditingProject(null);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleToggleFeatured = (id: string) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    setProjects(updated);
    localStorage.setItem('bobby_studio_cms_portfolio', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleTogglePublished = (id: string) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p));
    setProjects(updated);
    localStorage.setItem('bobby_studio_cms_portfolio', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem('bobby_studio_cms_portfolio', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: newTitle || 'Untitled Luxury Project',
      category: newCategory,
      clientName: newClient || 'Private Client',
      eventDate: newDate,
      coverImage: newCover,
      isFeatured: true,
      isPublished: true,
    };
    const updated = [newItem, ...projects];
    setProjects(updated);
    localStorage.setItem('bobby_studio_cms_portfolio', JSON.stringify(updated));
    setShowModal(false);
    setNewTitle('');
    setNewClient('');
  };

  const categoriesList = [
    'all',
    'wedding',
    'pre-wedding',
    'portrait',
    'fashion',
    'product',
    'baby',
    'behind the scenes',
    'drone',
    'maternity',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Gallery & Portfolio CMS</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage gallery shoot items, upload photos from laptop, edit titles, categories, and published visibility.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <FiPlus size={14} /> Add New Gallery Item
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-[#F5F5F7] text-[#666666] hover:bg-[#EAEAEA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-lg text-xs text-black focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden group">
            <div className="relative aspect-4/3 bg-[#F5F5F7] overflow-hidden">
              <img
                src={proj.coverImage}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(proj)}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-1 text-[11px] font-bold px-2.5 cursor-pointer"
                  title="Edit Title & Photo"
                >
                  <FiEdit size={14} /> Edit
                </button>
                <button
                  onClick={() => handleToggleFeatured(proj.id)}
                  className={`p-1.5 rounded-lg border backdrop-blur-md transition-all cursor-pointer ${
                    proj.isFeatured
                      ? 'bg-amber-400 text-black border-amber-500'
                      : 'bg-black/50 text-white border-white/20 hover:bg-black'
                  }`}
                  title="Toggle Featured"
                >
                  <FiStar size={14} />
                </button>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {proj.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-black group-hover:text-amber-900 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#777777] mt-0.5">{proj.clientName}</p>
                </div>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                  title="Delete Item"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#555555]">
                  <input
                    type="checkbox"
                    checked={proj.isPublished}
                    onChange={() => handleTogglePublished(proj.id)}
                    className="rounded border-[#CCCCCC] text-black focus:ring-black"
                  />
                  <span>Published Live</span>
                </label>
                <span className="text-[11px] text-[#888888] font-mono">{proj.eventDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-[#EAEAEA] space-y-5">
            <h3 className="text-lg font-bold text-black">Add New Gallery Shoot Photo</h3>
            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-black mb-1">Shoot Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Varmala Walk"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-black mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-semibold cursor-pointer"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="portrait">Portrait</option>
                    <option value="fashion">Fashion</option>
                    <option value="product">Product</option>
                    <option value="baby">Baby</option>
                    <option value="behind the scenes">Behind the Scenes</option>
                    <option value="drone">Drone</option>
                    <option value="maternity">Maternity</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-black mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav & Roshni"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Upload Photo from Laptop</label>
                <div className="space-y-3">
                  <div
                    onClick={() => document.getElementById('laptop-new-file-picker')?.click()}
                    className="w-full p-4 border-2 border-dashed border-[#CCCCCC] hover:border-black rounded-2xl bg-[#F5F5F7] hover:bg-[#EAEAEA] transition-all cursor-pointer text-center space-y-2"
                  >
                    {newCover ? (
                      <div className="relative aspect-video w-full max-h-40 rounded-xl overflow-hidden bg-black mx-auto">
                        <img src={newCover} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold gap-1">
                          <FiUploadCloud size={16} /> Click to change image from laptop
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 space-y-1">
                        <FiUploadCloud size={24} className="mx-auto text-black" />
                        <p className="font-bold text-black text-xs">Click to browse photos from laptop</p>
                      </div>
                    )}
                  </div>
                  <input
                    id="laptop-new-file-picker"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setNewCover(event.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={newCover}
                    onChange={(e) => setNewCover(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#F5F5F7] text-black font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white font-bold rounded-xl cursor-pointer hover:bg-[#222222]"
                >
                  Save Gallery Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-[#EAEAEA] space-y-5">
            <h3 className="text-lg font-bold text-black">Edit Gallery Photo & Project</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-black mb-1">Project Title / Name</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-black mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-semibold cursor-pointer"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="portrait">Portrait</option>
                    <option value="fashion">Fashion</option>
                    <option value="product">Product</option>
                    <option value="baby">Baby</option>
                    <option value="behind the scenes">Behind the Scenes</option>
                    <option value="drone">Drone</option>
                    <option value="maternity">Maternity</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-black mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editClient}
                    onChange={(e) => setEditClient(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Update Photo from Laptop</label>
                <div className="space-y-3">
                  <div
                    onClick={() => document.getElementById('laptop-edit-file-picker')?.click()}
                    className="w-full p-4 border-2 border-dashed border-[#CCCCCC] hover:border-black rounded-2xl bg-[#F5F5F7] hover:bg-[#EAEAEA] transition-all cursor-pointer text-center space-y-2"
                  >
                    {editCover ? (
                      <div className="relative aspect-video w-full max-h-40 rounded-xl overflow-hidden bg-black mx-auto">
                        <img src={editCover} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold gap-1">
                          <FiUploadCloud size={16} /> Click to change image from laptop
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 space-y-1">
                        <FiUploadCloud size={24} className="mx-auto text-black" />
                        <p className="font-bold text-black text-xs">Click to browse photos from laptop</p>
                      </div>
                    )}
                  </div>
                  <input
                    id="laptop-edit-file-picker"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setEditCover(event.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={editCover}
                    onChange={(e) => setEditCover(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-[#F5F5F7] text-black font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white font-bold rounded-xl cursor-pointer hover:bg-[#222222]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioCMSPage;
