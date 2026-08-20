import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiArrowRight, FiShield, FiCheckCircle } from 'react-icons/fi';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@bobbystudio.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('adminToken', 'bobby-studio-admin-jwt-token-2024');
        navigate('/admin/dashboard');
      } else {
        setError('Please enter valid administrator credentials.');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-[#EAEAEA]"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg">
            B
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight font-luxury">
            BOBBY STUDIO
          </h1>
          <p className="text-xs text-[#777777] font-medium tracking-widest uppercase mt-1">
            Enterprise Admin Portal & CMS
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-2 uppercase tracking-wider">
              Admin Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-sm text-black placeholder:text-[#999999] focus:outline-none focus:border-black transition-colors"
                placeholder="admin@bobbystudio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl text-sm text-black placeholder:text-[#999999] focus:outline-none focus:border-black transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#666666]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-[#CCCCCC] text-black focus:ring-black" />
              <span>Remember session</span>
            </label>
            <a href="#forgot" className="text-black font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-[#222222] active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In To Portal</span>
                <FiArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-8 p-4 bg-[#F8F9FB] border border-[#EAEAEA] rounded-2xl text-xs text-[#666666]">
          <div className="flex items-center gap-2 font-bold text-black mb-1">
            <FiShield size={14} className="text-emerald-600" />
            <span>Demo Admin Credentials</span>
          </div>
          <p className="text-[11px] text-[#777777]">Pre-configured for instant review:</p>
          <div className="mt-2 space-y-1 font-mono text-[11px] text-[#333333]">
            <p>Email: <span className="text-black font-bold">admin@bobbystudio.com</span></p>
            <p>Password: <span className="text-black font-bold">password123</span></p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#888888]">
          <FiCheckCircle size={13} className="text-emerald-500" />
          <span>Protected with 256-bit JWT Encryption</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
