import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Send,
  Heart,
  Calendar,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-white dark:bg-[#2A1D15] border-t border-[#E6E2D3] py-6 px-4 sm:px-10 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Copyright */}
        <div className="flex flex-wrap items-center space-x-6 text-[11px] font-bold text-[#5C4D42] dark:text-[#E6E2D3] uppercase tracking-widest">
          <span className="text-[#800000] dark:text-[#FF9933] font-serif text-sm">© 2026 Purva Yatra</span>
          <button
            onClick={() => setActiveTab('contact')}
            className="hover:text-[#FF9933] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="hover:text-[#FF9933] transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="hover:text-[#FF9933] transition-colors cursor-pointer"
          >
            Refund Policy
          </button>
        </div>

        {/* Support Contact & Social icons */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#800000] font-bold text-xs hover:bg-[#800000] hover:text-white transition-colors cursor-pointer">
              f
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#800000] font-bold text-xs hover:bg-[#800000] hover:text-white transition-colors cursor-pointer">
              i
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#800000] font-bold text-xs hover:bg-[#800000] hover:text-white transition-colors cursor-pointer">
              t
            </div>
          </div>
          <div className="h-4 w-px bg-gray-200 mx-2"></div>
          <div className="flex items-center gap-3 text-xs text-[#5C4D42] dark:text-[#E6E2D3] font-medium">
            <a href="tel:+919931246394" className="flex items-center gap-1 hover:text-[#800000] font-bold">
              <Phone className="w-3.5 h-3.5 text-[#800000]" />
              Support: +91 99312 46394
            </a>
            <a
              href="https://wa.me/919931246394?text=Hari%20Om!%20I%20have%20an%20enquiry%20regarding%20Purva%20Yatra."
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
