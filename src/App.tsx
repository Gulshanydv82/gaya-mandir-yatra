import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Home Section Components
import { HeroBanner } from './components/home/HeroBanner';
import { FeaturedPackages } from './components/home/FeaturedPackages';
import { PindDaanGuideSection } from './components/home/PindDaanGuideSection';
import { TempleExplorer } from './components/home/TempleExplorer';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { CustomerReviews } from './components/home/CustomerReviews';
import { FAQSection } from './components/home/FAQSection';
import { AIYatraAssistant } from './components/home/AIYatraAssistant';

// Page Components
import { PackageList } from './components/packages/PackageList';
import { HotelsPage } from './components/pages/HotelsPage';
import { PanditsPage } from './components/pages/PanditsPage';
import { BlogsPage } from './components/pages/BlogsPage';
import { ContactPage } from './components/pages/ContactPage';
import { UserDashboard } from './components/user/UserDashboard';
import { AdminLayout } from './components/admin/AdminLayout';

// Modals
import { PackageDetailModal } from './components/packages/PackageDetailModal';
import { BookingModal } from './components/booking/BookingModal';
import { AuthModal } from './components/common/AuthModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { WishlistModal } from './components/common/WishlistModal';

const AppContent: React.FC = () => {
  const {
    activeTab,
    authModalOpen,
    setAuthModalOpen,
    notifModalOpen,
    setNotifModalOpen,
    wishlistModalOpen,
    setWishlistModalOpen,
    isDarkMode,
  } = useAuth();

  return (
    <div className={`min-h-screen bg-[#FFFDF0] dark:bg-[#1a120b] text-[#3D2B1F] dark:text-[#FFFDF0] flex flex-col font-sans transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenNotifications={() => setNotifModalOpen(true)}
        onOpenWishlist={() => setWishlistModalOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroBanner />
            <FeaturedPackages />
            <PindDaanGuideSection />
            <TempleExplorer />
            <WhyChooseUs />
            <CustomerReviews />
            <FAQSection />
            <AIYatraAssistant />
          </>
        )}

        {activeTab === 'packages' && <PackageList />}

        {activeTab === 'temples' && (
          <>
            <div className="py-8 bg-amber-900 text-amber-50 text-center">
              <h1 className="text-3xl font-extrabold font-serif">Sacred Temples & Vedis of Gaya</h1>
              <p className="text-xs text-amber-200 mt-1">Explore all 45 sacred spots for darshan & ancestral rituals</p>
            </div>
            <TempleExplorer />
          </>
        )}

        {activeTab === 'pinddaan' && (
          <>
            <PindDaanGuideSection />
            <PackageList />
          </>
        )}

        {activeTab === 'hotels' && <HotelsPage />}
        {activeTab === 'pandits' && <PanditsPage />}
        {activeTab === 'blogs' && <BlogsPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'admin' && <AdminLayout />}
      </main>

      <Footer />

      {/* Global Modals */}
      <PackageDetailModal />
      <BookingModal />
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      {notifModalOpen && <NotificationsModal onClose={() => setNotifModalOpen(false)} />}
      {wishlistModalOpen && <WishlistModal onClose={() => setWishlistModalOpen(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
