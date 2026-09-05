import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  Package,
  Temple,
  Hotel,
  Vehicle,
  Pandit,
  Booking,
  User as UserType,
  Review,
  Coupon,
  CMSSettings,
} from '../../types';
import { InvoiceModal } from '../booking/InvoiceModal';
import {
  LayoutDashboard,
  Package as PackageIcon,
  Calendar,
  Users,
  Building2,
  Car,
  UserCheck,
  Settings,
  Star,
  Tag,
  DollarSign,
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Search,
  Check,
  X,
  Printer,
  ShieldCheck,
  Globe,
  Bell,
  Save,
  FileText,
  MessageCircle,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { setActiveTab } = useAuth();
  const [adminTab, setAdminTab] = useState<
    'overview' | 'bookings' | 'packages' | 'users' | 'temples' | 'hotels' | 'pandits' | 'reviews' | 'coupons' | 'cms'
  >('overview');

  // Datasets
  const [analytics, setAnalytics] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [temples, setTemples] = useState<Temple[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [cmsSettings, setCmsSettings] = useState<CMSSettings | null>(null);

  // Search & Filters
  const [bookingFilterStatus, setBookingFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Booking | null>(null);

  // Modals & Form States
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showAddTemple, setShowAddTemple] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  const loadData = () => {
    apiService.getAnalytics().then((data) => setAnalytics(data));
    apiService.getBookings().then((data) => setBookings(data));
    apiService.getPackages().then((data) => setPackages(data));
    apiService.getUsers().then((data) => setUsers(data));
    apiService.getTemples().then((data) => setTemples(data));
    apiService.getHotels().then((data) => setHotels(data));
    apiService.getPandits().then((data) => setPandits(data));
    apiService.getReviews().then((data) => setReviews(data));
    apiService.getCoupons().then((data) => setCoupons(data));
    apiService.getSettings().then((data) => setCmsSettings(data));
  };

  useEffect(() => {
    loadData();
  }, [adminTab]);

  // Actions
  const handleUpdateBookingStatus = async (id: string, status: any) => {
    await apiService.updateBooking(id, { bookingStatus: status });
    loadData();
  };

  const handleDeletePackage = async (id: string) => {
    if (confirm('Delete this package?')) {
      await apiService.deletePackage(id);
      loadData();
    }
  };

  const handleToggleUserBlock = async (id: string, isBlocked?: boolean) => {
    await apiService.updateUser(id, { isBlocked: !isBlocked });
    loadData();
  };

  const handleSaveCMS = async () => {
    if (cmsSettings) {
      await apiService.updateSettings(cmsSettings);
      alert('CMS Settings Saved Successfully!');
    }
  };

  return (
    <div className="py-8 bg-amber-50/50 dark:bg-amber-950/30 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-700 dark:text-orange-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Purva Yatra Admin Panel</span>
            </div>
            <h1 className="text-2xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
              Administrator Operations Dashboard
            </h1>
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-xs font-bold hover:bg-amber-200"
          >
            ← Exit to Client Portal
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Admin Sidebar */}
          <div className="lg:col-span-1 bg-white dark:bg-amber-950 p-3 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-1 h-fit">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'bookings', label: 'Bookings Management', icon: <Calendar className="w-4 h-4" /> },
              { id: 'packages', label: 'Packages Management', icon: <PackageIcon className="w-4 h-4" /> },
              { id: 'users', label: 'Users & Pilgrims', icon: <Users className="w-4 h-4" /> },
              { id: 'temples', label: 'Gaya Temples', icon: <Globe className="w-4 h-4" /> },
              { id: 'hotels', label: 'Partner Hotels', icon: <Building2 className="w-4 h-4" /> },
              { id: 'pandits', label: 'Gayawal Pandits', icon: <UserCheck className="w-4 h-4" /> },
              { id: 'reviews', label: 'Review Moderation', icon: <Star className="w-4 h-4" /> },
              { id: 'coupons', label: 'Coupons & Discounts', icon: <Tag className="w-4 h-4" /> },
              { id: 'cms', label: 'CMS & Settings', icon: <Settings className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                  adminTab === tab.id
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Area */}
          <div className="lg:col-span-4">
            {/* OVERVIEW TAB */}
            {adminTab === 'overview' && analytics && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-amber-950 border border-amber-200 dark:border-amber-800 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Total Revenue</span>
                    <p className="text-2xl font-extrabold font-serif text-amber-900 dark:text-amber-100">
                      ₹{analytics.totalRevenue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-amber-950 border border-amber-200 dark:border-amber-800 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Total Bookings</span>
                    <p className="text-2xl font-extrabold font-serif text-amber-900 dark:text-amber-100">
                      {analytics.totalBookings}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-amber-950 border border-amber-200 dark:border-amber-800 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Registered Users</span>
                    <p className="text-2xl font-extrabold font-serif text-amber-900 dark:text-amber-100">
                      {analytics.totalUsers}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-amber-950 border border-amber-200 dark:border-amber-800 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Active Packages</span>
                    <p className="text-2xl font-extrabold font-serif text-amber-900 dark:text-amber-100">
                      {analytics.activePackages}
                    </p>
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-4">
                  <h3 className="font-bold font-serif text-base text-stone-900 dark:text-amber-100">
                    System Audit Activity Logs
                  </h3>
                  <div className="space-y-3">
                    {analytics.recentActivity.map((log: any) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-900 text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-amber-900 dark:text-amber-200">
                            [{log.action}] {log.actorName}:
                          </span>{' '}
                          <span className="text-stone-700 dark:text-amber-100">{log.details}</span>
                        </div>
                        <span className="text-[10px] text-stone-400">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS MANAGEMENT TAB */}
            {adminTab === 'bookings' && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                    All Yatra Bookings ({bookings.length})
                  </h3>

                  {/* Status Filter */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-stone-500">Filter Status:</span>
                    <select
                      value={bookingFilterStatus}
                      onChange={(e) => setBookingFilterStatus(e.target.value)}
                      className="p-1.5 rounded-lg border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900 text-xs"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-amber-100/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold border-b border-amber-200 dark:border-amber-800">
                        <th className="p-3">Booking ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Package</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100 dark:divide-amber-900">
                      {bookings
                        .filter(
                          (b) =>
                            bookingFilterStatus === 'All' || b.bookingStatus === bookingFilterStatus
                        )
                        .map((bk) => (
                          <tr key={bk.id} className="hover:bg-amber-50/50 dark:hover:bg-amber-900/30">
                            <td className="p-3 font-bold text-amber-900 dark:text-amber-200">
                              {bk.bookingCode}
                            </td>
                            <td className="p-3">
                              <p className="font-bold">{bk.userName}</p>
                              <p className="text-[10px] text-stone-500">{bk.userPhone}</p>
                            </td>
                            <td className="p-3 max-w-[150px] truncate">{bk.packageName}</td>
                            <td className="p-3">{bk.travelDate}</td>
                            <td className="p-3 font-bold">₹{bk.finalAmount.toLocaleString('en-IN')}</td>
                            <td className="p-3">
                              <select
                                value={bk.bookingStatus}
                                onChange={(e) =>
                                  handleUpdateBookingStatus(bk.id, e.target.value)
                                }
                                className="p-1 rounded bg-stone-100 dark:bg-amber-900 text-[11px] font-bold border border-amber-300"
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`https://wa.me/${bk.userPhone.replace(/\D/g, '') || '919931246394'}?text=${encodeURIComponent(`Hari Om ${bk.userName}! Following up on your Purva Yatra booking ${bk.bookingCode} for ${bk.packageName}.`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 inline-flex items-center"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => setSelectedInvoice(bk)}
                                  className="p-1.5 rounded-lg bg-amber-700 text-white hover:bg-amber-800"
                                  title="Print Slip"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PACKAGES MANAGEMENT TAB */}
            {adminTab === 'packages' && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                    Purva Yatra Packages ({packages.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-900/20 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-stone-900 dark:text-amber-100 font-serif">
                          {pkg.name}
                        </h4>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-stone-500">Destination: {pkg.destination}</p>
                      <p className="font-bold text-amber-900 dark:text-amber-200">
                        Base Reference: ₹{pkg.pricePerAdult.toLocaleString('en-IN')} (Public: Contact Us)
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* USERS MANAGEMENT TAB */}
            {adminTab === 'users' && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-4">
                <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                  Registered Users ({users.length})
                </h3>

                <div className="space-y-3">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-900/20 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-stone-900 dark:text-amber-100">
                          {u.name} ({u.role})
                        </p>
                        <p className="text-stone-500">{u.email} • {u.phone}</p>
                      </div>

                      <button
                        onClick={() => handleToggleUserBlock(u.id, u.isBlocked)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          u.isBlocked
                            ? 'bg-rose-600 text-white'
                            : 'bg-stone-200 dark:bg-amber-900 text-stone-800 dark:text-amber-200'
                        }`}
                      >
                        {u.isBlocked ? 'Blocked' : 'Active (Click to Block)'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CMS SETTINGS TAB */}
            {adminTab === 'cms' && cmsSettings && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-4">
                <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                  CMS Website Settings & Information
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Site Title</label>
                    <input
                      type="text"
                      value={cmsSettings.siteName}
                      onChange={(e) =>
                        setCmsSettings({ ...cmsSettings, siteName: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Notice Banner Announcement</label>
                    <input
                      type="text"
                      value={cmsSettings.noticeBannerText || ''}
                      onChange={(e) =>
                        setCmsSettings({ ...cmsSettings, noticeBannerText: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Helpline Phone Number</label>
                    <input
                      type="text"
                      value={cmsSettings.helplinePhone}
                      onChange={(e) =>
                        setCmsSettings({ ...cmsSettings, helplinePhone: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50"
                    />
                  </div>

                  <button
                    onClick={handleSaveCMS}
                    className="px-6 py-2.5 bg-amber-700 text-white rounded-xl font-bold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save CMS Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Popup */}
      {selectedInvoice && (
        <InvoiceModal booking={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};
