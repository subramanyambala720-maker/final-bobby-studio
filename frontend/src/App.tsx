import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import PortfolioPage from '@/pages/PortfolioPage';
import ServicesPage from '@/pages/ServicesPage';
import PackagesPage from '@/pages/PackagesPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';
import GalleryPage from '@/pages/GalleryPage';
import BlogPage from '@/pages/BlogPage';
import ShopPage from '@/pages/ShopPage';
import BookPage from '@/pages/BookPage';

import AdminLayout from '@/components/admin/AdminLayout';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminBookingsPage from '@/pages/admin/AdminBookingsPage';
import AdminHeroCMSPage from '@/pages/admin/AdminHeroCMSPage';
import AdminAboutCMSPage from '@/pages/admin/AdminAboutCMSPage';
import AdminPortfolioCMSPage from '@/pages/admin/AdminPortfolioCMSPage';
import AdminServicesCMSPage from '@/pages/admin/AdminServicesCMSPage';
import AdminPackagesCMSPage from '@/pages/admin/AdminPackagesCMSPage';
import AdminBlogsCMSPage from '@/pages/admin/AdminBlogsCMSPage';
import AdminMediaLibraryPage from '@/pages/admin/AdminMediaLibraryPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminContactEnquiriesPage from '@/pages/admin/AdminContactEnquiriesPage';
import AdminContactCMSPage from '@/pages/admin/AdminContactCMSPage';

// Scroll to top or target anchor on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (isAdminRoute) {
    return (
      <div className="bg-[#F8F9FB] min-h-screen font-sans text-black">
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="enquiries" element={<AdminContactEnquiriesPage />} />
            <Route path="cms/hero" element={<AdminHeroCMSPage />} />
            <Route path="cms/about" element={<AdminAboutCMSPage />} />
            <Route path="cms/portfolio" element={<AdminPortfolioCMSPage />} />
            <Route path="cms/gallery" element={<AdminPortfolioCMSPage />} />
            <Route path="cms/services" element={<AdminServicesCMSPage />} />
            <Route path="cms/packages" element={<AdminPackagesCMSPage />} />
            <Route path="cms/contact" element={<AdminContactCMSPage />} />
            <Route path="media" element={<AdminMediaLibraryPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="noise-overlay bg-white min-h-screen">
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <SmoothScroll>
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/portfolio" element={<Navigate to="/gallery" replace />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/packages" element={<PackagesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/blog" element={<Navigate to="/" replace />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/book" element={<BookPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </SmoothScroll>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
