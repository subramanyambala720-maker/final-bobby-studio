import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiSearch, FiCheckCircle, FiClock, FiTrash2, FiMessageSquare, FiCalendar, FiTag, FiSend } from 'react-icons/fi';

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  date: string;
}

const initialEnquiries: ContactEnquiry[] = [
  {
    id: 'MSG-701',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@gmail.com',
    phone: '+91 98765 43210',
    service: 'Wedding Photography',
    message: 'Hi Bobby Studio! We are planning a 3-day royal wedding in Udaipur for November 2026. We loved your portfolio film trailer and would like to check availability and request a custom quote.',
    status: 'new',
    date: 'Today at 10:24 AM',
  },
  {
    id: 'MSG-702',
    name: 'Rohan & Deepika',
    email: 'rohan.deepika@yahoo.com',
    phone: '+91 99887 76655',
    service: 'Pre-Wedding Shoot',
    message: 'Hello! Looking for a sunset outdoor pre-wedding couple shoot in Goa. Do you handle location permissions and drone permits?',
    status: 'new',
    date: 'Today at 8:15 AM',
  },
  {
    id: 'MSG-703',
    name: 'Dr. Vikram Reddy',
    email: 'vikram.reddy@apollo.in',
    phone: '+91 94455 66778',
    service: 'Cinematography',
    message: 'Interested in booking 4K aerial drone photography for our annual hospital inaugurations and executive portraits.',
    status: 'read',
    date: 'Yesterday at 4:30 PM',
  },
  {
    id: 'MSG-704',
    name: 'Sneha Kapoor',
    email: 'sneha.kapoor@fashionhouse.com',
    phone: '+91 91234 56789',
    service: 'Fashion Photography',
    message: 'We would like to book a 2-day studio model shoot for our upcoming winter couture collection catalog.',
    status: 'replied',
    date: 'Aug 02, 2026',
  },
];

const AdminContactEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    const saved = localStorage.getItem('bobby_studio_contact_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialEnquiries;
      }
    }
    return initialEnquiries;
  });

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(initialEnquiries[0]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    localStorage.setItem('bobby_studio_contact_messages', JSON.stringify(enquiries));
  }, [enquiries]);

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: ContactEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    const rawBody = replyText || `Hi ${selectedEnquiry.name},\n\nThank you for reaching out to Bobby Studio regarding ${selectedEnquiry.service}.\n\nWarm regards,\nBobby Studio Team\n+91 99492 16881`;
    const subject = encodeURIComponent(`Re: Bobby Studio Inquiry - ${selectedEnquiry.service}`);
    const body = encodeURIComponent(rawBody);

    // Direct Gmail Webmail Compose URL (opens Gmail compose with pre-filled recipient, subject & body)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${selectedEnquiry.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');

    handleUpdateStatus(selectedEnquiry.id, 'replied');
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Customer Messages & Contact Enquiries</h1>
          <p className="text-xs text-[#777777] mt-1">
            Real-time messages sent by visitors from the website Contact page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {enquiries.filter((e) => e.status === 'new').length} New Unread Messages
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['all', 'new', 'read', 'replied', 'archived'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#666666] hover:bg-[#EAEAEA] hover:text-black'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={15} />
          <input
            type="text"
            placeholder="Search by customer name, email, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] border border-[#E0E0E4] rounded-lg text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Split Layout: Message List + Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Messages List (1.2 cols) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden flex flex-col h-[650px]">
          <div className="p-4 border-b border-[#EAEAEA] bg-[#FAFAFA]">
            <p className="text-xs font-bold text-black uppercase tracking-wider">Inbox ({filteredEnquiries.length})</p>
          </div>

          <div className="divide-y divide-[#EAEAEA] overflow-y-auto flex-1 custom-scrollbar">
            {filteredEnquiries.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedEnquiry(msg);
                  if (msg.status === 'new') {
                    handleUpdateStatus(msg.id, 'read');
                  }
                }}
                className={`p-4 cursor-pointer transition-colors space-y-2 ${
                  selectedEnquiry?.id === msg.id
                    ? 'bg-amber-50/60 border-l-4 border-black'
                    : msg.status === 'new'
                    ? 'bg-[#F0F7FF] font-semibold'
                    : 'hover:bg-[#F8F9FB]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black truncate max-w-[150px]">{msg.name}</span>
                  <span className="text-[10px] text-[#888888]">{msg.date}</span>
                </div>

                <p className="text-[11px] font-semibold text-black truncate">{msg.service}</p>
                <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">{msg.message}</p>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                      msg.status === 'new'
                        ? 'bg-blue-100 text-blue-700'
                        : msg.status === 'replied'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {msg.status}
                  </span>
                  <span className="text-[#888888] font-mono">{msg.id}</span>
                </div>
              </div>
            ))}

            {filteredEnquiries.length === 0 && (
              <div className="p-8 text-center text-[#888888] text-xs">
                No customer messages found in this category.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Message Content & Quick Reply (1.8 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-6 flex flex-col justify-between h-[650px] overflow-y-auto">
          {selectedEnquiry ? (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="flex items-start justify-between border-b border-[#EAEAEA] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-black">{selectedEnquiry.name}</h2>
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        selectedEnquiry.status === 'new'
                          ? 'bg-blue-100 text-blue-700'
                          : selectedEnquiry.status === 'replied'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {selectedEnquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#777777] mt-1 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FiMail size={13} /> {selectedEnquiry.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiPhone size={13} /> {selectedEnquiry.phone}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedEnquiry.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Message"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Inquiry Service & Time */}
              <div className="flex flex-wrap items-center gap-4 p-3 bg-[#F8F9FB] border border-[#EAEAEA] rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-black font-semibold">
                  <FiTag className="text-amber-600" size={14} />
                  <span>Requested Service: <strong className="text-black">{selectedEnquiry.service}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#666666]">
                  <FiCalendar size={14} />
                  <span>Received: {selectedEnquiry.date}</span>
                </div>
              </div>

              {/* Full Message Text */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#888888] uppercase tracking-wider">Customer Message</h3>
                <div className="p-4 bg-[#F5F5F7] border border-[#E0E0E4] rounded-2xl text-xs text-black leading-relaxed font-sans whitespace-pre-wrap">
                  "{selectedEnquiry.message}"
                </div>
              </div>

              {/* Quick Email Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-[#EAEAEA]">
                <h3 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                  <FiSend size={13} /> Quick Email Reply to Client
                </h3>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write email response to ${selectedEnquiry.name} (${selectedEnquiry.email})...`}
                  className="w-full p-3 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black resize-none"
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, 'archived')}
                    className="px-4 py-2 bg-[#F5F5F7] text-[#555555] hover:text-black font-semibold text-xs rounded-xl"
                  >
                    Archive Message
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-black text-white font-bold text-xs rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <FiSend size={14} /> Send Email Reply
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-[#888888]">
              <FiMessageSquare size={32} className="mb-2 text-[#CCCCCC]" />
              <p className="text-xs font-medium">Select a customer message from the left inbox list.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactEnquiriesPage;
