import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiSave, FiEye, FiFileText } from 'react-icons/fi';

interface BlogArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string;
  isPublished: boolean;
  coverImage: string;
  excerpt: string;
}

const initialArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Top 10 Royal Wedding Venues in Udaipur for Cinematic Photography',
    category: 'Wedding Guide',
    author: 'Bobby (Lead Photographer)',
    readTime: '6 min read',
    publishedAt: '2026-07-28',
    isPublished: true,
    coverImage: '/images/hero_new_1.jpg',
    excerpt: 'Discover the most breathtaking palace locations in Rajasthan for capturing royal wedding moments.',
  },
  {
    id: '2',
    title: 'How to Prepare for Your Pre-Wedding Outdoor Shoot: A Complete Checklist',
    category: 'Pre-Wedding Tips',
    author: 'Sneha Reddy',
    readTime: '4 min read',
    publishedAt: '2026-07-15',
    isPublished: true,
    coverImage: '/images/hero_new_2.jpg',
    excerpt: 'Essential advice on outfit styling, golden hour lighting timing, and poses for natural pre-wedding photos.',
  },
  {
    id: '3',
    title: 'The Art of Candid Wedding Cinematography: 4K vs Traditional Video',
    category: 'Cinematography',
    author: 'Rahul Sharma',
    readTime: '8 min read',
    publishedAt: '2026-06-30',
    isPublished: true,
    coverImage: '/images/hero_new_3.jpg',
    excerpt: 'Why 4K 60fps drone cinematography and unscripted candid footage create emotional wedding films.',
  },
];

const AdminBlogsCMSPage = () => {
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleDelete = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  const handleTogglePublish = (id: string) => {
    setArticles(articles.map((a) => (a.id === id ? { ...a, isPublished: !a.isPublished } : a)));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Blog & Article CMS</h1>
          <p className="text-xs text-[#777777] mt-1">
            Write photography guides, publish wedding articles, and optimize meta SEO keywords.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const newArt: BlogArticle = {
                id: Date.now().toString(),
                title: 'New Photography Article Guide',
                category: 'Photography Tips',
                author: 'Bobby Studio Team',
                readTime: '5 min read',
                publishedAt: '2026-08-01',
                isPublished: true,
                coverImage: '/images/hero_new_4.jpg',
                excerpt: 'Insightful guide on luxury photography aesthetics.',
              };
              setArticles([newArt, ...articles]);
            }}
            className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2"
          >
            <FiPlus size={14} /> Write New Article
          </button>
        </div>
      </div>

      {/* Blog Article Cards */}
      <div className="space-y-4">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl border border-[#EAEAEA] p-5 shadow-sm flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-full md:w-48 h-32 rounded-xl bg-[#F5F5F7] overflow-hidden flex-shrink-0">
              <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-2 w-full">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#F5F5F7] text-black text-[10px] font-bold uppercase tracking-wider rounded-md border border-[#E0E0E4]">
                  {art.category}
                </span>
                <span className="text-xs text-[#777777]">{art.publishedAt} • {art.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-black">{art.title}</h3>
              <p className="text-xs text-[#555555] line-clamp-2">{art.excerpt}</p>
              <p className="text-[11px] text-[#888888] font-medium">Author: {art.author}</p>
            </div>

            <div className="flex md:flex-col items-center justify-between gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-[#EAEAEA] pt-3 md:pt-0 md:pl-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#555555]">
                <input
                  type="checkbox"
                  checked={art.isPublished}
                  onChange={() => handleTogglePublish(art.id)}
                  className="rounded border-[#CCCCCC] text-black focus:ring-black"
                />
                <span>Published</span>
              </label>

              <button
                onClick={() => handleDelete(art.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Article"
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

export default AdminBlogsCMSPage;
