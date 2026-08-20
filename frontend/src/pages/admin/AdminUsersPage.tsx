import { useState } from 'react';
import { FiUser, FiShield, FiPlus, FiTrash2, FiCheck, FiLock } from 'react-icons/fi';

interface UserRoleItem {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Manager' | 'Lead Photographer' | 'Editor' | 'Content Manager';
  status: 'active' | 'inactive';
  lastActive: string;
}

const initialUsers: UserRoleItem[] = [
  { id: '1', name: 'Bala Subramanyam', email: 'subramanyambala720@gmail.com', role: 'Super Admin', status: 'active', lastActive: 'Online now' },
  { id: '2', name: 'Bobby', email: 'bobby@bobbystudio.com', role: 'Lead Photographer', status: 'active', lastActive: '2 hours ago' },
  { id: '3', name: 'Rahul Sharma', email: 'rahul@bobbystudio.com', role: 'Manager', status: 'active', lastActive: 'Yesterday' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha@bobbystudio.com', role: 'Editor', status: 'active', lastActive: '3 days ago' },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserRoleItem[]>(() => {
    const saved = localStorage.getItem('bobby_studio_admin_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialUsers;
      }
    }
    return initialUsers;
  });
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRoleItem['role']>('Editor');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserRoleItem = {
      id: Date.now().toString(),
      name: name || 'New Team Member',
      email: email || 'member@bobbystudio.com',
      role,
      status: 'active',
      lastActive: 'Just invited',
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem('bobby_studio_admin_users', JSON.stringify(updated));
    setShowModal(false);
    setName('');
    setEmail('');
  };

  const handleDelete = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem('bobby_studio_admin_users', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Team Users & Role Permissions</h1>
          <p className="text-xs text-[#777777] mt-1">
            Manage admin users, photographers, editors, and granular access permissions.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#222222] transition-colors shadow-sm flex items-center gap-2"
        >
          <FiPlus size={14} /> Invite Team Member
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] text-xs">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F8F9FB]">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-black">{u.name}</p>
                        <p className="text-[11px] text-[#777777]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-[#F5F5F7] border border-[#E0E0E4] rounded-lg font-semibold text-black text-[11px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#555555]">{u.lastActive}</td>
                  <td className="py-3.5 px-4 text-right">
                    {u.role !== 'Super Admin' && (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Revoke Access"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#EAEAEA] space-y-5">
            <h3 className="text-lg font-bold text-black">Invite New Team Member</h3>
            <form onSubmit={handleAddUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-black mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@bobbystudio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-black font-semibold"
                >
                  <option value="Manager">Manager</option>
                  <option value="Lead Photographer">Lead Photographer</option>
                  <option value="Editor">Editor</option>
                  <option value="Content Manager">Content Manager</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#F5F5F7] text-black font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white font-bold rounded-xl"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
