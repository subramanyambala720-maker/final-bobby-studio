import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiYoutube, FiArrowUpRight, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaPinterestP, FaWhatsapp } from 'react-icons/fa';
import GlassIcons, { type GlassIconsItem } from '@/components/ui/GlassIcons';

const socialGlassIcons: GlassIconsItem[] = [
  { icon: <FiInstagram size={20} />, label: 'Instagram', href: 'https://instagram.com/bobbyyyy.x_' },
  { icon: <FaFacebookF size={18} />, label: 'Facebook', href: 'https://facebook.com/bobbystudio' },
  { icon: <FiYoutube size={20} />, label: 'YouTube', href: 'https://youtube.com/bobbystudio' },
  { icon: <FaPinterestP size={18} />, label: 'Pinterest', href: 'https://pinterest.com/bobbystudio' },
  { icon: <FaWhatsapp size={20} />, label: 'WhatsApp', href: 'https://wa.me/919949216881' }
];

const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ],
  services: [
    { name: 'Wedding Photography', path: '/services', serviceId: 'wedding' },
    { name: 'Pre-Wedding Shoots', path: '/services', serviceId: 'pre-wedding' },
    { name: 'Engagement', path: '/services', serviceId: 'engagement' },
    { name: 'Portrait Photography', path: '/services', serviceId: 'portrait' },
    { name: 'Baby & Newborn', path: '/services', serviceId: 'baby' },
    { name: 'Destination Shoots', path: '/services', serviceId: 'destination' },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-[#000000] text-[#FFFFFF] border-t border-white/10 pt-20 pb-12">
      <div className="container-premium">
        {/* Top CTA Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16 border-b border-white/10">
          <div className="max-w-2xl">
            <p className="text-xs text-[#A0A0A0] tracking-[0.25em] uppercase font-display mb-3">
              Crafting Timeless Visual Masterpieces
            </p>
            <h2 className="text-display font-luxury text-[#FFFFFF] leading-tight">
              Let&apos;s Create Something{' '}
              <span className="italic font-bold text-white">Beautiful Together</span>
            </h2>
          </div>
          <Link
            to="/book"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-[#000000] text-xs font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 hover:scale-105 uppercase"
          >
            <span>Book Your Session</span>
            <FiArrowUpRight className="text-lg group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                <span className="text-lg font-luxury text-[#FFFFFF] font-bold">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-luxury tracking-[0.2em] text-[#FFFFFF] font-semibold leading-none">
                  BOBBY STUDIO
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#A0A0A0] leading-none mt-1">
                  Luxury Photography
                </span>
              </div>
            </Link>
            <p className="text-[#A0A0A0] text-sm leading-relaxed font-light max-w-sm">
              We create unforgettable wedding stories, cinematic films, elegant portraits, and timeless memories through world-class photography and filmmaking.
            </p>
            <div className="space-y-3 pt-2">
              <a href="tel:+919949216881" className="flex items-center gap-3 text-[#A0A0A0] hover:text-white transition-colors text-sm">
                <FiPhone size={16} className="text-white" />
                <span>+91 99492 16881</span>
              </a>
              <a href="mailto:subramanyambala720@gmail.com" className="flex items-center gap-3 text-[#A0A0A0] hover:text-white transition-colors text-sm">
                <FiMail size={16} className="text-white" />
                <span>subramanyambala720@gmail.com</span>
              </a>
              <a
                href="https://www.google.com/maps/place/Yvr+Luxury+Boys+PG/@17.3459465,78.3224294,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb950009070931:0x2223242406072e9d!8m2!3d17.3459465!4d78.3250043!16s%2Fg%2F11z911pwzd?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[#A0A0A0] hover:text-white transition-colors text-sm group"
              >
                <FiMapPin size={16} className="text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Bobby Studio, YVR Luxury Location (Click for Google Maps)</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-base font-luxury tracking-widest text-[#FFFFFF] font-semibold uppercase mb-6 border-l-2 border-white pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A0A0A0] hover:text-white transition-colors text-sm font-light tracking-wide flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-base font-luxury tracking-widest text-[#FFFFFF] font-semibold uppercase mb-6 border-l-2 border-white pl-3">
              Our Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    state={{ selectedServiceId: link.serviceId }}
                    className="text-[#A0A0A0] hover:text-white transition-colors text-sm font-light tracking-wide flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & 3D Glass Icons Column */}
          <div className="space-y-4">
            <h4 className="text-base font-luxury tracking-widest text-[#FFFFFF] font-semibold uppercase mb-4 border-l-2 border-white pl-3">
              Follow Bobby Studio
            </h4>
            <div className="pt-2">
              <GlassIcons items={socialGlassIcons} className="gap-4 justify-start" />
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A0A0A0] gap-4">
          <p>© 2026 Bobby Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
