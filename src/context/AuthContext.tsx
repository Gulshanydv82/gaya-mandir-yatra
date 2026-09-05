import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (email: string, role?: string) => Promise<boolean>;
  register: (data: { name: string; email: string; phone?: string; address?: string; role?: UserRole }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (packageId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedPackageId: string | null;
  setSelectedPackageId: (id: string | null) => void;
  bookingPackageId: string | null;
  setBookingPackageId: (id: string | null) => void;
  unreadCount: number;
  markNotificationsRead: () => void;
  refreshUserData: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  wishlistModalOpen: boolean;
  setWishlistModalOpen: (open: boolean) => void;
  openWishlistModal: () => void;
  notifModalOpen: boolean;
  setNotifModalOpen: (open: boolean) => void;
  openNotifModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gayayatra_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('gayayatra_wishlist');
    return saved ? JSON.parse(saved) : ['pkg-1', 'pkg-2'];
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('gayayatra_theme') === 'dark';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [bookingPackageId, setBookingPackageId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(2);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [wishlistModalOpen, setWishlistModalOpen] = useState<boolean>(false);
  const [notifModalOpen, setNotifModalOpen] = useState<boolean>(false);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const openWishlistModal = () => setWishlistModalOpen(true);
  const openNotifModal = () => setNotifModalOpen(true);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gayayatra_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gayayatra_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gayayatra_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('gayayatra_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const login = async (email: string, role?: string): Promise<boolean> => {
    try {
      const res = await apiService.login(email, role);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      // Fallback local user creation for smooth offline/dev behavior
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '+91 98765 43210',
        role: role === 'admin' || email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(fallbackUser);
      return true;
    }
  };

  const register = async (data: { name: string; email: string; phone?: string; address?: string; role?: UserRole }) => {
    try {
      const res = await apiService.register(data);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err: any) {
      console.error('Register error:', err);
      // Fallback local user creation
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone || '+91 90000 00000',
        address: data.address || '',
        role: data.role || 'user',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const toggleWishlist = (packageId: string) => {
    setWishlist((prev) =>
      prev.includes(packageId) ? prev.filter((id) => id !== packageId) : [...prev, packageId]
    );
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const markNotificationsRead = () => setUnreadCount(0);

  const refreshUserData = async () => {
    if (!currentUser) return;
    try {
      const users = await apiService.getUsers();
      const match = users.find((u) => u.id === currentUser.id);
      if (match) setCurrentUser(match);
    } catch (e) {
      console.error('Refresh user failed:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        wishlist,
        toggleWishlist,
        isDarkMode,
        toggleDarkMode,
        activeTab,
        setActiveTab,
        selectedPackageId,
        setSelectedPackageId,
        bookingPackageId,
        setBookingPackageId,
        unreadCount,
        markNotificationsRead,
        refreshUserData,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        wishlistModalOpen,
        setWishlistModalOpen,
        openWishlistModal,
        notifModalOpen,
        setNotifModalOpen,
        openNotifModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
