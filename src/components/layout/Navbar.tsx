import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Compass,
  Heart,
  Bell,
  Sun,
  Moon,
  User,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles,
  Phone,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';

interface NavbarProps {
  onOpenAuthModal?: () => void;
  onOpenNotifications?: () => void;
  onOpenWishlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuthModal,
  onOpenNotifications,
  onOpenWishlist,
}) => {
  const {
    currentUser,
    logout,
    wishlist,
    isDarkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    unreadCount,
    openAuthModal,
    openWishlistModal,
    openNotifModal,
  } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'packages', label: t('nav.packages') },
    { id: 'temples', label: t('nav.temples') },
    { id: 'pinddaan', label: t('nav.pinddaan') },
    { id: 'hotels', label: t('nav.hotels') },
    { id: 'pandits', label: t('nav.pandits') },
    { id: 'blogs', label: t('nav.blogs') },
    { id: 'reviews', label: t('nav.reviews') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#2A1D15]/95 backdrop-blur-md border-b border-[#E6E2D3] shadow-xs transition-colors duration-200">
      {/* Top Banner Notice */}
      <div className="bg-[#800000] text-[#FFFDF0] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
        <Sparkles className="w-3.5 h-3.5 text-[#FF9933] animate-pulse shrink-0" />
        <span>
          {lang === 'hi'
            ? '🙏 गया विष्णुपद मंदिर यात्रा एवं 45-वेदी पिंडदान की बुकिंग जारी | हेल्पलाइन: +91 99312 46394'
            : '🙏 Special Pitru Paksha & Gaya Vishnupad Yatra Pre-Booking Open! Helpline: +91 99312 46394'}
        </span>
        <div className="flex items-center gap-2 ml-2">
          <a
            href="tel:+919931246394"
            className="underline hover:text-[#FF9933] font-bold inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> Call
          </a>
          <span>•</span>
          <a
            href="https://wa.me/919931246394?text=Hari%20Om!%20I%20want%20to%20inquire%20about%20Purva%20Yatra."
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-[#FF9933] font-bold inline-flex items-center gap-1"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <span className="text-xl font-bold font-serif tracking-tight text-[#800000] dark:text-[#FF9933]">
                Purva<span className="text-[#FF9933]">Yatra</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#5C4D42] dark:text-[#E6E2D3]">
                Gaya, Bihar • Vishnupad & Sacred Yatra
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs uppercase tracking-widest font-medium text-[#5C4D42] dark:text-[#E6E2D3]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'text-[#FF9933] font-bold border-b-2 border-[#FF9933] bg-[#FFFDF0] dark:bg-[#3D2B1F]'
                      : 'hover:text-[#FF9933] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#FFFDF0] dark:bg-[#3D2B1F] p-0.5 rounded-full border border-[#E6E2D3] text-xs font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === 'en'
                    ? 'bg-[#800000] text-white shadow-2xs'
                    : 'text-[#3D2B1F] dark:text-[#E6E2D3] hover:text-[#FF9933]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === 'hi'
                    ? 'bg-[#800000] text-white shadow-2xs'
                    : 'text-[#3D2B1F] dark:text-[#E6E2D3] hover:text-[#FF9933]'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full text-[#3D2B1F] dark:text-[#E6E2D3] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] border border-[#E6E2D3] dark:border-amber-800 transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FF9933]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (onOpenWishlist) onOpenWishlist();
                else openWishlistModal();
              }}
              title="Saved Wishlist"
              className="p-2 rounded-full text-[#3D2B1F] dark:text-[#E6E2D3] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] border border-[#E6E2D3] dark:border-amber-800 transition-colors relative cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => {
                if (onOpenNotifications) onOpenNotifications();
                else openNotifModal();
              }}
              title="Notifications"
              className="p-2 rounded-full text-[#3D2B1F] dark:text-[#E6E2D3] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] border border-[#E6E2D3] dark:border-amber-800 transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF9933] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Admin Link / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-[#E6E2D3] dark:border-amber-800 hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] transition-colors cursor-pointer"
                >
                  <img
                    src={
                      currentUser.avatar ||
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                    }
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#FF9933]"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-[#3D2B1F] dark:text-[#E6E2D3] max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#5C4D42] dark:text-[#E6E2D3]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#2A1D15] rounded-2xl shadow-xl border border-[#E6E2D3] dark:border-amber-800 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-[#E6E2D3] dark:border-amber-800">
                      <p className="text-xs font-bold text-[#3D2B1F] dark:text-[#FFFDF0] truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-[#5C4D42] dark:text-[#E6E2D3] truncate">
                        {currentUser.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#FFFDF0] dark:bg-amber-900/40 text-[#800000] dark:text-[#FF9933] border border-[#E6E2D3] dark:border-amber-700">
                        Role: {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#3D2B1F] dark:text-[#E6E2D3] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#800000] dark:text-[#FF9933]" /> My User Dashboard
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-[#800000] dark:text-[#FF9933] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] flex items-center gap-2 font-bold cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#FF9933]" /> Admin Control Panel
                      </button>
                    )}

                    <div className="border-t border-[#E6E2D3] dark:border-amber-800 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onOpenAuthModal) onOpenAuthModal();
                    else openAuthModal('login');
                  }}
                  className="px-4 py-1.5 rounded-full border border-[#800000] text-[#800000] dark:border-[#FF9933] dark:text-[#FF9933] text-xs font-semibold hover:bg-[#800000] hover:text-white dark:hover:bg-[#FF9933] dark:hover:text-[#2A1D15] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" /> {t('nav.login')}
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-1.5 rounded-full bg-[#800000] text-white text-xs font-semibold shadow-xs hover:bg-[#660000] transition-all cursor-pointer hidden sm:inline-flex items-center gap-1"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Direct WhatsApp Contact Button */}
            <a
              href="https://wa.me/919931246394?text=Hari%20Om!%20I%20want%20to%20inquire%20about%20Purva%20Yatra."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-full text-[#3D2B1F] dark:text-[#E6E2D3] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F] border border-[#E6E2D3] dark:border-amber-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#2A1D15] border-b border-[#E6E2D3] dark:border-amber-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium uppercase tracking-widest ${
                activeTab === item.id
                  ? 'bg-[#800000] text-white font-bold'
                  : 'text-[#3D2B1F] dark:text-[#E6E2D3] hover:bg-[#FFFDF0] dark:hover:bg-[#3D2B1F]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[#E6E2D3] dark:border-amber-800 space-y-2">
            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl text-xs font-bold text-center border border-[#800000] text-[#800000] dark:border-[#FF9933] dark:text-[#FF9933]"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl text-xs font-bold text-center bg-[#800000] text-white"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="pt-1 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#3D2B1F] dark:text-[#E6E2D3] bg-[#FFFDF0] dark:bg-amber-900/30 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#800000] dark:text-[#FF9933]" /> My Dashboard ({currentUser.name})
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}

            <button
              onClick={() => {
                openWishlistModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#3D2B1F] dark:text-[#E6E2D3] flex items-center justify-between border border-[#E6E2D3] dark:border-amber-800"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" /> Saved Wishlist
              </span>
              <span className="px-2 py-0.5 bg-[#800000] text-white rounded-full text-[10px] font-bold">
                {wishlist.length}
              </span>
            </button>

            <a
              href="https://wa.me/919931246394?text=Hari%20Om!%20I%20want%20to%20inquire%20about%20Purva%20Yatra."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-center bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> Direct WhatsApp (+91 99312 46394)
            </a>

            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#800000] dark:text-[#FF9933] bg-[#FFFDF0] dark:bg-[#3D2B1F] border border-[#800000]/30 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF9933]" /> Open Admin Control Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
