import { useState } from 'react';
import { FiUploadCloud, FiSearch, FiFolder, FiTrash2, FiCopy, FiCheck, FiImage, FiVideo } from 'react-icons/fi';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  folder: string;
  size: string;
  dimensions: string;
  createdAt: string;
}

const initialFiles: MediaFile[] = [
  { id: '1', name: 'hero_slider_udaipur_wedding.jpg', url: '/images/hero_new_1.jpg', type: 'image', folder: 'hero', size: '2.4 MB', dimensions: '3840x2160', createdAt: '2026-08-01' },
  { id: '2', name: 'prewedding_beach_sunset.jpg', url: '/images/hero_new_2.jpg', type: 'image', folder: 'portfolio', size: '1.8 MB', dimensions: '2560x1440', createdAt: '2026-08-01' },
  { id: '3', name: 'maternity_indoor_studio.jpg', url: '/images/hero_new_3.jpg', type: 'image', folder: 'portfolio', size: '1.2 MB', dimensions: '1920x1080', createdAt: '2026-07-29' },
  { id: '4', name: 'fashion_vogue_cover_shoot.jpg', url: '/images/hero_new_4.jpg', type: 'image', folder: 'fashion', size: '3.1 MB', dimensions: '4000x3000', createdAt: '2026-07-25' },
  { id: '5', name: 'drone_aerial_wedding_film.mp4', url: '/images/new_anim_wedding_family.jpg', type: 'video', folder: 'drone', size: '48.5 MB', dimensions: '4K Ultra HD', createdAt: '2026-07-20' },
  { id: '6', name: 'aarohi_birthday_celebration.jpg', url: '/images/new_anim_aarohi_birthday.jpg', type: 'image', folder: 'gallery', size: '1.5 MB', dimensions: '2048x1536', createdAt: '2026-07-18' },
];

const AdminMediaLibraryPage = () => {
  const [files, setFiles] = useState<MediaFile[]>(() => {
    const saved = localStorage.getItem('bobby_studio_admin_media');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialFiles;
      }
    }
    return initialFiles;
  });
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFiles = files.filter((f) => {
    const matchesFolder = selectedFolder === 'all' || f.folder === selectedFolder;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    localStorage.setItem('bobby_studio_admin_media', JSON.stringify(updated));
  };

  const handleUpload = () => {
    const newFile: MediaFile = {
      id: Date.now().toString(),
      name: `upload_${Date.now()}.jpg`,
      url: '/images/hero_new_1.jpg',
      type: 'image',
      folder: 'general',
      size: '1.6 MB',
      dimensions: '2560x1440',
      createdAt: 'Just now',
    };
    const updated = [newFile, ...files];
    setFiles(updated);
    localStorage.setItem('bobby_studio_admin_media', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Cloudinary Media Library</h1>
          <p className="text-xs text-[#777777] mt-1">
            Upload, organize, compress & manage high-resolution photos and 4K aerial videos.
          </p>
        </div>
        <button
          onClick={handleUpload}
          className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2"
        >
          <FiUploadCloud size={16} /> Upload New Assets
        </button>
      </div>

      {/* Folder Filters & Search */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['all', 'hero', 'portfolio', 'gallery', 'fashion', 'drone'].map((fol) => (
            <button
              key={fol}
              onClick={() => setSelectedFolder(fol)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedFolder === fol ? 'bg-black text-white' : 'bg-[#F5F5F7] text-[#666666] hover:bg-[#EAEAEA]'
              }`}
            >
              <FiFolder size={12} />
              <span>{fol}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-lg text-xs text-black focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden group flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-[#F5F5F7] overflow-hidden">
              <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-white text-[9px] font-bold rounded uppercase">
                {file.type}
              </div>
            </div>

            <div className="p-3 space-y-1.5">
              <p className="text-[11px] font-bold text-black truncate">{file.name}</p>
              <div className="flex items-center justify-between text-[10px] text-[#777777]">
                <span>{file.size}</span>
                <span>{file.dimensions}</span>
              </div>

              <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-2 mt-1">
                <button
                  onClick={() => handleCopyLink(file.id, file.url)}
                  className="px-2 py-1 bg-[#F5F5F7] hover:bg-[#EAEAEA] text-black text-[10px] font-bold rounded flex items-center gap-1"
                  title="Copy Direct URL"
                >
                  {copiedId === file.id ? <FiCheck size={11} className="text-emerald-600" /> : <FiCopy size={11} />}
                  <span>{copiedId === file.id ? 'Copied!' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete File"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMediaLibraryPage;
